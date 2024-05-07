import { cn } from "@/lib/utils";

interface Props extends CHILDREN {
  className?: string;
}

export default function MaxWidthWrapper({ children, className }: Props) {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
}
