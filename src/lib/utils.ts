import { thumbnail } from "@/assets";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatePrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
};

export function constructMetaData({
  title = "CaseCobra",
  description = "Create custom high quality phone cases in seconds.",
  image = `${thumbnail}`,
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "belalrezk.developer@gmail.com",
    },
    icons,
    metadataBase: new URL("https://casecobra-br.vercel.app/"),
  };
}
