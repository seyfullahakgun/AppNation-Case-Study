import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export default function Card({
  title,
  children,
  className = "",
  titleClassName = "",
}: CardProps) {
  return (
    <div
      className={`flex flex-col bg-card-background rounded-lg border border-border-light ${className}`}
    >
      {title && (
        <h3 className={`text-lg font-semibold mb-2 ${titleClassName}`}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
