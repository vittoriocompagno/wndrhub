import './globals.css';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'WonderHub - Property Management Platform',
  description: 'Manage your properties efficiently with WonderHub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="wonderhub-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}