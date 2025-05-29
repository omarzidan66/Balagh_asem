import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext'; // إضافة استيراد useLanguage

export type UserRole = 'regular' | 'government';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  username?: string;
  nationalId?: string;
  phoneNumber?: string;
  department?: string;
  employeeId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, department?: string, forceRole?: UserRole) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    role: UserRole;
    username?: string;
    nationalId?: string;
    phoneNumber?: string;
    department?: string;
    employeeId?: string;
  }) => Promise<void>;
  signOut: () => void;
  requestPasswordReset: (identifier: string, userType: UserRole) => Promise<void>; // إضافة الدالة
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage(); // استخدام useLanguage لرسائل الخطأ المترجمة

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string, department?: string, forceRole?: UserRole) => {
    try {
      setIsLoading(true);
      
      // In a real app, you would validate credentials against a backend here
      // For now, we'll simulate successful authentication
      
      // Basic validation - in a real app this would be done on the server
      if (!email || !password) {
        throw new Error(language === 'ar' ? 'البريد الإلكتروني وكلمة المرور مطلوبان' : 'Email and password are required');
      }
      
      // Use forced role if provided, otherwise determine from email domain
      const userRole = forceRole || (email.endsWith('.gov') ? 'government' : 'regular');
      
      // If the user is government but doesn't provide department, reject
      if (userRole === 'government' && !department) {
        throw new Error(language === 'ar' ? 'يجب تحديد القسم للمستخدمين الحكوميين' : 'Government users must specify a department');
      }
      
      // Create the user object
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9), // Simple mock ID
        email,
        role: userRole,
        department: userRole === 'government' ? department : undefined,
      };
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Redirect based on role
      if (newUser.role === 'government') {
        navigate('/issues');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    role: UserRole;
    username?: string;
    nationalId?: string;
    phoneNumber?: string;
    department?: string;
    employeeId?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // In a real app, you would create the user in a backend here
      // For now, we'll simulate successful registration
      
      // Validate required fields based on role
      if (userData.role === 'regular') {
        if (!userData.nationalId || !userData.username || !userData.phoneNumber) {
          throw new Error(language === 'ar' ? 'الرقم الوطني، اسم المستخدم، ورقم الهاتف مطلوبة للمستخدمين العاديين' : 'National ID, username, and phone number are required for regular users');
        }
      } else if (userData.role === 'government') {
        if (!userData.department) {
          throw new Error(language === 'ar' ? 'القسم مطلوب للمستخدمين الحكوميين' : 'Department is required for government users');
        }
        if (!userData.employeeId) {
          throw new Error(language === 'ar' ? 'رقم الوظيفة مطلوب للمستخدمين الحكوميين' : 'Employee ID is required for government users');
        }
      }
      
      // Create the user object
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9), // Simple mock ID
        email: userData.email,
        role: userData.role,
        username: userData.username,
        nationalId: userData.nationalId,
        phoneNumber: userData.phoneNumber,
        department: userData.department,
        employeeId: userData.employeeId,
      };
      
      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Redirect based on role
      if (newUser.role === 'government') {
        navigate('/issues');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  const requestPasswordReset = async (identifier: string, userType: UserRole) => {
    try {
      // في تطبيق حقيقي، هنا بترسل طلب إلى الخادم لإعادة تعيين كلمة المرور
      // حاليًا، بنحاكي العملية
      console.log(`طلب استعادة كلمة المرور لـ ${userType}: ${identifier}`);

      // مثال مع Firebase (لو بتستخدم Firebase، شيل التعليق):
      // import { getAuth, sendPasswordResetEmail } from "firebase/auth";
      // const auth = getAuth();
      // if (userType === "regular") {
      //   await sendPasswordResetEmail(auth, identifier);
      // } else {
      //   throw new Error(language === "ar" ? "استعادة كلمة المرور للحسابات الحكومية غير مدعومة." : "Password reset for government accounts is not supported.");
      // }

      // مثال مع API مخصص:
      // await fetch("/api/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ identifier, userType }),
      // });

      // محاكاة النجاح
      if (!identifier) {
        throw new Error(language === 'ar' ? 'البريد الإلكتروني أو رقم الوظيفة مطلوب' : 'Email or employee ID is required');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error(
        userType === 'regular'
          ? language === 'ar'
            ? 'فشل إرسال رابط استعادة كلمة المرور. تحقق من بريدك الإلكتروني.'
            : 'Failed to send password reset link. Please check your email.'
          : language === 'ar'
          ? 'فشل إرسال طلب استعادة كلمة المرور. تحقق من رقم الوظيفة.'
          : 'Failed to send password reset request. Please check your employee ID.'
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, requestPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
};