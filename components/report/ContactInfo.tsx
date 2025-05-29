
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactInfo = () => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "ar" ? "معلومات الاتصال" : "Contact Information"}</CardTitle>
        <CardDescription>
          {language === "ar" 
            ? "اختياري: قدم تفاصيل الاتصال الخاصة بك للمتابعة"
            : "Optional: Provide your contact details for follow-up"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{language === "ar" ? "اسمك" : "Your Name"}</Label>
          <Input id="name" placeholder={language === "ar" ? "محمد أحمد" : "John Doe"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{language === "ar" ? "البريد الإلكتروني" : "Email Address"}</Label>
          <Input id="email" type="email" placeholder={language === "ar" ? "mohammed@example.com" : "john.doe@example.com"} />
          <p className="text-xs text-gray-500">
            {language === "ar"
              ? "سنستخدم هذا فقط لإبلاغك بتحديثات عن بلاغك."
              : "We'll only use this to update you about your report."}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{language === "ar" ? "رقم الهاتف" : "Phone Number"}</Label>
          <Input id="phone" placeholder={language === "ar" ? "٠٧٩١٢٣٤٥٦٧" : "(123) 456-7890"} />
        </div>
      </CardContent>
    </Card>
  );
};
