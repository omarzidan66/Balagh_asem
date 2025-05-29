import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MapPin, Building, ThumbsUp, MessageSquare, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Report {
  id: string;
  title_ar: string;
  title_en: string;
  location_ar: string;
  location_en: string;
  description_ar: string;
  description_en: string;
  status: "pending" | "inProgress" | "resolved";
  category: string;
  department: string;
  date: string;
  votes: number;
  comments: number;
  userId: string;
}

interface DraftReport {
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
}

export default function MyReports() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      title_ar: "إضاءة شارع معطلة",
      title_en: "Broken Street Light",
      location_ar: "شارع الملك عبدالله",
      location_en: "King Abdullah Street",
      description_ar: "إضاءة الشارع معطلة منذ أسبوع.",
      description_en: "Street light has been out for a week.",
      status: "pending",
      category: "Infrastructure",
      department: "Municipality",
      date: "2025-03-20",
      votes: 5,
      comments: 2,
      userId: "user1",
    },
    {
      id: "2",
      title_ar: "حفرة في الطريق الرئيسي",
      title_en: "Pothole on Main Road",
      location_ar: "شارع الملكة رانيا",
      location_en: "Queen Rania Street",
      description_ar: "حفرة كبيرة تسبب مشاكل في حركة المرور.",
      description_en: "Large pothole causing traffic issues.",
      status: "inProgress",
      category: "Roads",
      department: "Public Works",
      date: "2025-03-21",
      votes: 8,
      comments: 3,
      userId: "user1",
    },
    {
      id: "3",
      title_ar: "حاوية نفايات ممتلئة",
      title_en: "Overflowing Trash Bin",
      location_ar: "شارع الجامعة",
      location_en: "University Street",
      description_ar: "حاوية النفايات بالقرب من الحديقة ممتلئة.",
      description_en: "Trash bin near park is overflowing.",
      status: "resolved",
      category: "Sanitation",
      department: "Health Dept",
      date: "2025-03-22",
      votes: 3,
      comments: 1,
      userId: "user2",
    },
  ]);
  const [editReport, setEditReport] = useState<DraftReport | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('pleaseSignIn')}</h1>
        <Button asChild>
          <Link to="/signin">{t('signIn')}</Link>
        </Button>
      </div>
    );
  }

  const statusMap = {
    pending: { label: t('pending'), className: "bg-yellow-100 text-yellow-800" },
    inProgress: { label: t('inProgress'), className: "bg-blue-100 text-blue-800" },
    resolved: { label: t('resolved'), className: "bg-green-100 text-green-800" },
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter(report => report.id !== id));
    toast({
      title: t('reportDeleted'),
      description: t('reportDeletedSuccess'),
    });
  };

  const handleEdit = (report: Report) => {
    setEditReport({
      id: report.id,
      title_ar: report.title_ar,
      title_en: report.title_en,
      description_ar: report.description_ar,
      description_en: report.description_en,
      location_ar: report.location_ar,
      location_en: report.location_en,
      category: report.category,
      department: report.department,
      userId: report.userId,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (
      !editReport ||
      !editReport.title_ar ||
      !editReport.title_en ||
      !editReport.description_ar ||
      !editReport.description_en ||
      !editReport.location_ar ||
      !editReport.location_en
    ) {
      toast({
        title: t('requiredFields'),
        description: t('requiredFields'),
        variant: "destructive",
      });
      return;
    }
    setReports(
      reports.map(report =>
        report.id === editReport.id
          ? { ...report, ...editReport }
          : report
      )
    );
    setIsEditDialogOpen(false);
    setEditReport(null);
    toast({
      title: t('reportUpdated'),
      description: t('reportUpdatedSuccess'),
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('myReports')}</h1>
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="issue-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {t('titleLabel')}: {language === "ar" ? report.title_ar : report.title_en}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                    <span>{t('locationLabel')}: {language === "ar" ? report.location_ar : report.location_en}</span>
                  </CardDescription>
                </div>
                <Badge className={statusMap[report.status].className}>
                  {statusMap[report.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-2">
              <p className="text-sm text-gray-600 line-clamp-2">
                {t('descriptionLabel')}: {language === "ar" ? report.description_ar : report.description_en}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Badge variant="outline" className="flex items-center">
                  <span className="ml-1">{report.category}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Building className="h-3.5 w-3.5 mr-1" />
                  <span>{report.department}</span>
                </Badge>
                <span className="text-xs text-gray-500">{report.date}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-between">
              <div className="flex space-x-2 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-government-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{report.votes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-government-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>{report.comments}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(report)}
                  aria-label={t('edit')}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  {t('edit')}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      aria-label={t('delete')}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t('delete')}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('deleteConfirmation')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(report.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        {t('delete')}
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/issue/${report.id}`}>{t('viewDetails')}</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('editReport')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('editReportDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {editReport && (
            <div className="space-y-4">
              <Input
                value={editReport.title_ar}
                onChange={(e) => setEditReport({ ...editReport, title_ar: e.target.value })}
                placeholder={t('titlePlaceholder_ar')}
                className="mb-2"
              />
              <Input
                value={editReport.title_en}
                onChange={(e) => setEditReport({ ...editReport, title_en: e.target.value })}
                placeholder={t('titlePlaceholder_en')}
                className="mb-2"
              />
              <Textarea
                value={editReport.description_ar}
                onChange={(e) => setEditReport({ ...editReport, description_ar: e.target.value })}
                placeholder={t('descriptionPlaceholder_ar')}
                rows={3}
                className="mb-2"
              />
              <Textarea
                value={editReport.description_en}
                onChange={(e) => setEditReport({ ...editReport, description_en: e.target.value })}
                placeholder={t('descriptionPlaceholder_en')}
                rows={3}
                className="mb-2"
              />
              <Input
                value={editReport.location_ar}
                onChange={(e) => setEditReport({ ...editReport, location_ar: e.target.value })}
                placeholder={t('locationPlaceholder_ar')}
                className="mb-2"
              />
              <Input
                value={editReport.location_en}
                onChange={(e) => setEditReport({ ...editReport, location_en: e.target.value })}
                placeholder={t('locationPlaceholder_en')}
                className="mb-2"
              />
              <Input
                value={editReport.category}
                onChange={(e) => setEditReport({ ...editReport, category: e.target.value })}
                placeholder={t('categoryPlaceholder')}
                className="mb-2"
              />
              <Input
                value={editReport.department}
                onChange={(e) => setEditReport({ ...editReport, department: e.target.value })}
                placeholder={t('departmentPlaceholder')}
                className="mb-2"
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEditSubmit}
              className="bg-government-600 hover:bg-government-700"
            >
              {t('save')}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}