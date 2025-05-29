import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AuthStylesProps {
  colorPrimary?: string;
  colorSecondary?: string;
}

const AuthStyles = ({ colorPrimary = "#0093C3", colorSecondary = "#33A9CF" }: AuthStylesProps) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
      
      .auth-container {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        position: relative;
        overflow: hidden;
        width: 768px;
        max-width: 100%;
        min-height: 580px;
        font-family: "Montserrat", sans-serif;
        ${isMobile ? 'width: 100%; min-height: auto; box-shadow: none; flex-direction: column; max-width: 400px;' : ''}
      }
      
      .mobile-auth-container {
        flex-direction: column;
        min-height: auto;
        box-shadow: none;
        max-width: 400px;
      }
      
      .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
        ${isMobile ? 'position: relative; width: 100%; padding: 30px 20px; height: auto;' : ''}
      }
      
      .auth-container.mobile-auth-container .form-container {
        position: relative;
        width: 100%;
        padding: 30px 20px;
        height: auto;
      }
      
      .sign-in-container {
        left: 0;
        width: 50%;
        z-index: 2;
        ${isMobile ? 'width: 100%;' : ''}
      }
      
      .auth-container.right-panel-active .sign-in-container {
        transform: translateX(100%);
        ${isMobile ? 'display: none;' : ''}
      }
      
      .sign-up-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
        ${isMobile ? 'display: none;' : ''}
      }
      
      .auth-container.right-panel-active .sign-up-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
        ${isMobile ? 'display: block; width: 100%;' : ''}
      }
      
      @keyframes show {
        0%, 49.99% { opacity: 0; z-index: 1; }
        50%, 100% { opacity: 1; z-index: 5; }
      }
      
      .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform 0.6s ease-in-out;
        z-index: 40;
        ${isMobile ? 'display: none;' : ''}
      }
      
      .auth-container.right-panel-active .overlay-container {
        transform: translateX(-100%);
      }
      
      .overlay {
        background: ${colorPrimary};
        background: linear-gradient(to right, ${colorPrimary}, ${colorSecondary});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #ffffff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
      }
      
      .auth-container.right-panel-active .overlay {
        transform: translateX(50%);
      }
      
      html[dir="rtl"] .overlay-container {
        left: 50%;
        right: 0;
      }
      
      html[dir="rtl"] .overlay {
        left: auto;
        right: -100%;
        background: linear-gradient(to left, ${colorPrimary}, ${colorSecondary});
      }
      
      html[dir="rtl"] .auth-container.right-panel-active .overlay {
        transform: translateX(-50%);
      }
      
      html[dir="rtl"] .overlay-right {
        right: auto;
        left: 0;
      }
      
      html[dir="rtl"] .overlay-left {
        transform: translateX(20%);
      }
      
      html[dir="rtl"] .auth-container.right-panel.medianize .overlay-left {
        transform: translateX(0);
      }
      
      html[dir="rtl"] .auth-container.right-panel-active .overlay-right {
        transform: translateX(-20%);
      }
      
      html[dir="rtl"] .sign-in-container {
        left: 0;
        right: auto;
      }
      
      html[dir="rtl"] .auth-container.right-panel-active .sign-in-container {
        transform: translateX(-100%);
      }
      
      html[dir="rtl"] .sign-up-container {
        left: 0;
        right: auto;
      }
      
      html[dir="rtl"] .auth-container.right-panel-active .sign-up-container {
        transform: translateX(100%);
      }
      
      .overlay-panel {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 40px;
        text-align: center;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
      }
      
      .overlay-left {
        transform: translateX(-20%);
      }
      
      .auth-container.right-panel-active .overlay-left {
        transform: translateX(0);
      }
      
      .overlay-right {
        right: 0;
        transform: translateX(0);
      }
      
      .auth-container.right-panel-active .overlay-right {
        transform: translateX(20%);
      }
      
      .auth-form {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        text-align: center;
        ${isMobile ? 'padding: 0 15px;' : ''}
      }
      
      .auth-input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
      }
      
      .password-container {
        position: relative;
        width: 100%;
      }
      
      .password-toggle-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: ${colorPrimary};
      }
      
      html[dir="rtl"] .password-toggle-icon {
        right: auto;
        left: 10px;
      }
      
      .auth-button {
        border-radius: 20px;
        border: 1px solid ${colorPrimary};
        background-color: ${colorPrimary};
        color: #ffffff;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
        cursor: pointer;
        margin-top: 15px;
      }
      
      .auth-button:active {
        transform: scale(0.95);
      }
      
      .auth-button:focus {
        outline: none;
      }
      
      .auth-button.ghost {
        background-color: transparent;
        border-color: #ffffff;
      }
      
      .social-container {
        margin: 20px 0;
        display: flex;
        justify-content: center;
      }
      
      .social-container a {
        border: 1px solid #dddddd;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 40px;
        width: 40px;
        color: ${colorPrimary};
        text-decoration: none;
      }
      
      .auth-title {
        font-weight: bold;
        margin: 0;
        margin-bottom: 15px;
      }
      
      .auth-text {
        font-size: 14px;
        font-weight: 100;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
      }
      
      @media (max-width: 768px) {
        .auth-container {
          width: 100%;
          min-height: auto;
          box-shadow: none;
          flex-direction: column;
          max-width: 400px;
        }
        .form-container {
          position: relative;
          width: 100%;
          padding: 30px 20px;
          height: auto;
        }
        .sign-in-container {
          width: 100%;
        }
        .auth-container.right-panel-active .sign-in-container {
          display: none;
        }
        .sign-up-container {
          display: none;
        }
        .auth-container.right-panel-active .sign-up-container {
          display: block;
          width: 100%;
        }
        .overlay-container {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [colorPrimary, colorSecondary, isMobile]);

  return null;
};

export default AuthStyles;