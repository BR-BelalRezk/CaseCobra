import { phoneTemplateDarkEdges, phoneTemplateWhiteEdges } from "@/assets";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: StaticImageData | string;
  dark?: boolean;
}

export default function Phone({
  className,
  imgSrc,
  dark = false,
  ...props
}: Props) {
  return (
    <figure
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        width={0}
        height={0}
        className=" pointer-events-none z-50 select-none"
        src={dark ? phoneTemplateDarkEdges : phoneTemplateWhiteEdges}
        alt="phone image"
      />
      <div className=" absolute -z-10 inset-0">
        <Image
          className="object-cover min-w-full min-h-full"
          width={0}
          height={0}
          src={imgSrc}
          alt="overlaying phone"
        />
      </div>
    </figure>
  );
}
