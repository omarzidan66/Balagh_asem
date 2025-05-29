
import { Button } from "@/components/ui/button";
import { Language, useLanguage } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  mobileView?: boolean;
}

export default function LanguageToggle({ mobileView = false }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  if (mobileView) {
    return (
      <div className="flex space-x-2 px-3 py-2">
        <Button 
          variant={language === "en" ? "default" : "outline"} 
          size="sm" 
          onClick={() => toggleLanguage("en")}
        >
          English
        </Button>
        <Button 
          variant={language === "ar" ? "default" : "outline"} 
          size="sm" 
          onClick={() => toggleLanguage("ar")}
        >
          العربية
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center mr-2 border rounded-md overflow-hidden">
      <Button 
        variant={language === "en" ? "default" : "outline"} 
        size="sm" 
        className="rounded-none"
        onClick={() => toggleLanguage("en")}
      >
        EN
      </Button>
      <Button 
        variant={language === "ar" ? "default" : "outline"} 
        size="sm" 
        className="rounded-none"
        onClick={() => toggleLanguage("ar")}
      >
        عربي
      </Button>
    </div>
  );
}
