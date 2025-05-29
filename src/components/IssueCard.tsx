// src/components/IssueCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Building, Flag, MapPin, MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type IssueStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

export interface IssueCardProps {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category: string;
  location_ar: string;
  location_en: string;
  status: IssueStatus;
  date: string;
  votes: number;
  comments: number;
  department?: string;
  userId: string; // إضافة userId للتحقق من الأذونات
  onEdit?: (updatedData: Partial<DraftIssue>) => void; // دالة لتعديل البلاغ
  onDelete?: () => void; // دالة لحذف البلاغ
  onSaveDraft?: (draft: DraftIssue) => void; // دالة لحفظ المسودة
}

interface DraftIssue {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  location_ar: string;
  location_en: string;
  category: string;
  department: string;
  userId: string;
  createdAt: string;
}

export default function IssueCard({
  id,
  title_ar,
  title_en,
  description_ar,
  description_en,
  category,
  location_ar,
  location_en,
  status,
  date,
  votes,
  comments,
  department,
  userId,
  onEdit,
  onDelete,
  onSaveDraft,
}: IssueCardProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title_ar,
    title_en,
    description_ar,
    description_en,
    location_ar,
    location_en,
    category,
    department: department || "Public Works",
  });

  const translations = {
    status: {
      pending: language === "ar" ? "معلق" : "Pending",
      "in-progress": language === "ar" ? "قيد التنفيذ" : "In Progress",
      resolved: language === "ar" ? "تم الحل" : "Resolved",
      rejected: language === "ar" ? "مرفوض" : "Rejected",
    },
    categories: {
      Roads: language === "ar" ? "الطرق" : "Roads",
      Utilities: language === "ar" ? "المرافق" : "Utilities",
      Sanitation: language === "ar" ? "النظافة" : "Sanitation",
      Safety: language === "ar" ? "السلامة" : "Safety",
      "Public Spaces": language === "ar" ? "الأماكن العامة" : "Public Spaces",
      Other: language === "ar" ? "أخرى" : "Other",
    },
    departments: {
      Transportation: language === "ar" ? "النقل" : "Transportation",
      Environment: language === "ar" ? "البيئة" : "Environment",
      "Public Works": language === "ar" ? "الأشغال العامة" : "Public Works",
      "Water Authority": language === "ar" ? "سلطة المياه" : "Water Authority",
      "Electricity Department": language === "ar" ? "قسم الكهرباء" : "Electricity Department",
      Communication: language === "ar" ? "الاتصالات" : "Communication",
      "Health Department": language === "ar" ? "قسم الصحة" : "Health Department",
      Other: language === "ar" ? "أخرى" : "Other",
    },
    viewDetails: language === "ar" ? "عرض التفاصيل" : "View Details",
    titleLabel: language === "ar" ? "العنوان" : "Title",
    locationLabel: language === "ar" ? "الموقع" : "Location",
    descriptionLabel: language === "ar" ? "الوصف" : "Description",
    edit: language === "ar" ? "تعديل" : "Edit",
    delete: language === "ar" ? "حذف" : "Delete",
    saveDraft: language === "ar" ? "حفظ كمسودة" : "Save as Draft",
    save: language === "ar" ? "حفظ" : "Save",
    cancel: language === "ar" ? "إلغاء" : "Cancel",
  };

  const statusMap = {
    pending: { label: translations.status.pending, className: 'bg-amber-100 text-amber-800 border-amber-200' },
    'in-progress': { label: translations.status["in-progress"], className: 'bg-blue-100 text-blue-800 border-blue-200' },
    resolved: { label: translations.status.resolved, className: 'bg-green-100 text-green-800 border-green-200' },
    rejected: { label: translations.status.rejected, className: 'bg-red-100 text-red-800 border-red-200' },
  };

  const categoryIcons = {
    Roads: <AlertTriangle className="h-4 w-4" />,
    Utilities: <AlertTriangle className="h-4 w-4" />,
    Sanitation: <AlertTriangle className="h-4 w-4" />,
    Safety: <AlertTriangle className="h-4 w-4" />,
    'Public Spaces': <AlertTriangle className="h-4 w-4" />,
    Other: <Flag className="h-4 w-4" />,
  };

  const icon = categoryIcons[category as keyof typeof categoryIcons] || <Flag className="h-4 w-4" />;
  const statusInfo = statusMap[status];
  const translatedCategory = translations.categories[category as keyof typeof translations.categories] || category;
  const translatedDepartment = department
    ? translations.departments[department as keyof typeof translations.departments] || department
    : translations.departments["Public Works"];
  const title = language === "ar" ? title_ar : title_en;
  const description = language === "ar" ? description_ar : description_en;
  const location = language === "ar" ? location_ar : location_en;

  // التحقق من الأذونات
  const canEdit = user && (user.id === userId || user.role === 'government');

  // دالة لحفظ المسودة
  const handleSaveDraft = () => {
    if (!user) {
      toast({
        title: language === "ar" ? "تسجيل الدخول مطلوب" : "Login Required",
        description: language === "ar"
          ? "يرجى تسجيل الدخول لحفظ المسودة."
          : "Please log in to save a draft.",
        variant: "destructive",
      });
      return;
    }

    onSaveDraft?.({
      id: `draft-${Date.now()}`,
      title_ar: editForm.title_ar,
      title_en: editForm.title_en,
      description_ar: editForm.description_ar,
      description_en: editForm.description_en,
      location_ar: editForm.location_ar,
      location_en: editForm.location_en,
      category: editForm.category,
      department: editForm.department,
      userId: user.id,
      createdAt: new Date().toISOString(),
    });

    toast({
      title: translations.saveDraft,
      description: language === "ar"
        ? "تم حفظ البلاغ كمسودة."
        : "The issue has been saved as a draft.",
    });
  };

  // دالة لحفظ التعديلات
  const handleEditSubmit = () => {
    onEdit?.({
      title_ar: editForm.title_ar,
      title_en: editForm.title_en,
      description_ar: editForm.description_ar,
      description_en: editForm.description_en,
      location_ar: editForm.location_ar,
      location_en: editForm.location_en,
      category: editForm.category,
      department: editForm.department,
    });
    setIsEditing(false);
    toast({
      title: translations.edit,
      description: language === "ar"
        ? "تم تعديل البلاغ بنجاح."
        : "The issue has been updated successfully.",
    });
  };

  // دالة لحذف البلاغ
  const handleDelete = () => {
    onDelete?.();
    toast({
      title: translations.delete,
      description: language === "ar"
        ? "تم حذف البلاغ بنجاح."
        : "The issue has been deleted successfully.",
    });
  };

  return (
    <Card className="issue-card">
      {isEditing && canEdit ? (
        <CardContent className="p-4 space-y-4">
          <Input
            value={editForm.title_ar}
            onChange={(e) => setEditForm({ ...editForm, title_ar: e.target.value })}
            placeholder={translations.titleLabel + " (AR)"}
            className="mb-2"
          />
          <Input
            value={editForm.title_en}
            onChange={(e) => setEditForm({ ...editForm, title_en: e.target.value })}
            placeholder={translations.titleLabel + " (EN)"}
            className="mb-2"
          />
          <Textarea
            value={editForm.description_ar}
            onChange={(e) => setEditForm({ ...editForm, description_ar: e.target.value })}
            placeholder={translations.descriptionLabel + " (AR)"}
            className="mb-2"
            rows={3}
          />
          <Textarea
            value={editForm.description_en}
            onChange={(e) => setEditForm({ ...editForm, description_en: e.target.value })}
            placeholder={translations.descriptionLabel + " (EN)"}
            className="mb-2"
            rows={3}
          />
          <Input
            value={editForm.location_ar}
            onChange={(e) => setEditForm({ ...editForm, location_ar: e.target.value })}
            placeholder={translations.locationLabel + " (AR)"}
            className="mb-2"
          />
          <Input
            value={editForm.location_en}
            onChange={(e) => setEditForm({ ...editForm, location_en: e.target.value })}
            placeholder={translations.locationLabel + " (EN)"}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={handleEditSubmit}>{translations.save}</Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              {translations.cancel}
            </Button>
            <Button onClick={handleSaveDraft} variant="outline">
              {translations.saveDraft}
            </Button>
          </div>
          <Button onClick={handleDelete} variant="destructive">
            {translations.delete}
          </Button>
        </CardContent>
      ) : (
        <>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  {translations.titleLabel}: {title}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{translations.locationLabel}: {location}</span>
                </CardDescription>
              </div>
              <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 pb-2">
            <p className="text-sm text-gray-600 line-clamp-2">
              {translations.descriptionLabel}: {description}
            </p>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="outline" className="flex items-center">
                {icon}
                <span className="ml-1">{translatedCategory}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <Building className="h-3.5 w-3.5 mr-1" />
                <span>{translatedDepartment}</span>
              </Badge>
              <span className="text-xs text-gray-500">{date}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 flex justify-between">
            <div className="flex space-x-2 text-sm text-gray-500">
              <button className="flex items-center space-x-1 hover:text-government-600">
                <ThumbsUp className="h-4 w-4" />
                <span>{votes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-government-600">
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </button>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/issue/${id}`}>{translations.viewDetails}</Link>
              </Button>
              {canEdit && (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    {translations.edit}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    {translations.delete}
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}