import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import LanguageToggle from "./LanguageToggle";
import UserActions from "./UserActions";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] pt-10 z-[100]">
        <div className="flex flex-col gap-6 h-full">
          <NavLinks 
            mobileView={true} 
            onLinkClick={() => setMobileMenuOpen(false)} 
          />
          <div className="space-y-4 mt-auto">
            <LanguageToggle mobileView={true} />
            {user && <UserActions mobileView={true} />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}