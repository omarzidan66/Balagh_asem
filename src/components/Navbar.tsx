import { Button } from "@/components/ui/button";
import Logo from "./navbar/Logo";
import NavLinks from "./navbar/NavLinks";
import LanguageToggle from "./navbar/LanguageToggle";
import ThemeToggle from "./navbar/ThemeToggle";
import UserActions from "./navbar/UserActions";
import MobileMenu from "./navbar/MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <NavLinks />
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle /> {/* إزالة الشرط عشان يظهر دايماً زي الكود الجديد */}
            <UserActions />   {/* إزالة الشرط عشان يظهر دايماً زي الكود الجديد */}
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}