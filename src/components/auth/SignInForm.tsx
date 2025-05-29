import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom"; // إضافة استيراد Link
import SocialIcons from "./SocialIcons";
import PasswordInput from "./PasswordInput";

const SignInForm = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<"regular" | "government">("regular");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const departmentOptions = {
    transportation: language === "ar" ? "النقل" : "Transportation",
    environment: language === "ar" ? "البيئة" : "Environment",
    publicWorks: language === "ar" ? "الأشغال العامة" : "Public Works",
    waterAuthority: language === "ar" ? "سلطة المياه" : "Water Authority",
    electricity: language === "ar" ? "قسم الكهرباء" : "Electricity Department",
    communication: language === "ar" ? "الاتصالات" : "Communication",
    health: language === "ar" ? "قسم الصحة" : "Health Department",
    other: language === "ar" ? "أخرى" : "Other",
  };

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

  const validatePassword = (value: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordPattern.test(value));
    setPassword(value);
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

  const getPasswordErrorMessage = () => {
    return language === "ar"
      ? "8 أحرف على الأقل، حرف صغير، كبير، ورقم (مثال: Pass1234)"
      : "At least 8 chars, lowercase, uppercase, and number (e.g., Pass1234)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!password) {
      toast({
        title: language === "ar" ? "كلمة المرور مفقودة" : "Password missing",
        description: language === "ar"
          ? "يرجى إدخال كلمة المرور."
          : "Please enter your password.",
        variant: "destructive",
      });
      return;
    }

    if (password && !isPasswordValid) {
      toast({
        title: language === "ar" ? "كلمة المرور غير صحيحة" : "Invalid password",
        description: language === "ar"
          ? "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف صغير، حرف كبير، ورقم."
          : "Password must be at least 8 characters, with a lowercase, uppercase, and number.",
        variant: "destructive",
      });
      return;
    }

    if (userType === "government" && !department) {
      toast({
        title: language === "ar" ? "القسم مفقود" : "Department missing",
        description: language === "ar"
          ? "يرجى اختيار قسمك."
          : "Please select your department.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(userType === "government" ? employeeId : email, password, department, userType);
      toast({
        title: language === "ar" ? "مرحبًا بعودتك" : "Welcome back",
        description: language === "ar"
          ? "لقد قمت بتسجيل الدخول بنجاح."
          : "You have successfully signed in.",
      });
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل تسجيل الدخول" : "Sign-in failed",
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
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-title">{language === "ar" ? "تسجيل الدخول" : "Sign In"}</h1>
      <SocialIcons />
      <span>{language === "ar" ? " استخدم حسابك" : " use your account"}</span>

      <div className="w-full mb-2">
        <RadioGroup
          value={userType}
          onValueChange={(value) => setUserType(value as "regular" | "government")}
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
        <div className="w-full mb-4">
          <div className="flex items-center gap-2">
            <Input
              className={`auth-input border rounded-md py-2 px-3 flex-1 ${
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
        <div className="w-full mb-4">
          <div className="flex items-center gap-2">
            <Input
              className={`auth-input border rounded-md py-2 px-3 flex-1 ${
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

      <div className="w-full mb-4">
        <div className="flex items-center gap-2">
          <PasswordInput
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            required
            className={`auth-input border rounded-md py-2 px-3 w-full ${
              password && !isPasswordValid ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
          />
          {password && (
            <span
              className={`text-xl font-bold ${isPasswordValid ? "text-blue-600" : "text-red-600"}`}
            >
              {isPasswordValid ? "✔" : "✘"}
            </span>
          )}
        </div>
        {password && !isPasswordValid && (
          <div className="text-sm text-red-600 mt-1">{getPasswordErrorMessage()}</div>
        )}
        <div className="text-right mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {language === "ar" ? "نسيت كلمة السر؟" : "Forgot Password?"}
          </Link>
        </div>
      </div>

      {userType === "government" && (
        <div className="w-full mt-2 mb-4">
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="auth-input border border-gray-300 rounded-md py-2 px-3">
              <SelectValue placeholder={language === "ar" ? "اختر قسمك" : "Select your department"} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(departmentOptions).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {language === "ar"
              ? "ستتمكن من رؤية المشكلات المتعلقة بقسمك فقط"
              : "You will only see issues related to your department"}
          </p>
        </div>
      )}

      <button
        type="submit"
        className="auth-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? language === "ar"
            ? "جاري تسجيل الدخول..."
            : "Signing in..."
          : language === "ar"
          ? "تسجيل الدخول"
          : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;