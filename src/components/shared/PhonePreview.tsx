"use client";

import { CaseColor } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { clearPhone } from "@/assets";

export default function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimenions, setRenderedDimenions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimenions({ width, height });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  const caseBGColor =
    color === "blue"
      ? "bg-blue-950"
      : color === "rose"
      ? "bg-rose-950"
      : "bg-zinc-950";

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className=" relative">
      <div
        className=" absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimenions.width / 2 -
            renderedDimenions.width / (1216 / 121),
          top: renderedDimenions.height / 6.22,
        }}
      >
        <Image
          src={croppedImageUrl}
          alt=""
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBGColor
          )}
          width={renderedDimenions.width / (3000 / 637)}
        />
      </div>
      <div className=" relative size-full z-40">
        <Image
          alt="phone"
          src={clearPhone}
          className=" pointer-events-none size-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}
