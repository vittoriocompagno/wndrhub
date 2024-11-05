"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassPane } from "@/components/ui/glass-pane";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { LogIn, Menu, X } from "lucide-react";

export function GlassHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassPane className="sticky top-0 z-50 w-full border-b border-border/50">
      <header className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">WonderHub</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        className={cn(
          "overflow-hidden md:hidden",
          isOpen ? "border-t" : "border-t-0"
        )}
      >
        <nav className="container flex flex-col space-y-4 px-4 py-6">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Button variant="ghost" asChild className="justify-start">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </motion.div>
    </GlassPane>
  );
}