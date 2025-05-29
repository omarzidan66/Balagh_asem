
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-6 rounded-full">
            <AlertTriangle className="h-12 w-12 text-amber-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          {language === "ar" 
            ? "عفواً! لم نتمكن من العثور على الصفحة التي تبحث عنها."
            : "Oops! We couldn't find the page you're looking for."}
        </p>
        <div className="space-y-4">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Home"}
            </Link>
          </Button>
          <div className="mt-4">
            <p className="text-gray-500">
              {language === "ar"
                ? "إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بالدعم."
                : "If you believe this is an error, please contact support."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
