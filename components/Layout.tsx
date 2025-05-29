import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const currentPath = window.location.pathname;
  const isAuthPage = currentPath === '/signin' || currentPath === '/signup';

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className={`flex-grow bg-background ${isMobile && isAuthPage ? 'pb-10' : ''}`}>
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}