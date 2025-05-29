import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SignInForm from "@/components/auth/SignInForm";
import SignUpPreview from "@/components/auth/SignUpPreview";
import OverlayPanel from "@/components/auth/OverlayPanel";
import AuthStyles from "@/components/auth/AuthStyles";
import { useIsMobile } from "@/hooks/use-mobile";

const SignInPage = () => {
  const { language } = useLanguage();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const isMobile = useIsMobile();

  const togglePanel = () => {
    if (!isMobile) {
      setIsRightPanelActive(!isRightPanelActive);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex justify-center">
      <AuthStyles />
      <div
        className={`auth-container ${isMobile ? "mobile-auth-container" : ""} ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <SignUpPreview />
        </div>
        <div className="form-container sign-in-container">
          <SignInForm />
        </div>
        {!isMobile && (
          <OverlayPanel
            isRightPanelActive={isRightPanelActive}
            togglePanel={togglePanel}
          />
        )}
        {isMobile && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-600">
              {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}
            </p>
            <a
              href="/signup"
              className="font-medium text-government-600 hover:text-government-700"
            >
              {language === "ar" ? "تسجيل" : "Sign Up"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;