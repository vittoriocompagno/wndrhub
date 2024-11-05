"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        Welcome to WonderHub
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
      >
        Create stunning property showcases with our intuitive platform. Perfect for hotels,
        restaurants, bars, and retail stores.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center gap-4"
      >
        <Button size="lg" asChild>
          <Link href="/register">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/features">Learn More</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}