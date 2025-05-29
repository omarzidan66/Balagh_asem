import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import IssuesPage from "./pages/IssuesPage";
import ReportPage from "./pages/ReportPage";
import IssuePage from "./pages/IssuePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/faqPage";
import ContactPage from "./pages/ContactPage";
import ReportProblemPage from "./pages/ReportProblemPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CommunityStatsPage from "./pages/CommunityStatsPage";
import MyReports from "./pages/MyReports";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // استيراد الصفحة الجديدة
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const DirectionHandler = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (language === "ar") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [language]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Layout>
                  <DirectionHandler />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* إضافة المسار */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/stats" element={<CommunityStatsPage />} />
                    <Route
                      path="/issues"
                      element={
                        <ProtectedRoute allowedRoles={["government", "regular"]}>
                          <IssuesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/report"
                      element={
                        <ProtectedRoute allowedRoles={["regular"]}>
                          <ReportPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/issue/:id" element={<IssuePage />} />
                    <Route path="/issues/:id/report-problem" element={<ReportProblemPage />} />
                    <Route
                      path="/my-reports"
                      element={
                        <ProtectedRoute allowedRoles={["regular", "government"]}>
                          <MyReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;