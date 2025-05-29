import { Link } from "react-router-dom";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">{t('aboutLink')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-government-600">
                  {t('aboutLink')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-government-600">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-500 hover:text-government-600">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-government-600">
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">{t('services')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/report" className="text-gray-500 hover:text-government-600">
                  {t('reportAnIssue')}
                </Link>
              </li>
              <li>
                <Link to="/issues" className="text-gray-500 hover:text-government-600">
                  {t('viewIssuesFooter')}
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-gray-500 hover:text-government-600">
                  {t('communityStatistics')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-base text-gray-500">
            © 2025 Balagh. {t('allRightsReserved')}
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Button 
              className="text-gray-500 hover:text-government-600"
              variant="ghost"
              onClick={() => setLanguage("en" as Language)}
            >
              English
            </Button>
            <span className="text-gray-500">|</span>
            <Button 
              className="text-gray-500 hover:text-government-600"
              variant="ghost"
              onClick={() => setLanguage("ar" as Language)}
            >
              العربية
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}