// src/pages/TermsPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsPage = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "ar" ? "شروط الخدمة" : "Terms of Service",
    intro: language === "ar"
      ? "توضح شروط الخدمة هذه القواعد والتزامات استخدام منصة بلاغ. باستخدامك للمنصة، فإنك توافق على هذه الشروط."
      : "These Terms of Service outline the rules and obligations for using the Balagh platform. By using the platform, you agree to these terms.",
    section1Title: language === "ar" ? "استخدام المنصة" : "Use of the Platform",
    section1Content: language === "ar"
      ? "يُسمح لك باستخدام بلاغ للإبلاغ عن المشاكل والتواصل مع الجهات الحكومية. يُمنع استخدام المنصة لأغراض غير قانونية أو مضرة."
      : "You are permitted to use Balagh to report issues and communicate with government entities. Using the platform for illegal or harmful purposes is prohibited.",
    section2Title: language === "ar" ? "المسؤوليات" : "Responsibilities",
    section2Content: language === "ar"
      ? "أنت مسؤول عن دقة المعلومات التي تقدمها. نحن غير مسؤولين عن أي أضرار ناتجة عن استخدامك للمنصة."
      : "You are responsible for the accuracy of the information you provide. We are not liable for any damages resulting from your use of the platform.",
    section3Title: language === "ar" ? "التعديلات على الشروط" : "Changes to the Terms",
    section3Content: language === "ar"
      ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إعلامك بأي تغييرات كبيرة عبر المنصة."
      : "We reserve the right to modify these terms at any time. You will be notified of significant changes via the platform.",
    section4Title: language === "ar" ? "الإنهاء" : "Termination",
    section4Content: language === "ar"
      ? "يمكننا تعليق أو إنهاء حسابك إذا انتهكت هذه الشروط. يمكنك أيضًا إنهاء استخدامك للمنصة في أي وقت."
      : "We may suspend or terminate your account if you violate these terms. You may also terminate your use of the platform at any time.",
    backToHome: language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home",
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <FileText className="h-10 w-10 text-government-600 mr-3" />
          <h1 className="text-4xl font-bold text-government-700">{translations.title}</h1>
        </div>

        {/* الوصف */}
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          {translations.intro}
        </p>

        {/* المحتوى */}
        <div className="space-y-8">
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{translations.section1Title}</h2>
              <p className="text-gray-600 leading-relaxed">{translations.section1Content}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{translations.section2Title}</h2>
              <p className="text-gray-600 leading-relaxed">{translations.section2Content}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{translations.section3Title}</h2>
              <p className="text-gray-600 leading-relaxed">{translations.section3Content}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{translations.section4Title}</h2>
              <p className="text-gray-600 leading-relaxed">{translations.section4Content}</p>
            </CardContent>
          </Card>
        </div>

        {/* زر العودة */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="border-government-600 text-government-600 hover:bg-government-100 py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            asChild
          >
            <Link to="/">{translations.backToHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;