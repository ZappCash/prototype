import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  fullHeight?: boolean;
  children: ReactNode;
}

export function Section({
  fullHeight = false,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "w-full px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32",
        fullHeight && "min-h-screen",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
