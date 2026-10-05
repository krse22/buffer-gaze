import * as React from 'react';

export type TagVariant = 'accent' | 'accent2' | 'neutral' | 'outline';

export interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}
const variantStyles: Record<TagVariant, string> = {
  accent: 'bg-accent-100 text-accent-800',
  accent2: 'bg-accent2-100 text-accent2-800',
  neutral: 'bg-neutral-100 text-neutral-800',
  outline: 'border border-accent text-accent',
};

export function Tag({
  variant = 'neutral',
  children,
  className = '',
}: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center text-[11px] tracking-wide py-0.5 px-2.5 rounded-xl
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
