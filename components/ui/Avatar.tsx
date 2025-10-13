import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=default&backgroundColor=00ff88,00cc66";

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const avatarSrc = src || DEFAULT_AVATAR;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold overflow-hidden",
        "bg-gradient-to-br from-primary/20 to-secondary/20",
        "border-2 border-primary/30",
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={avatarSrc}
        alt={name}
        width={64}
        height={64}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );
}
