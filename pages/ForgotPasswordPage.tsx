// src/pages/ForgotPasswordPage.tsx
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [email, setEmail] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userType, setUserType] = useState<"regular" | "government">("regular");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState<boolean>(false);

  const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailPattern.test(value) && value.length <= 254);
    setEmail(value);
  };

  const validateEmployeeId = (value: string) => {
    const employeeIdPattern = /^[A-Za-z0-9-]{4,12}$/;
    setIsEmployeeIdValid(employeeIdPattern.test(value));
    setEmployeeId(value);
  };

  const getEmailErrorMessage = () => {
    return language === "ar"
      ? "صيغة غير صحيحة (مثال: user@domain.com)"
      : "Invalid format (e.g., user@domain.com)";
  };

  const getEmployeeIdErrorMessage = () => {
    return language === "ar"
      ? "4-12 حرفًا فقط (مثال: EMP-1234)"
      : "4-12 characters only (e.g., EMP-1234)";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userType === "regular" && !email) {
      toast({
        title: language === "ar" ? "البريد الإلكتروني مفقود" : "Email missing",
        description: language === "ar"
          ? "يرجى إدخال بريدك الإلكتروني."
          : "Please enter your email.",
        variant: "destructive",
      });
      return;
    }

    if (userType === "regular" && email && !isEmailValid) {
      toast({
        title: language === "ar" ? "بريد إلكتروني غير صحيح" : "Invalid email",
        description: language === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح (مثال: user@domain.com)."
          : "Please enter a valid email (e.g., user@domain.com).",
        variant: "destructive",
      });
      return;
    }

    if (userType === "government" && !employeeId) {
      toast({
        title: language === "ar" ? "رقم الوظيفة مفقود" : "Employee ID missing",
        description: language === "ar"
          ? "يرجى إدخال رقم الوظيفة."
          : "Please enter your employee ID.",
        variant: "destructive",
      });
      return;
    }

    if (userType === "government" && employeeId && !isEmployeeIdValid) {
      toast({
        title: language === "ar" ? "رقم وظيفة غير صحيح" : "Invalid employee ID",
        description: language === "ar"
          ? "رقم الوظيفة يجب أن يكون بين 4 و12 حرفًا (أحرف، أرقام، أو -)."
          : "Employee ID must be 4-12 characters (letters, numbers, or -).",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await requestPasswordReset(userType === "government" ? employeeId : email, userType);
      toast({
        title: language === "ar" ? "تم إرسال الطلب" : "Request sent",
        description: language === "ar"
          ? "تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني أو حسابك."
          : "A password reset link has been sent to your email or account.",
      });
      setEmail("");
      setEmployeeId("");
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل الطلب" : "Request failed",
        description: error instanceof Error
          ? error.message
          : language === "ar"
          ? "حدث خطأ غير معروف"
          : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {language === "ar" ? "استعادة كلمة المرور" : "Reset Password"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full mb-2">
            <RadioGroup
              value={userType}
              onValueChange={(value: "regular" | "government") => setUserType(value)}
              className="flex justify-center gap-4 mb-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label htmlFor="regular" className="cursor-pointer text-sm">
                  {language === "ar" ? "مستخدم" : "User"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="government" id="government" />
                <Label htmlFor="government" className="cursor-pointer text-sm">
                  {language === "ar" ? "مسؤول" : "Admin"}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {userType === "regular" ? (
            <div className="w-full">
              <div className="flex items-center gap-2">
                <Input
                  className={`border rounded-md py-2 px-3 flex-1 ${
                    email && !isEmailValid ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                  type="email"
                  placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                  required
                />
                {email && (
                  <span
                    className={`text-xl font-bold ${isEmailValid ? "text-blue-600" : "text-red-600"}`}
                  >
                    {isEmailValid ? "✔" : "✘"}
                  </span>
                )}
              </div>
              {email && !isEmailValid && (
                <div className="text-sm text-red-600 mt-1">{getEmailErrorMessage()}</div>
              )}
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center gap-2">
                <Input
                  className={`border rounded-md py-2 px-3 flex-1 ${
                    employeeId && !isEmployeeIdValid ? "border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                  type="text"
                  placeholder={language === "ar" ? "رقم الوظيفة" : "Employee ID"}
                  value={employeeId}
                  onChange={(e) => validateEmployeeId(e.target.value)}
                  required
                />
                {employeeId && (
                  <span
                    className={`text-xl font-bold ${isEmployeeIdValid ? "text-blue-600" : "text-red-600"}`}
                  >
                    {isEmployeeIdValid ? "✔" : "✘"}
                  </span>
                )}
              </div>
              {employeeId && !isEmployeeIdValid && (
                <div className="text-sm text-red-600 mt-1">{getEmployeeIdErrorMessage()}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? language === "ar"
                ? "جاري الإرسال..."
                : "Sending..."
              : language === "ar"
              ? "إرسال رابط الاستعادة"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/signin"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {language === "ar" ? "العودة إلى تسجيل الدخول" : "Back to Sign In"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;