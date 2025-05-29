// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flag, MapPin, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-government-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 color-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl mb-8 text-government-100">
                {t('heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-400 text-gray-800 hover:bg-yellow-300" asChild>
                  <Link to="/report">{t('reportButton')}</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-yellow-400 text-gray-800 hover:bg-yellow-300" asChild>
                  <Link to="/issues">{t('viewIssuesButton')}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <img 
                src="L4.png"
                alt={language === "ar" ? "مشاركة المجتمع" : "Community participation"}
                className="rounded-lg shadow-lg"
                width="500"
                height="500"
                style={{ 
                  marginBottom: "20px", 
                  filter: "drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.3))",
                  boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)" 
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <Flag className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('reportAnIssueTitle')}</h3>
                <p className="text-gray-600">
                  {t('reportAnIssueDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('locatePrecisely')}</h3>
                <p className="text-gray-600">
                  {t('locatePreciselyDesc')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 px-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-government-100 p-4 rounded-full mb-4">
                  <BarChart className="h-6 w-6 text-government-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('trackProgress')}</h3>
                <p className="text-gray-600">
                  {t('trackProgressDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-government-600 hover:bg-government-700" asChild>
              <Link to="/about">{t('learnMore')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-government-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('readyToImprove')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-government-100">
            {t('readyToImproveDesc')}
          </p>
          <Button size="lg" className="bg-yellow-400 text-gray-800 hover:bg-yellow-300" asChild>
            <Link to="/report">{t('reportNow')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;