import { useLanguage } from "@/contexts/LanguageContext";

interface OverlayPanelProps {
  isRightPanelActive: boolean;
  togglePanel: () => void;
}

const OverlayPanel = ({ isRightPanelActive, togglePanel }: OverlayPanelProps) => {
  const { language } = useLanguage();

  return (
    <div className="overlay-container z-500">
      <div className="overlay">
        <div className={"overlay-panel overlay-left"}>
          <img
            src={language === "ar" ? "L10.png" : "L10.png"}
            width="150"
            height="150"
            style={{ 
              marginBottom: "20px", 
              filter: "drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.3))",
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.9)" // زيادة الإضاءة أكثر
            }}
          />
          <p className="auth-text">
            {language === "ar" 
              ? "للبقاء على اتصال معنا، يرجى تسجيل الدخول باستخدام معلوماتك الشخصية"
              : "To keep connected with us please login with your personal info"}
          </p>
          <button className="auth-button ghost" id="signIn" onClick={togglePanel}>
            {language === "ar" ? "تسجيل الدخول" : "Sign In"}
          </button>
        </div>
        
        <div className="overlay-panel overlay-right">
          <img
            src={language === "ar" ? "2.jpg.png" : "2.jpg.png"}
            width="150"
            height="150"
            style={{ 
              marginBottom: "20px", 
              filter: "drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.3))",
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.9)" // زيادة الإضاءة أكثر
            }}
          />
          <p className="auth-text">
            {language === "ar"
              ? "أدخل بياناتك الشخصية وابدأ الرحلة معنا"
              : "Enter your personal details and start journey with us"}
          </p>
          <button className="auth-button ghost" id="signUp" onClick={togglePanel}>
            {language === "ar" ? "تسجيل" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayPanel;