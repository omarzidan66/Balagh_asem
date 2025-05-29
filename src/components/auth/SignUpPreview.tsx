import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignUpPreview = () => {
  const { language } = useLanguage();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [userType, setUserType] = useState<"regular" | "government">("regular");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isNationalIdValid, setIsNationalIdValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState(false);

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

  // دوال التحقق من صحة الحقول
  const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailPattern.test(value) && value.length <= 254);
    setEmail(value);
  };

  const validatePassword = (value: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordPattern.test(value));
    setPassword(value);
  };

  const validateUsername = (value: string) => {
    const usernamePattern = /^[a-zA-Z0-9]{3,16}$/;
    setIsUsernameValid(usernamePattern.test(value));
    setUsername(value);
  };

  const validateNationalId = (value: string) => {
    const nationalIdPattern = /^\d{10}$/;
    setIsNationalIdValid(nationalIdPattern.test(value));
    setNationalId(value);
  };

  const validatePhoneNumber = (value: string) => {
    const phonePattern = /^\+?[1-9]\d{8,14}$/;
    setIsPhoneNumberValid(phonePattern.test(value));
    setPhoneNumber(value);
  };

  const validateEmployeeId = (value: string) => {
    const employeeIdPattern = /^[A-Za-z0-9-]{4,12}$/;
    setIsEmployeeIdValid(employeeIdPattern.test(value));
    setEmployeeId(value);
  };

  // رسائل الخطأ مع أمثلة
  const getEmailErrorMessage = () => {
    return language === "ar"
      ? "صيغة غير صحيحة (مثال: user@domain.com)"
      : "Invalid format (e.g., user@domain.com)";
  };

  const getPasswordErrorMessage = () => {
    return language === "ar"
      ? "8 أحرف على الأقل، حرف صغير، كبير، ورقم (مثال: Pass1234)"
      : "At least 8 chars, lowercase, uppercase, and number (e.g., Pass1234)";
  };

  const getUsernameErrorMessage = () => {
    return language === "ar"
      ? "3-16 حرفًا، أحرف وأرقام فقط (مثال: user123)"
      : "3-16 chars, letters and numbers only (e.g., user123)";
  };

  const getNationalIdErrorMessage = () => {
    return language === "ar"
      ? "10 أرقام بالضبط (مثال: 1234567890)"
      : "Exactly 10 digits (e.g., 1234567890)";
  };

  const getPhoneNumberErrorMessage = () => {
    return language === "ar"
      ? "9-15 رقمًا مع رمز الدولة (مثال: +966123456789)"
      : "9-15 digits with country code (e.g., +966123456789)";
  };

  const getEmployeeIdErrorMessage = () => {
    return language === "ar"
      ? "4-12 حرفًا (مثال: EMP-1234)"
      : "4-12 characters (e.g., EMP-1234)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !isEmailValid) {
      toast({
        title: language === "ar" ? "البريد الإلكتروني غير صحيح" : "Invalid email",
        description: getEmailErrorMessage(),
        variant: "destructive",
      });
      return;
    }

    if (!password || !isPasswordValid) {
      toast({
        title: language === "ar" ? "كلمة المرور غير صحيحة" : "Invalid password",
        description: getPasswordErrorMessage(),
        variant: "destructive",
      });
      return;
    }

    if (userType === "regular" && (!username || !nationalId || !phoneNumber || !isUsernameValid || !isNationalIdValid || !isPhoneNumberValid)) {
      toast({
        title: language === "ar" ? "معلومات ناقصة أو غير صحيحة" : "Missing or invalid information",
        description: language === "ar"
          ? "يرجى التحقق من اسم المستخدم، رقم الهوية الوطنية، ورقم الهاتف."
          : "Please check username, national ID, and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (userType === "government" && (!employeeId || !phoneNumber || !department || !isEmployeeIdValid || !isPhoneNumberValid)) {
      toast({
        title: language === "ar" ? "معلومات ناقصة أو غير صحيحة" : "Missing or invalid information",
        description: language === "ar"
          ? "يرجى التحقق من رقم الوظيفة، رقم الهاتف، والقسم."
          : "Please check employee ID, phone number, and department.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp({
        email,
        password,
        role: userType,
        username: userType === "regular" ? username : undefined,
        nationalId: userType === "regular" ? nationalId : undefined,
        phoneNumber: userType === "regular" ? phoneNumber : undefined,
        department: userType === "government" ? department : undefined,
       
      });

      toast({
        title: language === "ar" ? "تم إنشاء الحساب" : "Account created",
        description: language === "ar"
          ? "يمكنك الآن تسجيل الدخول باستخدام بياناتك."
          : "You can now sign in with your credentials.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل التسجيل" : "Sign-up Failed",
        description: error instanceof Error ? error.message : (language === "ar" ? "حدث خطأ غير معروف" : "An unknown error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-title">{language === "ar" ? "إنشاء حساب" : "Create Account"}</h1>
      <span>{language === "ar" ? " استخدم بريدك الإلكتروني للتسجيل" : " use your email for registration"}</span>

      <div className="w-full mb-2">
        <RadioGroup
          value={userType}
          onValueChange={(value) => setUserType(value as "regular" | "government")}
          className="flex justify-center gap-4 mb-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="regular" id="regular" />
            <label htmlFor="regular" className="cursor-pointer">{language === "ar" ? "مستخدم " : " User"}</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="government" id="government" />
            <label htmlFor="government" className="cursor-pointer">{language === "ar" ? " مسؤول" : "Admin "}</label>
          </div>
        </RadioGroup>
      </div>

      <div className="w-full mb-4">
        <div className="flex items-center gap-2">
          <Input
            className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
            type="email"
            placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            required
          />
          {email && (
            <span className={`text-xl font-bold ${isEmailValid ? "text-blue-600" : "text-red-600"}`}>
              {isEmailValid ? "✔" : "✘"}
            </span>
          )}
        </div>
        {email && !isEmailValid && (
          <div className="text-sm text-red-600 mt-1">{getEmailErrorMessage()}</div>
        )}
      </div>

      <div className="w-full mb-4">
        <div className="flex items-center gap-2">
          <PasswordInput
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
            required
          />
          {password && (
            <span className={`text-xl font-bold ${isPasswordValid ? "text-blue-600" : "text-red-600"}`}>
              {isPasswordValid ? "✔" : "✘"}
            </span>
          )}
        </div>
        {password && !isPasswordValid && (
          <div className="text-sm text-red-600 mt-1">{getPasswordErrorMessage()}</div>
        )}
      </div>

      {userType === "regular" && (
        <>
          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <Input
                className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
                type="text"
                placeholder={language === "ar" ? "الاسم" : "Name"}
                value={username}
                onChange={(e) => validateUsername(e.target.value)}
                required
              />
              {username && (
                <span className={`text-xl font-bold ${isUsernameValid ? "text-blue-600" : "text-red-600"}`}>
                  {isUsernameValid ? "✔" : "✘"}
                </span>
              )}
            </div>
            {username && !isUsernameValid && (
              <div className="text-sm text-red-600 mt-1">{getUsernameErrorMessage()}</div>
            )}
          </div>

          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <Input
                className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
                type="text"
                placeholder={language === "ar" ? "الرقم الوطني" : "National ID"}
                value={nationalId}
                onChange={(e) => validateNationalId(e.target.value)}
                required
              />
              {nationalId && (
                <span className={`text-xl font-bold ${isNationalIdValid ? "text-blue-600" : "text-red-600"}`}>
                  {isNationalIdValid ? "✔" : "✘"}
                </span>
              )}
            </div>
            {nationalId && !isNationalIdValid && (
              <div className="text-sm text-red-600 mt-1">{getNationalIdErrorMessage()}</div>
            )}
          </div>

          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <Input
                className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
                type="tel"
                placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                value={phoneNumber}
                onChange={(e) => validatePhoneNumber(e.target.value)}
                required
              />
              {phoneNumber && (
                <span className={`text-xl font-bold ${isPhoneNumberValid ? "text-blue-600" : "text-red-600"}`}>
                  {isPhoneNumberValid ? "✔" : "✘"}
                </span>
              )}
            </div>
            {phoneNumber && !isPhoneNumberValid && (
              <div className="text-sm text-red-600 mt-1">{getPhoneNumberErrorMessage()}</div>
            )}
          </div>
        </>
      )}

      {userType === "government" && (
        <>
          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <Input
                className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
                type="text"
                placeholder={language === "ar" ? "رقم الوظيفي" : "Employee ID"}
                value={employeeId}
                onChange={(e) => validateEmployeeId(e.target.value)}
                required
              />
              {employeeId && (
                <span className={`text-xl font-bold ${isEmployeeIdValid ? "text-blue-600" : "text-red-600"}`}>
                  {isEmployeeIdValid ? "✔" : "✘"}
                </span>
              )}
            </div>
            {employeeId && !isEmployeeIdValid && (
              <div className="text-sm text-red-600 mt-1">{getEmployeeIdErrorMessage()}</div>
            )}
          </div>

          <div className="w-full mb-4">
            <div className="flex items-center gap-2">
              <Input
                className="auth-input border border-gray-300 rounded-md py-2 px-3 focus:border-blue-500 flex-1"
                type="tel"
                placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                value={phoneNumber}
                onChange={(e) => validatePhoneNumber(e.target.value)}
                required
              />
              {phoneNumber && (
                <span className={`text-xl font-bold ${isPhoneNumberValid ? "text-blue-600" : "text-red-600"}`}>
                  {isPhoneNumberValid ? "✔" : "✘"}
                </span>
              )}
            </div>
            {phoneNumber && !isPhoneNumberValid && (
              <div className="text-sm text-red-600 mt-1">{getPhoneNumberErrorMessage()}</div>
            )}
          </div>

          <div className="w-full mb-4">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="auth-input border border-gray-300 rounded-md py-2 px-3">
                <SelectValue placeholder={language === "ar" ? "اختر قسمك" : "Select your department"} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(departmentOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Button
        type="submit"
        className="auth-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? (language === "ar" ? "جارٍ الإنشاء..." : "Creating...") : (language === "ar" ? "إنشاء حساب" : "Create Account")}
      </Button>
    </form>
  );
};

export default SignUpPreview;