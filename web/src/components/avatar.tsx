export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export function Avatar({ src, alt = "", size = "md", fallback, className = "" }: AvatarProps) {
  const initials = fallback || alt.charAt(0).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`flex-none rounded-full object-cover ${sizeStyles[size]}
          ${className}
        `.trim()}
      />
    );
  }

  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full bg-neutral-200 font-semibold text-neutral-600 ${sizeStyles[size]}
        ${className}
      `.trim()}
    >
      {initials}
    </div>
  );
}
