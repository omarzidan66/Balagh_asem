// src/pages/PrivacyPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPage = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    intro: language === "ar"
      ? "نحن في بلاغ ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع معلوماتك ونستخدمها ونحميها."
      : "We at Balagh are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information.",
    section1Title: language === "ar" ? "المعلومات التي نجمعها" : "Information We Collect",
    section1Content: language === "ar"
      ? "نجمع المعلومات التي تقدمها عند استخدام خدماتنا، مثل اسمك، بريدك الإلكتروني، والتقارير التي ترسلها. قد نجمع أيضًا بيانات الاستخدام لتحسين خدماتنا."
      : "We collect information you provide when using our services, such as your name, email address, and the reports you submit. We may also collect usage data to improve our services.",
    section2Title: language === "ar" ? "كيف نستخدم معلوماتك" : "How We Use Your Information",
    section2Content: language === "ar"
      ? "نستخدم معلوماتك لمعالجة التقارير، التواصل معك، وتحسين منصتنا. لن نشارك معلوماتك مع أطراف ثالثة إلا لتقديم الخدمات أو بموجب القانون."
      : "We use your information to process reports, communicate with you, and improve our platform. We will not share your information with third parties except to provide services or as required by law.",
    section3Title: language === "ar" ? "حماية بياناتك" : "Protecting Your Data",
    section3Content: language === "ar"
      ? "نستخدم إجراءات أمنية لحماية معلوماتك من الوصول غير المصرح به، التغيير، أو الإفشاء."
      : "We implement security measures to protect your information from unauthorized access, alteration, or disclosure.",
    section4Title: language === "ar" ? "حقوقك" : "Your Rights",
    section4Content: language === "ar"
      ? "لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. تواصل معنا لمزيد من التفاصيل."
      : "You have the right to access, correct, or delete your personal information. Contact us for more details.",
    backToHome: language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home",
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-10 w-10 text-government-600 mr-3" />
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

export default PrivacyPage;