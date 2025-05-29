import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// تعريف أنواع البيانات
interface User {
  email?: string;
  username?: string;
  phoneNumber?: string;
  role?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  signOut: () => void;
}

interface LanguageContextType {
  t: (key: string) => string;
  language: "ar" | "en";
}

// قائمة بأسماء عشوائية
const randomNames: string[] = ["جون دو", "جين سميث", "أليكس جونسون", "كريس براون", "إيما ويلسون"];
const getRandomName = (): string => randomNames[Math.floor(Math.random() * randomNames.length)];

// دالة لاختيار إما اسم عشوائي أو "معلوماتي"
const getDropdownUsername = (language: "ar" | "en"): string =>
  Math.random() > 0.5 ? getRandomName() : (language === "ar" ? "معلوماتي" : "My Information");

interface UserActionsProps {
  mobileView?: boolean;
}

// Notification Button Component
function NotificationButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t, language } = useLanguage() as LanguageContextType;
  const { user } = useAuth() as AuthContextType;

  const notifications: Record<string, string> = {
    government: language === "ar" ? "لديك مشكلة جديدة" : "You have a new issue",
    rejected: language === "ar" ? "تم رفض مشكلتك" : "Your issue has been rejected",
    inProgress: language === "ar" ? "تم العمل عليها" : "It is being worked on",
    pending: language === "ar" ? "لم يبت بها" : "Not yet decided",
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5 text-red-500" />
      </Button>
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <div className="py-2">
            {user?.role === "government" ? (
              <button
                className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 ease-in-out"
              >
                {notifications.government}
              </button>
            ) : (
              <>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.rejected}
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-green-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.inProgress}
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 hover:text-yellow-600 transition-colors duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                >
                  {notifications.pending}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserActions({ mobileView = false }: UserActionsProps) {
  const { user, signOut } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const { t, language } = useLanguage() as LanguageContextType;
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    email: user?.email || "example.user@email.com",
    username: user?.username || getDropdownUsername(language),
    phoneNumber: user?.phoneNumber || "+1-555-987-6543",
  });

  const handleSignOut = (): void => {
    signOut();
    navigate("/signin");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (): void => {
    console.log("Saving changes:", formData);
    setIsEditModalOpen(false);
  };

  const fakeData: User = {
    email: "example.user@email.com",
    username: getDropdownUsername(language),
    phoneNumber: "+1-555-987-6543",
  };

  const displayEmail: string = user?.email || fakeData.email;
  const displayDropdownUsername: string = user?.username || fakeData.username;
  const displayButtonUsername: string = language === "ar" ? "معلوماتي" : "My Information";
  const displayPhoneNumber: string = user?.phoneNumber || fakeData.phoneNumber;

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={() => navigate("/signin")}
      >
        <LogIn className="h-4 w-4 mr-1" /> {t("signIn")}
      </Button>
    );
  }

  if (mobileView) {
    return (
      <div className="pt-2 mt-2 border-t">
        <div className="px-3 py-2 text-base font-medium text-gray-700">
          {language === "ar" ? "تم تسجيل الدخول كـ: " : "Signed in as: "} {displayEmail}
          {user.role === "government" && (
            <div className="mt-1 text-sm text-gray-500">
              {user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")} Department
            </div>
          )}
        </div>
        {/* زر تعديل معلوماتي يشبه التصميم في DropdownMenuItem */}
        <Button
          variant="ghost"
          className="flex items-center w-full justify-start px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
          onClick={() => setIsEditModalOpen(true)}
        >
          <User className="h-4 w-4 mr-2 text-gray-600" />
          {language === "ar" ? "تعديل معلوماتي" : "Edit My Information"}
        </Button>
        {/* قائمة منسدلة تحتوي على زر تسجيل الخروج فقط */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center w-full justify-start px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2 text-gray-600" />
              {t("signOut")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2 text-gray-600" />
              {t("signOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <>
      <NotificationButton />
      <Button variant="ghost" size="icon" onClick={() => {}}>
        <HelpCircle className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hidden md:flex items-center mr-2">
            <span className="text-sm text-gray-600 mr-2">
              {user.role === "government"
                ? `${user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")} Department`
                : displayButtonUsername}
            </span>
            <User className="h-5 w-5 text-government-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {language === "ar" ? "حسابي" : "My Account"}
          </DropdownMenuLabel>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "البريد الإلكتروني: " : "Email: "} {displayEmail}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "اسم المستخدم: " : "Username: "} {displayDropdownUsername}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span className="text-sm">
              {language === "ar" ? "رقم الهاتف: " : "Phone: "} {displayPhoneNumber}
            </span>
          </DropdownMenuItem>
          {user.role === "government" && (
            <DropdownMenuItem disabled>
              <span className="text-sm">
                {language === "ar" ? "القسم: " : "Department: "}
                {user.department || (language === "ar" ? "القسم غير معروف" : "Unknown Department")}
              </span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {/* الأزرار داخل القائمة المنسدلة، حذفت "عرض الملف الشخصي" و"الإعدادات" */}
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <User className="h-4 w-4 mr-2 text-gray-600" />
            {language === "ar" ? "تعديل معلوماتي" : "Edit My Information"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2 text-gray-600" />
            {t("signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* نافذة تعديل المعلومات */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]" dir={language === "ar" ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle>
              {language === "ar" ? "تعديل معلوماتي" : "Edit My Information"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {language === "ar" ? "البريد الإلكتروني" : "Email"}
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {language === "ar" ? "اسم المستخدم" : "Username"}
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                {language === "ar" ? "رقم الهاتف" : "Phone Number"}
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              {language === "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleSaveChanges}>
              {language === "ar" ? "حفظ التغييرات" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}