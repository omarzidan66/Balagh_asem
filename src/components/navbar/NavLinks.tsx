import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface NavLinksProps {
  mobileView?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ mobileView = false, onLinkClick }: NavLinksProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const links = [];
  
  links.push(
    <Link 
      key="home" 
      to="/" 
      className={`${mobileView 
        ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
        : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
      onClick={onLinkClick}
    >
      {t('home')}
    </Link>
  );
  
  if (!user) {
    links.push(
      <Link 
        key="report" 
        to="/report" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('reportIssue')}
      </Link>,
      <Link 
        key="issues" 
        to="/issues" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('viewIssues')}
      </Link>,
      <Link 
        key="about" 
        to="/about" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('about')}
      </Link>
    );
  } else if (user.role === 'government') {
    links.push(
      <Link 
        key="issues" 
        to="/issues" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('viewIssues')}
      </Link>
    );
  } else {
    links.push(
      <Link 
        key="report" 
        to="/report" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('reportIssue')}
      </Link>,
      <Link 
        key="issues" 
        to="/issues" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('viewIssues')}
      </Link>,
      <Link 
        key="my-reports" 
        to="/my-reports" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('myReports')}
      </Link>,
      <Link 
        key="about" 
        to="/about" 
        className={`${mobileView 
          ? "text-foreground hover:text-primary block py-3 text-base font-medium border-b border-border/50" 
          : "text-gray-700 hover:text-government-600 px-3 py-2 text-sm font-medium"}`}
        onClick={onLinkClick}
      >
        {t('about')}
      </Link>
    );
  }
  
  return (
    <div className={mobileView ? "space-y-1 px-2" : "hidden md:flex items-center space-x-4"}>
      {links}
    </div>
  );
}