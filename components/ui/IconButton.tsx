import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "ghost" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconButton({
  icon: Icon,
  onClick,
  variant = "ghost",
  size = "md",
  className,
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const variantClasses = {
    ghost: "hover:bg-white/5 text-gray-300 hover:text-primary",
    primary: "bg-primary text-black hover:bg-primary/90",
    secondary: "bg-white/10 text-white hover:bg-white/20",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center transition-all",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
}
