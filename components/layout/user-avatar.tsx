"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    email?: string;
    user_metadata?: {
      first_name?: string;
      last_name?: string;
    };
  };
}

export function UserAvatar({ user }: UserAvatarProps) {
  // Generate a unique gradient based on the user's email
  const getGradient = (email: string) => {
    const hash = email.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    
    return `linear-gradient(135deg, hsl(${h1}, 80%, 50%), hsl(${h2}, 80%, 50%))`;
  };

  const getInitials = () => {
    if (user.user_metadata?.first_name && user.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`;
    }
    return user.email?.[0].toUpperCase() || "?";
  };

  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback
        style={{
          background: getGradient(user.email || "default"),
        }}
        className="text-primary-foreground font-medium"
      >
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
}