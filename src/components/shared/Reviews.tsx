"use client";
import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  testimonials1,
  testimonials2,
  testimonials3,
  testimonials4,
  testimonials5,
  testimonials6,
  whatPeopleAreBuying,
} from "@/assets";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

const PHONES = [
  testimonials1,
  testimonials2,
  testimonials3,
  testimonials4,
  testimonials5,
  testimonials6,
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

export default function Reviews() {
  return (
    <MaxWidthWrapper className=" relative max-w-5xl">
      <Image
        aria-hidden="true"
        src={whatPeopleAreBuying}
        alt="image"
        className=" absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
}

function ReviewGrid() {
  const container = useRef<HTMLDivElement>(null);
  const isInView = useInView(container, { once: true, amount: 0.4 });
  const cols = splitArray(PHONES, 3);
  const col1 = cols[0];
  const col2 = cols[1];
  const col3 = splitArray(cols[2], 2);
  return (
    <div
      ref={container}
      className=" relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewCol
            reviews={[...col1, ...col3.flat(), ...col2]}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= col1.length + col3[0].length,
                "lg:hidden": reviewIndex >= col1.length,
              })
            }
            msPerpx={10}
          />
          <ReviewCol
            reviews={[...col2, ...col3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= col2.length ? "lg:hidden" : ""
            }
            msPerpx={15}
          />
          <ReviewCol
            reviews={col3.flat()}
            className="hidden md:block"
            msPerpx={10}
          />
        </>
      ) : null}
      <div className=" pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className=" pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

function ReviewCol({
  reviews,
  className,
  reviewClassName,
  msPerpx = 0,
}: {
  reviews: string[] | StaticImageData[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerpx?: number;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const [colH, setColH] = useState(0);
  const duration = `${colH * msPerpx}ms`;
  useEffect(() => {
    if (!colRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      setColH(colRef.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe(colRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  return (
    <div
      ref={colRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((item, index) => (
        <Review
          key={index}
          className={reviewClassName?.(index % reviews.length)}
          imgSrc={item}
        />
      ))}
    </div>
  );
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string | StaticImageData;
}

function Review({ imgSrc, className, ...props }: Props) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];
  return (
    <div
      style={{ animationDelay }}
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}
