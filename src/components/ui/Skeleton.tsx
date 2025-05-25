interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200/50 dark:bg-gray-700 rounded-lg ${className}`}
    />
  );
} 