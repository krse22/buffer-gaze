import * as React from 'react';

export type CardElevation = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  elevation?: CardElevation;
  children: React.ReactNode;
  className?: string;
}

export interface CardKickerProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardMetaProps {
  children: React.ReactNode;
  className?: string;
}

const elevationStyles: Record<CardElevation, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export function Card({
  elevation = 'none',
  children,
  className = '',
}: CardProps) {
  return (
    <div
      className={`
        flex flex-col gap-2
        p-3 rounded-[32px] bg-surface
        ${elevationStyles[elevation]}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

export function CardKicker({ children, className = '' }: CardKickerProps) {
  return (
    <span
      className={`
        text-[10px] tracking-widest uppercase text-accent
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`
        font-heading font-normal text-[17px] leading-tight
        ${className}
      `.trim()}
    >
      {children}
    </h3>
  );
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <p
      className={`
        m-0 text-[13px] opacity-80 flex-1
        ${className}
      `.trim()}
    >
      {children}
    </p>
  );
}

export function CardMeta({ children, className = '' }: CardMetaProps) {
  return (
    <div
      className={`
        flex items-center gap-1.5 text-[11px] text-foreground/50
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
