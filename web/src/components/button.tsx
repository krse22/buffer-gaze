import { Button as BaseUIButton } from "@base-ui/react/button";
import type * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "default" | "icon" | "block";

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof BaseUIButton> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const baseStyles = `
  inline-flex items-center justify-center gap-1.5
  cursor-pointer no-underline
  font-heading font-normal
  text-sm leading-tight text-foreground
  bg-transparent border border-transparent
  py-2 px-4
  rounded-full
  transition-colors duration-150
  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
  disabled:opacity-45 disabled:cursor-not-allowed
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-accent-600 active:bg-accent-700",
  secondary: "border-divider hover:bg-foreground/[0.07] active:bg-foreground/[0.14]",
  ghost: "text-accent px-1 hover:bg-accent/10 active:bg-accent/[0.18]",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "",
  icon: "w-9 h-9 p-0",
  block: "w-full mt-2",
};

export default function Button({
  variant = "primary",
  size = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <BaseUIButton
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </BaseUIButton>
  );
}
