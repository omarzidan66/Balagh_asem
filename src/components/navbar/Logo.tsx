import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Logo() {
  const { language } = useLanguage();

  return (
    <Link to="/" className="flex items-center">
      {language === "ar" && (
        <img
          src="/7.jpg"  // اللوغو يظهر فقط في اللغة العربية
          width="64"
          height="64"
          style={{ float: "left", marginLeft: "0px" }}
        />
      )}
      <span className="text-government-700 font-bold text-xl">
        {language === "ar" ? "   " : "Balagh.jo"}
      </span>
    </Link>
  );
}