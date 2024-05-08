"use server";

import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { db } from "@/db";
import { Order } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModal,
} from "@prisma/client";
import { stripe } from "@/lib/stripe";

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModal;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, model, material },
  });
}

export async function createCheckoutSession({
  configId,
}: {
  configId: string;
}) {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });
  if (!configuration) {
    throw new Error("No such configuration found");
  }
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("You need to be logged in");
  }
  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (material === "polycarbonate") {
    price += PRODUCTS_PRICES.material.polycarbonate;
  }
  if (finish === "textured") {
    price += PRODUCTS_PRICES.finish.textured;
  }

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }
  const product = await stripe.products.create({
    name: "Custome iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });
  return { url: stripeSession.url };
}

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("Invalid user data");
  }
  const exisitingUser = await db.user.findFirst({
    where: { id: user.id },
  });
  if (!exisitingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }

  return { success: true };
};

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("You need to be logged in to view this page.");
  }
  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      billingAddress: true,
      configuration: true,
      shippingAddress: true,
      user: true,
    },
  });
  if (!order) {
    throw new Error("This Error does not exist.");
  }
  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
