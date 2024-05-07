"use client";

import { snake1, snake2, snake3 } from "@/assets";
import { Icons } from "@/assets/Icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "Review your final design",
    url: "/preview",
  },
];

export default function Steps() {
  const pathname = usePathname();
  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-x lg:border-gray-200">
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathname.endsWith(step.url)
        );
        const imgSrc = index === 0 ? snake1 : index === 1 ? snake2 : snake3;
        return (
          <li key={index} className=" relative overflow-hidden lg:flex-1">
            <div>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 w-1 h-full bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                  {
                    "bg-zinc-700": isCurrent,
                    "bg-primary": isCompleted,
                  }
                )}
              ></span>
              <span
                className={cn(
                  index !== 0 ? "lg:pl-9" : "",
                  "flex items-center px-6 py-4 text-sm font-medium"
                )}
              >
                <span className="flex shrink-0">
                  <Image
                    src={imgSrc}
                    width={0}
                    height={0}
                    className={cn(
                      "flex size-20 object-contain items-center justify-center",
                      {
                        "border-none": isCompleted,
                        "border-zinc-700": isCurrent,
                      }
                    )}
                    alt=""
                  />
                </span>
                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn("text-sm font-semibold text-zinc-700", {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>

              {index !== 0 ? (
                <div className=" absolute inset-0 hidden w-3 lg:block">
                  <Icons.separator />
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
