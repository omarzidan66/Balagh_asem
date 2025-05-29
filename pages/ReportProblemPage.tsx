// src/pages/ReportProblemPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Flag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Translations {
  title: string;
  description: string;
  placeholder: string;
  submitButton: string;
  backToIssue: string;
  successMessage: string;
  errorMessage: string;
}

const ReportProblemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [problemDescription, setProblemDescription] = useState("");

  const translations: Translations = {
    title: language === "ar" ? "الإبلاغ عن مشكلة في التقرير" : "Report Problem with this Issue",
    description: language === "ar"
      ? "يرجى وصف المشكلة التي تواجهها مع هذا التقرير. سنراجع طلبك في أقرب وقت ممكن."
      : "Please describe the problem you are experiencing with this report. We will review your request as soon as possible.",
    placeholder: language === "ar" ? "اكتب وصف المشكلة هنا..." : "Write your problem description here...",
    submitButton: language === "ar" ? "إرسال" : "Submit",
    backToIssue: language === "ar" ? "العودة إلى رؤية المشاكل" : "Back to View Issues", // التعديل هنا
    successMessage: language === "ar" ? "تم إرسال بلاغك بنجاح!" : "Your report has been submitted successfully!",
    errorMessage: language === "ar" ? "يرجى إدخال وصف للمشكلة قبل الإرسال." : "Please enter a problem description before submitting.",
  };

  const handleSubmit = () => {
    if (!problemDescription.trim()) {
      toast({
        title: translations.errorMessage,
        variant: "destructive",
      });
      return;
    }

    // هنا يمكنك إضافة منطق الإرسال إلى الخادم (API) إذا لزم الأمر
    // لأغراض العرض، سنعرض فقط رسالة نجاح
    toast({
      title: translations.successMessage,
      description: language === "ar"
        ? "سنقوم بمراجعة بلاغك قريبًا."
        : "We will review your report soon.",
    });

    setProblemDescription(""); // إعادة تعيين الحقل بعد الإرسال
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <Flag className="h-10 w-10 text-government-600 mr-3" />
          <h1 className="text-4xl font-bold text-government-700">{translations.title}</h1>
        </div>

        {/* الوصف */}
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          {translations.description}
        </p>

        {/* الكارد مع النموذج */}
        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder={translations.placeholder}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-500 focus:border-government-500 transition-all resize-none"
                rows={5}
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-government-600 hover:bg-government-700 text-white py-3 rounded-lg shadow-md transition-all duration-200"
              >
                {translations.submitButton}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* زر العودة */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-government-600 text-government-600 hover:bg-government-100 py-2 px-6 rounded-lg transition-all duration-200"
            asChild
          >
            <Link to="/issues"> {/* التعديل هنا */}
              <ArrowLeft className="mr-2 h-4 w-4" />
              {translations.backToIssue}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportProblemPage;