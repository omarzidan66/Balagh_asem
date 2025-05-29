// src/pages/CommunityStatsPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CommunityStatsPage = () => {
  const { language } = useLanguage();

  const translations = {
    title: language === "ar" ? "إحصاءات المجتمع" : "Community Statistics",
    intro: language === "ar"
      ? "توفر هذه الصفحة نظرة عامة على الإحصاءات المتعلقة بالتقارير المقدمة عبر منصة بلاغ في الأردن."
      : "This page provides an overview of statistics related to reports submitted through the Balagh platform in Jordan.",
    section1Title: language === "ar" ? "عدد التقارير المقدمة" : "Number of Reports Submitted",
    section1Content: language === "ar"
      ? "حتى الآن، تم تقديم أكثر من 500 تقرير من قبل المستخدمين في مختلف المناطق."
      : "To date, over 500 reports have been submitted by users across various regions.",
    section2Title: language === "ar" ? "معدل حل المشاكل" : "Issue Resolution Rate",
    section2Content: language === "ar"
      ? "تم حل حوالي 75% من المشاكل المبلغ عنها خلال أسبوع من تقديمها."
      : "Approximately 75% of reported issues have been resolved within a week of submission.",
    section3Title: language === "ar" ? "المناطق الأكثر نشاطًا" : "Most Active Regions",
    section3Content: language === "ar"
      ? "المناطق الأكثر تقديمًا للتقارير تشمل عمان، الزرقاء، وإربد."
      : "The most active regions for report submissions include Amman, Zarqa, and Irbid.",
    section4Title: language === "ar" ? "أنواع المشاكل الشائعة" : "Common Issue Types",
    section4Content: language === "ar"
      ? "أكثر المشاكل شيوعًا تشمل مشاكل البنية التحتية، النظافة، والنقل."
      : "The most common issues include infrastructure problems, sanitation, and transportation.",
    backToHome: language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home",
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <BarChart3 className="h-10 w-10 text-government-600 mr-3" />
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

export default CommunityStatsPage;