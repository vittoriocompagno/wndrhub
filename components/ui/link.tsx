"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode;
  className?: string;
}

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "text-foreground/80 transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}