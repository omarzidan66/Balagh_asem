import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Building, FileText, HelpCircle, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { language } = useLanguage();
  
  const translations = {
    title: language === "ar" ? "حول بلاغ" : "About Balagh",
    description: language === "ar" 
      ? "بلاغ هي منصة مدفوعة من المجتمع تمكّن المواطنين من الإبلاغ عن المشكلات في أحيائهم والتعاون مع الحكومة المحلية لتحسين المساحات والخدمات العامة."
      : "Balagh is a community-driven platform that empowers citizens to report issues in their neighborhoods and collaborate with local government to improve public spaces and services.",
    missionTitle: language === "ar" ? "مهمتنا" : "Our Mission",
    missionDescription: language === "ar"
      ? "مهمتنا هي إنشاء علاقة أكثر استجابة وشفافية وتعاونية بين المواطنين والهيئات الحكومية. نعتقد أنه من خلال تسهيل الإبلاغ عن المشكلات ومتابعة حلها، يمكننا المساعدة في إنشاء مجتمعات أكثر قابلية للسكن وأمانًا وصيانة جيدة."
      : "Our mission is to create a more responsive, transparent, and collaborative relationship between citizens and government agencies. We believe that by making it easier for residents to report issues and track their resolution, we can help create more livable, safe, and well-maintained communities.",
    howItWorksTitle: language === "ar" ? "كيف يعمل" : "How It Works",
    reportTitle: language === "ar" ? "إبلاغ" : "Report",
    reportDescription: language === "ar"
      ? "يقدم المواطنون تقارير عن المشكلات التي يلاحظونها في مجتمعهم."
      : "Citizens submit reports about issues they observe in their community.",
    connectTitle: language === "ar" ? "ربط" : "Connect",
    connectDescription: language === "ar"
      ? "يتم توجيه التقارير إلى الإدارات الحكومية المناسبة."
      : "Reports are routed to the appropriate government departments.",
    trackTitle: language === "ar" ? "متابعة" : "Track",
    trackDescription: language === "ar"
      ? "يمكن للمواطنين متابعة حالة تقاريرهم من التقديم إلى الحل."
      : "Citizens can follow the status of their reports from submission to resolution.",
    benefitsTitle: language === "ar" ? "الفوائد" : "Benefits",
    benefitsCitizens: language === "ar"
      ? "للمواطنين: قناة بسيطة ومباشرة للإبلاغ عن مشكلات المجتمع ومتابعة حلها."
      : "For Citizens: A simple, direct channel to report community issues and track their resolution.",
    benefitsGovernment: language === "ar"
      ? "للحكومة: تحسين القدرة على تحديد المشكلات وتحديد أولوياتها، وتخصيص الموارد بكفاءة، والتواصل مع المواطنين حول التقدم المحرز."
      : "For Government: Improved ability to identify and prioritize issues, allocate resources efficiently, and communicate progress to constituents.",
    benefitsCommunities: language === "ar"
      ? "للمجتمعات: نهج أكثر تعاونًا لتحسين المجتمع، مما يؤدي إلى مساحات عامة أكثر أمانًا ونظافة وصيانة أفضل."
      : "For Communities: A more collaborative approach to community improvement, leading to safer, cleaner, and better-maintained public spaces.",
    departmentsTitle: language === "ar" ? "الإدارات المشاركة" : "Participating Departments",
    departmentsDescription: language === "ar"
      ? "يعمل بلاغ مع مختلف الإدارات الحكومية لضمان توجيه المشكلات إلى الفرق المناسبة للحل:"
      : "Balagh works with various government departments to ensure issues are routed to the right teams for resolution:",
    department1: language === "ar" ? "قسم الأشغال العامة" : "Department of Public Works",
    department2: language === "ar" ? "الحدائق والترفيه" : "Parks and Recreation",
    department3: language === "ar" ? "قسم النقل" : "Transportation Department",
    department4: language === "ar" ? "قسم النظافة" : "Sanitation Department",
    department5: language === "ar" ? "السلامة العامة" : "Public Safety",
    department6: language === "ar" ? "تطبيق القانون" : "Code Enforcement",
    getInvolvedTitle: language === "ar" ? "شارك" : "Get Involved",
    getInvolvedDescription: language === "ar"
      ? "هناك العديد من الطرق للمساهمة في تحسين مجتمعك من خلال بلاغ:"
      : "There are many ways to contribute to improving your community through Balagh:",
    involvement1: language === "ar" ? "الإبلاغ عن المشكلات التي تلاحظها في حيك" : "Report issues you observe in your neighborhood",
    involvement2: language === "ar" ? "التصويت والتعليق على التقارير الحالية للمساعدة في تحديد أولويات المشكلات المهمة" : "Vote on and comment on existing reports to help prioritize important issues",
    involvement3: language === "ar" ? "مشاركة التحديثات والمعلومات الإضافية حول المشكلات المبلغ عنها" : "Share updates and additional information about reported issues",
    involvement4: language === "ar" ? "تقديم ملاحظات حول حل المشكلات" : "Provide feedback on the resolution of issues",
    questionsTitle: language === "ar" ? "هل لديك أسئلة؟" : "Have Questions?",
    questionsDescription: language === "ar"
      ? "قم بزيارة قسم الأسئلة الشائعة للعثور على إجابات للأسئلة الشائعة حول استخدام بلاغ."
      : "Visit our FAQ section to find answers to commonly asked questions about using Balagh.",
    viewFAQ: language === "ar" ? "عرض الأسئلة الشائعة" : "View FAQ",
    contactTitle: language === "ar" ? "اتصل بنا" : "Contact Us",
    contactDescription: language === "ar"
      ? "هل تحتاج إلى مساعدة إضافية أو لديك ملاحظات حول بلاغ؟ فريق الدعم لدينا هنا للمساعدة."
      : "Need additional help or have feedback about Balagh? Our support team is here to help.",
    contactSupport: language === "ar" ? "الاتصال بالدعم" : "Contact Support",
    joinTitle: language === "ar" ? "انضم إلى المجتمع" : "Join the Community",
    joinDescription: language === "ar"
      ? "كن جزءًا من الحل. ابدأ بالإبلاغ عن المشكلات وساعد في جعل مجتمعك أفضل للجميع."
      : "Be part of the solution. Start reporting issues and help make your community better for everyone.",
    reportIssue: language === "ar" ? "الإبلاغ عن مشكلة" : "Report an Issue",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{translations.title}</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-700 mb-6">
            {translations.description}
          </p>
          
          <h2 className="text-2xl font-bold mb-4">{translations.missionTitle}</h2>
          <p className="text-gray-700 mb-6">
            {translations.missionDescription}
          </p>
          
          <h2 className="text-2xl font-bold mb-4">{translations.howItWorksTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <FileText className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translations.reportTitle}</h3>
                <p className="text-gray-600">
                  {translations.reportDescription}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <Building className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translations.connectTitle}</h3>
                <p className="text-gray-600">
                  {translations.connectDescription}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <BarChart3 className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{translations.trackTitle}</h3>
                <p className="text-gray-600">
                  {translations.trackDescription}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{translations.benefitsTitle}</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li className="text-gray-700">
              <strong>{translations.benefitsCitizens.split(':')[0]}:</strong> {translations.benefitsCitizens.split(':')[1]}
            </li>
            <li className="text-gray-700">
              <strong>{translations.benefitsGovernment.split(':')[0]}:</strong> {translations.benefitsGovernment.split(':')[1]}
            </li>
            <li className="text-gray-700">
              <strong>{translations.benefitsCommunities.split(':')[0]}:</strong> {translations.benefitsCommunities.split(':')[1]}
            </li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">{translations.departmentsTitle}</h2>
          <p className="text-gray-700 mb-4">
            {translations.departmentsDescription}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li className="text-gray-700">{translations.department1}</li>
            <li className="text-gray-700">{translations.department2}</li>
            <li className="text-gray-700">{translations.department3}</li>
            <li className="text-gray-700">{translations.department4}</li>
            <li className="text-gray-700">{translations.department5}</li>
            <li className="text-gray-700">{translations.department6}</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4">{translations.getInvolvedTitle}</h2>
          <p className="text-gray-700 mb-4">
            {translations.getInvolvedDescription}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li className="text-gray-700">{translations.involvement1}</li>
            <li className="text-gray-700">{translations.involvement2}</li>
            <li className="text-gray-700">{translations.involvement3}</li>
            <li className="text-gray-700">{translations.involvement4}</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <HelpCircle className="h-6 w-6 text-government-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{translations.questionsTitle}</h3>
                  <p className="text-gray-600 mb-4">
                    {translations.questionsDescription}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/faq">{translations.viewFAQ}</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <MessageSquare className="h-6 w-6 text-government-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{translations.contactTitle}</h3>
                  <p className="text-gray-600 mb-4">
                    {translations.contactDescription}
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/Contact">{translations.contactSupport}</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-government-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{translations.joinTitle}</h2>
          <p className="text-lg mb-6">
            {translations.joinDescription}
          </p>
          <Button className="bg-white text-government-700 hover:bg-government-100" size="lg" asChild>
            <Link to="/report">{translations.reportIssue}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;