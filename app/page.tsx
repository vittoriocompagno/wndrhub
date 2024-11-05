import { GlassHeader } from '@/components/layout/glass-header';
import { Hero } from '@/components/layout/hero';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GlassHeader />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}