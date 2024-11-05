import { cn } from "@/lib/utils";

interface GlassPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPane({ children, className, ...props }: GlassPaneProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-background/80 border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}