
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IssueMap from "@/components/IssueMap";
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationInfoProps {
  location: string;
  coordinates: { lat: number; lng: number };
  onLocationChange: (value: string) => void;
  onLocationSelect: (lat: number, lng: number) => void;
}

export const LocationInfo = ({
  location,
  coordinates,
  onLocationChange,
  onLocationSelect,
}: LocationInfoProps) => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "ar" ? "معلومات الموقع" : "Location Information"}</CardTitle>
        <CardDescription>
          {language === "ar" ? "أخبرنا أين تقع المشكلة" : "Tell us where the issue is located"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">{language === "ar" ? "العنوان أو وصف الموقع*" : "Address or Location Description*"}</Label>
          <Input
            id="location"
            placeholder={language === "ar" 
              ? "مثال: شارع الملك عبدالله، أو 'تقاطع شارع الجامعة مع شارع الملكة رانيا'" 
              : "Example: King Abdullah Street, or 'Intersection of University Street and Queen Rania Street'"}
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>{language === "ar" ? "حدد الموقع على الخريطة" : "Mark Location on Map"}</Label>
          <IssueMap
            lat={coordinates.lat}
            lng={coordinates.lng}
            onLocationSelect={onLocationSelect}
          />
        </div>
      </CardContent>
    </Card>
  );
};
