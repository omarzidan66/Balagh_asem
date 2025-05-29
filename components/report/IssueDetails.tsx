
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { issueCategories, departmentMapping } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface IssueDetailsProps {
  title: string;
  description: string;
  category: string;
  department: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

export const IssueDetails = ({
  title,
  description,
  category,
  department,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onDepartmentChange,
}: IssueDetailsProps) => {
  const { language } = useLanguage();
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === "ar" ? "تفاصيل المشكلة" : "Issue Details"}</CardTitle>
        <CardDescription>
          {language === "ar"
            ? "قدم معلومات عن المشكلة التي تريد الإبلاغ عنها"
            : "Provide information about the issue you want to report"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">{language === "ar" ? "عنوان المشكلة*" : "Issue Title*"}</Label>
          <Input
            id="title"
            placeholder={language === "ar" 
              ? "وصف موجز للمشكلة"
              : "Brief description of the issue"}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">{language === "ar" ? "الوصف*" : "Description*"}</Label>
          <Textarea
            id="description"
            placeholder={language === "ar"
              ? "يرجى تقديم تفاصيل عن المشكلة..."
              : "Please provide details about the issue..."}
            rows={5}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">{language === "ar" ? "الفئة*" : "Category*"}</Label>
          <Select
            value={category}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder={language === "ar" ? "اختر الفئة" : "Select category"} />
            </SelectTrigger>
            <SelectContent>
              {issueCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">{language === "ar" ? "القسم المسؤول*" : "Responsible Department*"}</Label>
          <Select
            value={department}
            onValueChange={onDepartmentChange}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder={language === "ar" ? "اختر القسم" : "Select department"} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(departmentMapping).map(([key, { en, ar }]) => (
                <SelectItem key={key} value={key}>
                  {language === "ar" ? ar : en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
