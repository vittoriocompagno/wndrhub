"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { GlassPane } from "@/components/ui/glass-pane";
import { Loader } from "@/components/ui/loader";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) throw signInError;

      // Wait for session to be established
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Failed to establish session");
      }

      toast({
        title: "Success",
        description: "You've been logged in successfully.",
      });

      // Force a router refresh to update the auth state
      router.refresh();
      
      // Use replace instead of push to prevent back navigation
      router.replace("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassPane className="w-full max-w-md">
        <Card className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold">{t("loginTitle")}</h1>
              <p className="text-muted-foreground mt-2">
                {t("loginDescription")}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("emailPlaceholder")}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("passwordPlaceholder")}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2" />
                    {t("signingIn")}
                  </>
                ) : (
                  t("signIn")
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                {t("noAccount")}{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push("/register")}
                  disabled={isLoading}
                >
                  {t("registerLink")}
                </Button>
              </p>
            </div>
          </motion.div>
        </Card>
      </GlassPane>
    </div>
  );
}