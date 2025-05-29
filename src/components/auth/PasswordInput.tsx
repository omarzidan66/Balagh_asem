import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input"; // Ensure this exists

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const PasswordInput = ({ value, onChange, required = false, className = "", id, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container w-full relative">
      <Input
        id={id}
        className={`auth-input ${className} ${language === "ar" ? "pl-10" : "pr-10"}`}
        type={showPassword ? "text" : "password"}
        placeholder={language === "ar" ? "كلمة المرور" : "Password"}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          fontSize: isMobile ? "14px" : "16px",
          height: isMobile ? "42px" : "48px",
        }}
        {...props} // Pass any additional props to Input
      />
      <div
        className={`password-toggle-icon absolute top-1/2 transform -translate-y-1/2 ${
          language === "ar" ? "left-2" : "right-2"
        } cursor-pointer`}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <EyeOff size={isMobile ? 16 : 18} /> : <Eye size={isMobile ? 16 : 18} />}
      </div>
    </div>
  );
};

export default PasswordInput;