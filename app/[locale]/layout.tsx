import '../globals.css';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/lib/supabase/server';
import { ThemeProvider } from '@/components/theme-provider';
import { GlassHeader } from '@/components/layout/glass-header';
import { Footer } from '@/components/layout/footer';

const montserrat = Montserrat({ subsets: ['latin'] });

async function getSession() {
  const supabase = createClient();
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className="dark">
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="wonderhub-theme"
        >
          <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <GlassHeader />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}