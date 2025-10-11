import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong";
  children: ReactNode;
}

export function GlassCard({
  variant = "default",
  children,
  className,
  ...props
}: GlassCardProps) {
  const variantClasses = {
    default: "glass-card",
    strong: "glass-card-strong",
  };

  return (
    <div
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
