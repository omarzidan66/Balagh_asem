// src/pages/FAQPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Translations {
  title: string;
  intro: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  q4: string;
  a4: string;
  q5: string;
  a5: string;
  backToAbout: string;
  addQuestionTitle: string;
  addQuestionPlaceholder: string;
  submitQuestionButton: string;
  questionSubmitted: string;
  questionError: string;
}

const FAQPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [userQuestion, setUserQuestion] = useState("");

  const translations: Translations = {
    title: language === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions",
    intro: language === "ar"
      ? "إجابات على الأسئلة الشائعة حول استخدام بلاغ." // تم تحديث "بلاغ"
      : "Answers to common questions about using Balagh.", // تم تحديث "Balagh"
    q1: language === "ar" ? "كيف يمكنني الإبلاغ عن مشكلة؟" : "How can I report an issue?",
    a1: language === "ar"
      ? "يمكنك الإبلاغ عن مشكلة بالنقر على زر 'الإبلاغ عن مشكلة' في الصفحة الرئيسية وملء النموذج."
      : "You can report an issue by clicking the 'Report an Issue' button on the homepage and filling out the form.",
    q2: language === "ar" ? "من يتلقى تقاريري؟" : "Who receives my reports?",
    a2: language === "ar"
      ? "يتم توجيه التقارير إلى الإدارة الحكومية المناسبة بناءً على نوع المشكلة."
      : "Reports are routed to the appropriate government department based on the issue type.",
    q3: language === "ar" ? "هل يمكنني متابعة حالة تقريري؟" : "Can I track the status of my report?",
    a3: language === "ar"
      ? "نعم، يمكنك متابعة حالة تقريرك من خلال صفحة 'تقاريري' بعد تسجيل الدخول."
      : "Yes, you can track your report status through the 'My Reports' page after logging in.",
    q4: language === "ar" ? "ماذا أفعل إذا لم يتم حل المشكلة؟" : "What if my issue isn’t resolved?",
    a4: language === "ar"
      ? "يمكنك التواصل مع فريق الدعم عبر صفحة 'اتصل بنا' للحصول على مساعدة إضافية."
      : "You can contact the support team via the 'Contact Us' page for further assistance.",
    q5: language === "ar" ? "هل الخدمة مجانية؟" : "Is the service free?",
    a5: language === "ar"
      ? "نعم، بلاغ مجاني تمامًا لجميع المواطنين." // تم تحديث "بلاغ"
      : "Yes, Balagh is completely free for all citizens.", // تم تحديث "Balagh"
    backToAbout: language === "ar" ? "العودة إلى حول" : "Back to About",
    addQuestionTitle: language === "ar" ? "أضف سؤالك الخاص" : "Add Your Own Question",
    addQuestionPlaceholder: language === "ar" ? "اكتب سؤالك هنا..." : "Write your question here...",
    submitQuestionButton: language === "ar" ? "إرسال السؤال" : "Submit Question",
    questionSubmitted: language === "ar" ? "تم إرسال سؤالك بنجاح!" : "Your question has been submitted successfully!",
    questionError: language === "ar" ? "يرجى إدخال سؤال قبل الإرسال." : "Please enter a question before submitting.",
  };

  const faqItems = [
    { question: translations.q1, answer: translations.a1 },
    { question: translations.q2, answer: translations.a2 },
    { question: translations.q3, answer: translations.a3 },
    { question: translations.q4, answer: translations.a4 },
    { question: translations.q5, answer: translations.a5 },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleSubmitQuestion = () => {
    if (!userQuestion.trim()) {
      toast({
        title: translations.questionError,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: translations.questionSubmitted,
      description: language === "ar"
        ? "سنقوم بالرد على سؤالك قريبًا."
        : "We will respond to your question soon.",
    });

    setUserQuestion("");
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <HelpCircle className="h-10 w-10 text-government-600 mr-3" />
          <h1 className="text-4xl font-bold text-government-700">{translations.title}</h1>
        </div>

        {/* الوصف */}
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          {translations.intro}
        </p>

        {/* الأسئلة والإجابات مع الأكورديون */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card
              key={index}
              className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <HelpCircle className="h-6 w-6 text-government-600 mr-3 flex-shrink-0" />
                    <h2 className="text-xl font-semibold text-gray-800">{item.question}</h2>
                  </div>
                  {openQuestion === index ? (
                    <ChevronUp className="h-5 w-5 text-government-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-government-600" />
                  )}
                </button>
                {openQuestion === index && (
                  <div className="mt-4 pl-9 animate-fade-in">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* خانة إضافة السؤال */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-government-700 mb-4 text-center">
            {translations.addQuestionTitle}
          </h2>
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder={translations.addQuestionPlaceholder}
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-500 focus:border-government-500 transition-all resize-none"
                rows={3}
              />
              <Button
                onClick={handleSubmitQuestion}
                className="w-full bg-government-600 hover:bg-government-700 text-white py-2 rounded-lg shadow-md transition-all duration-200"
              >
                {translations.submitQuestionButton}
              </Button>
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
            <Link to="/about">{translations.backToAbout}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// إضافة أنماط CSS مخصصة للأنيميشن
const styles = `
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default FAQPage;