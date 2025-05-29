// src/pages/ContactPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Translations {
  title: string;
  description: string;
  balaghSupport: string;
  govSupport: string;
  nameLabel: string;
  emailLabel: string;
  departmentLabel: string; // جديد لحقل القسم
  messageLabel: string;
  submitButton: string;
  backToAbout: string;
  backToReports: string;
  successMessage: string;
}

const ContactPage = () => {
  const { language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedForm, setSelectedForm] = useState<"balagh" | "government">("balagh");

  const translations: Translations = {
    title: language === "ar" ? "اتصل بنا" : "Contact Us",
    description: language === "ar"
      ? "اختر نوع الدعم الذي تحتاجه: دعم بلاغ أو دعم الموقع الحكومي."
      : "Choose the type of support you need: Balagh Support or Government Site Support.",
    balaghSupport: language === "ar" ? "دعم بلاغ" : "Balagh Support",
    govSupport: language === "ar" ? "دعم الموقع الحكومي" : "Government Site Support",
    nameLabel: language === "ar" ? "الاسم" : "Name",
    emailLabel: language === "ar" ? "البريد الإلكتروني" : "Email",
    departmentLabel: language === "ar" ? "القسم" : "Department",
    messageLabel: language === "ar" ? "الرسالة" : "Message",
    submitButton: language === "ar" ? "إرسال" : "Submit",
    backToAbout: language === "ar" ? "العودة إلى حول" : "Back to About",
    backToReports: language === "ar" ? "العودة إلى رؤية المشاكل" : "Back to View Reports",
    successMessage: language === "ar" ? "تم فتح البريد الإلكتروني بنجاح!" : "Email client opened successfully!",
  };

  const [balaghFormData, setBalaghFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [govFormData, setGovFormData] = useState({
    name: "",
    email: "",
    department: "",
    message: "",
  });

  const handleBalaghChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBalaghFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGovChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGovFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedForm === "balagh") {
      const recipientEmail = "support@balagh.com";
      const subject = encodeURIComponent(`Balagh Support Submission from ${balaghFormData.name}`);
      const body = encodeURIComponent(
        `Name: ${balaghFormData.name}\nEmail: ${balaghFormData.email}\nMessage: ${balaghFormData.message}`
      );
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      setBalaghFormData({ name: "", email: "", message: "" });
    } else {
      const recipientEmail = "govsupport@example.com";
      const subject = encodeURIComponent(`Government Support Submission from ${govFormData.name}`);
      const body = encodeURIComponent(
        `Name: ${govFormData.name}\nEmail: ${govFormData.email}\nDepartment: ${govFormData.department}\nMessage: ${govFormData.message}`
      );
      window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      setGovFormData({ name: "", email: "", department: "", message: "" });
    }

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full">
        {/* العنوان مع الأيقونة */}
        <div className="flex items-center justify-center mb-8">
          <MessageSquare className="h-10 w-10 text-government-600 mr-3" />
          <h1 className="text-4xl font-bold text-government-700">{translations.title}</h1>
        </div>

        {/* الوصف */}
        <p className="text-lg text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          {translations.description}
        </p>

        {/* أزرار التبديل بين النماذج */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={selectedForm === "balagh" ? "default" : "outline"}
            className={`py-2 px-6 rounded-lg transition-all duration-200 ${
              selectedForm === "balagh" ? "bg-government-600 text-white" : "border-government-600 text-government-600 hover:bg-government-100"
            }`}
            onClick={() => setSelectedForm("balagh")}
          >
            {translations.balaghSupport}
          </Button>
          <Button
            variant={selectedForm === "government" ? "default" : "outline"}
            className={`py-2 px-6 rounded-lg transition-all duration-200 ${
              selectedForm === "government" ? "bg-government-600 text-white" : "border-government-600 text-government-600 hover:bg-government-100"
            }`}
            onClick={() => setSelectedForm("government")}
          >
            {translations.govSupport}
          </Button>
        </div>

        {/* رسالة النجاح */}
        {isSubmitted && (
          <div className="mb-8 p-4 bg-government-100 text-government-700 rounded-lg shadow-md flex items-center justify-center transition-all duration-300">
            <span className="mr-2">✅</span> {translations.successMessage}
          </div>
        )}

        {/* النموذج */}
        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {selectedForm === "balagh" ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* حقل الاسم */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={balaghFormData.name}
                        onChange={handleBalaghChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-500 focus:border-government-500 transition-all"
                        placeholder={translations.nameLabel}
                        required
                      />
                    </div>

                    {/* حقل البريد الإلكتروني */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={balaghFormData.email}
                        onChange={handleBalaghChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-500 focus:border-government-500 transition-all"
                        placeholder={translations.emailLabel}
                        required
                      />
                    </div>
                  </div>

                  {/* حقل الرسالة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={balaghFormData.message}
                      onChange={handleBalaghChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-government-500 focus:border-government-500 transition-all resize-none"
                      rows={5}
                      placeholder={translations.messageLabel}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* حقل الاسم */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={govFormData.name}
                        onChange={handleGovChange}
                        className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-government-600 focus:border-government-600 transition-all bg-gray-50"
                        placeholder={translations.nameLabel}
                        required
                      />
                    </div>

                    {/* حقل البريد الإلكتروني */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {translations.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={govFormData.email}
                        onChange={handleGovChange}
                        className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-government-600 focus:border-government-600 transition-all bg-gray-50"
                        placeholder={translations.emailLabel}
                        required
                      />
                    </div>
                  </div>

                  {/* حقل القسم */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.departmentLabel}
                    </label>
                    <select
                      name="department"
                      value={govFormData.department}
                      onChange={handleGovChange}
                      className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-government-600 focus:border-government-600 transition-all bg-gray-50"
                      required
                    >
                      <option value="" disabled>
                        {language === "ar" ? "اختر القسم" : "Select Department"}
                      </option>
                      <option value="publicWorks">{language === "ar" ? "الأشغال العامة" : "Public Works"}</option>
                      <option value="parks">{language === "ar" ? "الحدائق والترفيه" : "Parks & Recreation"}</option>
                      <option value="transportation">{language === "ar" ? "النقل" : "Transportation"}</option>
                      <option value="sanitation">{language === "ar" ? "النظافة" : "Sanitation"}</option>
                      <option value="safety">{language === "ar" ? "السلامة العامة" : "Public Safety"}</option>
                      <option value="code">{language === "ar" ? "تطبيق القانون" : "Code Enforcement"}</option>
                    </select>
                  </div>

                  {/* حقل الرسالة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {translations.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      value={govFormData.message}
                      onChange={handleGovChange}
                      className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-government-600 focus:border-government-600 transition-all bg-gray-50 resize-none"
                      rows={5}
                      placeholder={translations.messageLabel}
                      required
                    />
                  </div>
                </>
              )}

              {/* زر الإرسال */}
              <Button
                type="submit"
                className={`w-full py-3 rounded-lg shadow-md transition-all duration-200 ${
                  selectedForm === "balagh"
                    ? "bg-government-600 hover:bg-government-700 text-white"
                    : "bg-government-700 hover:bg-government-800 text-white"
                }`}
              >
                {translations.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* أزرار العودة */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            className="border-government-600 text-government-600 hover:bg-government-100 py-2 px-6 rounded-lg transition-all duration-200"
            asChild
          >
            <Link to="/about">{translations.backToAbout}</Link>
          </Button>
          <Button
            variant="outline"
            className="border-government-600 text-government-600 hover:bg-government-100 py-2 px-6 rounded-lg transition-all duration-200"
            asChild
          >
            <Link to="/issues">{translations.backToReports}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;