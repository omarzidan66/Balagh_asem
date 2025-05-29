import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import PasswordInput from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";

interface SignUpData {
  email: string;
  password: string;
  role: "regular" | "government";
  username?: string;
  nationalId?: string;
  phoneNumber?: string;
  department?: string;
  employeeId?: string;
}

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [nationalId, setNationalId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [userType, setUserType] = useState<"regular" | "government">("regular");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEmployeeIdValid, setIsEmployeeIdValid] = useState<boolean>(false);

  const departmentOptions: Record<string, string> = {
    transportation: language === "ar" ? "النقل" : "Transportation",
    environment: language === "ar" ? "البيئة" : "Environment",
    publicWorks: language === "ar" ? "الأشغال العامة" : "Public Works",
    waterAuthority: language === "ar" ? "سلطة المياه" : "Water Authority",
    electricity: language === "ar" ? "قسم الكهرباء" : "Electricity Department",
    communication: language === "ar" ? "الاتصالات" : "Communication",
    health: language === "ar" ? "قسم الصحة" : "Health Department",
    other: language === "ar" ? "أخرى" : "Other",
  };

  const validateEmployeeId = (value: string) => {
    const employeeIdPattern = /^[A-Za-z0-9-]{4,12}$/;
    setIsEmployeeIdValid(employeeIdPattern.test(value));
    setEmployeeId(value);
  };

  const getEmployeeIdErrorMessage = () => {
    return language === "ar"
      ? "4-12 حرفًا، أحرف وأرقام وشرطات فقط (مثال: EMP-1234)"
      : "4-12 characters, letters, numbers, and hyphens only (e.g., EMP-1234)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords don't match",
        description: language === "ar" ? "يرجى التأكد من تطابق كلمتي المرور." : "Please ensure both passwords are identical.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    if (userType === "regular") {
      if (!nationalId || !username || !phoneNumber) {
        toast({
          title: language === "ar" ? "معلومات ناقصة" : "Missing information",
          description: language === "ar"
            ? "رقم الهوية الوطنية، اسم المستخدم، ورقم الهاتف مطلوبة للمستخدمين العاديين."
            : "National ID, username, and phone number are required for regular users.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    }

    if (userType === "government") {
      if (!department) {
        toast({
          title: language === "ar" ? "القسم مطلوب" : "Department required",
          description: language === "ar"
            ? "يجب على المستخدمين الحكوميين تحديد قسمهم."
            : "Government users must specify their department.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if ((!employeeId || !isEmployeeIdValid)) {
        toast({
          title: language === "ar" ? "رقم الوظيفي غير صحيح" : "Invalid employee ID",
          description: getEmployeeIdErrorMessage(),
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const signUpData: SignUpData = {
        email,
        password,
        role: userType,
        ...(userType === "regular" && { username, nationalId, phoneNumber }),
        ...(userType === "government" && { department, employeeId }),
      };

      await signUp(signUpData);

      toast({
        title: language === "ar" ? "تم إنشاء الحساب" : "Account created",
        description: language === "ar"
          ? "تم إنشاء حسابك بنجاح. يمكنك تسجيل الدخول الآن."
          : "Your account has been successfully created. You can now sign in.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل التسجيل" : "Sign-up failed",
        description: error instanceof Error ? error.message : (language === "ar" ? "حدث خطأ غير معروف" : "An unknown error occurred"),
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className={`w-full ${isMobile ? "max-w-[95%]" : "max-w-md"} shadow-lg rounded-lg`}>
        <CardHeader className="space-y-2 pb-4 text-center">
          <CardTitle className="text-2xl font-bold">{t("createAccount")}</CardTitle>
          <CardDescription className="text-sm text-gray-600">{t("fillDetails")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-4 py-4">
            {/* نوع المستخدم */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("accountType")}</Label>
              <RadioGroup
                value={userType}
                onValueChange={(value) => setUserType(value as "regular" | "government")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="cursor-pointer text-sm">{t("regularUser")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="government" id="government" />
                  <Label htmlFor="government" className="cursor-pointer text-sm">{t("governmentUser")}</Label>
                </div>
              </RadioGroup>
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === "ar" ? "your.email@example.com" : "your.email@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-government-600"
              />
              {userType === "government" && (
                <p className="text-xs text-gray-500">{t("officialEmail")}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">{t("password")}</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">{t("confirmPassword")}</Label>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>

            {/* حقول المستخدم العادي */}
            {userType === "regular" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">{t("username")}</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-government-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="text-sm font-medium">{t("nationalId")}</Label>
                  <Input
                    id="nationalId"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    required
                    className="h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-government-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">{t("phoneNumber")}</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-government-600"
                  />
                </div>
              </>
            )}

            {/* حقول المستخدم الحكومي */}
            {userType === "government" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium">{t("governmentDepartment")}</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department" className="h-10 rounded-md border border-gray-300">
                      <SelectValue placeholder={t("selectDepartment")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(departmentOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-sm font-medium">{t("employeeId")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="employeeId"
                      type="text"
                      value={employeeId}
                      onChange={(e) => validateEmployeeId(e.target.value)}
                      required
                      className="h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-government-600 flex-1"
                    />
                    {employeeId && (
                      <span className={`text-xl font-bold ${isEmployeeIdValid ? "text-blue-600" : "text-red-600"}`}>
                        {isEmployeeIdValid ? "✔" : "✘"}
                      </span>
                    )}
                  </div>
                  {employeeId && !isEmployeeIdValid && (
                    <p className="text-sm text-red-600">{getEmployeeIdErrorMessage()}</p>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col pt-0 px-4 pb-4">
            <Button
              type="submit"
              className="w-full bg-government-600 hover:bg-government-700 text-white font-semibold rounded-md h-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("creatingAccount") : t("createAccountButton")}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600">
              {t("alreadyHaveAccount")}{" "}
              <Link to="/signin" className="text-government-600 hover:underline">
                {t("signInLink")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
