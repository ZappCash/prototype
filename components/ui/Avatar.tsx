import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold",
        "bg-gradient-to-br from-primary/20 to-secondary/20",
        "border-2 border-primary/30",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} width={64} height={64} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-primary">{initials}</span>
      )}
    </div>
  );
}
