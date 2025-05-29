
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IssueDetails } from "@/components/report/IssueDetails";
import { LocationInfo } from "@/components/report/LocationInfo";
import { PhotoUpload } from "@/components/report/PhotoUpload";
import { ContactInfo } from "@/components/report/ContactInfo";
import { useLanguage } from "@/contexts/LanguageContext";
import { departmentMapping } from "@/data/mockData";

const ReportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lng: -74.006 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !location || !department) {
      toast({
        title: language === "ar" ? "معلومات ناقصة" : "Missing information",
        description: language === "ar" 
          ? "يرجى ملء جميع الحقول المطلوبة."
          : "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: language === "ar" ? "تم الإبلاغ عن المشكلة بنجاح" : "Issue reported successfully",
        description: language === "ar"
          ? "تم تقديم بلاغك وسيتم مراجعته قريبًا."
          : "Your issue has been submitted and will be reviewed shortly.",
      });
      navigate("/issues");
    }, 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast({
          title: language === "ar" ? "الملفات كبيرة جدًا" : "Files too large",
          description: language === "ar"
            ? "بعض الملفات تتجاوز حد الحجم 10 ميجابايت ولم تتم إضافتها."
            : "Some files exceed the 10MB size limit and were not added.",
          variant: "destructive",
        });
      }
      
      const validFiles = newFiles.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
        const isValidSize = file.size <= 10 * 1024 * 1024;
        return isValidType && isValidSize;
      });
      
      const newPhotos = [...photos, ...validFiles];
      setPhotos(newPhotos);
      
      const newPreviews = validFiles.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return file.type === 'application/pdf' ? 'pdf' : '';
      });
      
      setPhotoPreviews([...photoPreviews, ...newPreviews]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    
    if (newPreviews[index] && newPreviews[index] !== 'pdf') {
      URL.revokeObjectURL(newPreviews[index]);
    }
    
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  // Get the department name for display
  const getDepartmentName = (deptKey: string) => {
    if (!deptKey) return "";
    return language === "ar" 
      ? departmentMapping[deptKey as keyof typeof departmentMapping]?.ar
      : departmentMapping[deptKey as keyof typeof departmentMapping]?.en;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {language === "ar" ? "الإبلاغ عن مشكلة" : "Report an Issue"}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <IssueDetails
              title={title}
              description={description}
              category={category}
              department={department}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onCategoryChange={setCategory}
              onDepartmentChange={setDepartment}
            />
            
            <LocationInfo
              location={location}
              coordinates={coordinates}
              onLocationChange={setLocation}
              onLocationSelect={(lat, lng) => setCoordinates({ lat, lng })}
            />
          </div>
          
          <div className="space-y-8">
            <PhotoUpload
              photos={photos}
              photoPreviews={photoPreviews}
              onPhotoUpload={handlePhotoUpload}
              onPhotoRemove={removePhoto}
            />
            
            <ContactInfo />
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "ar" ? "إرسال البلاغ" : "Submit Your Report"}
                </CardTitle>
                <CardDescription>
                  {language === "ar" 
                    ? "راجع معلوماتك وأرسل بلاغ المشكلة"
                    : "Review your information and submit your issue report"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {language === "ar"
                    ? "بإرسال هذا البلاغ، فإنك تؤكد أن المعلومات المقدمة دقيقة على حد علمك وقد يتم مشاركتها مع الإدارات الحكومية ذات الصلة."
                    : "By submitting this report, you confirm that the information provided is accurate to the best of your knowledge and may be shared with relevant government departments."}
                </p>
                {department && (
                  <div className="text-sm border-t pt-3 mt-3">
                    <p className="font-medium">
                      {language === "ar" ? "القسم المختار:" : "Selected Department:"}
                    </p>
                    <p className="text-government-600 font-medium">{getDepartmentName(department)}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-government-600 hover:bg-government-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === "ar" ? "جاري الإرسال..." : "Submitting...") 
                    : (language === "ar" ? "إرسال البلاغ" : "Submit Report")}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportPage;
