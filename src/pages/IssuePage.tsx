// src/pages/IssuePage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, CalendarIcon, CheckCircle, Clock, Flag, MapPin, MessageSquare, ThumbsDown, ThumbsUp, User, XCircle, Star } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import IssueMap from "@/components/IssueMap";
import { mockIssues } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

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

const IssuePage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [issueStatus, setIssueStatus] = useState<'pending' | 'in-progress' | 'resolved' | 'rejected'>();
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<DraftIssue | null>(null);
  const [drafts, setDrafts] = useState<DraftIssue[]>([]);

  const issue = mockIssues.find(issue => issue.id === id);

  if (!issue) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {language === "ar" ? "المشكلة غير موجودة" : "Issue Not Found"}
        </h1>
        <p className="mb-8">
          {language === "ar"
            ? "المشكلة التي تبحث عنها غير موجودة أو تمت إزالتها."
            : "The issue you're looking for doesn't exist or has been removed."}
        </p>
        <Button asChild>
          <Link to="/issues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "ar" ? "العودة إلى المشكلات" : "Back to Issues"}
          </Link>
        </Button>
      </div>
    );
  }

  if (!issueStatus && issue) {
    setIssueStatus(issue.status);
  }

  if (!editForm && issue && isEditing) {
    setEditForm({
      id: issue.id,
      title_ar: issue.title_ar,
      title_en: issue.title_en,
      description_ar: issue.description_ar,
      description_en: issue.description_en,
      location_ar: issue.location_ar,
      location_en: issue.location_en,
      category: issue.category,
      department: issue.department || "Public Works",
      userId: issue.userId,
      createdAt: issue.date,
    });
  }

  const statusMap = {
    'pending': {
      label: language === "ar" ? "قيد المراجعة" : "Pending Review",
      className: 'bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-sm'
    },
    'in-progress': {
      label: language === "ar" ? "قيد التنفيذ" : "In Progress",
      className: 'bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-sm'
    },
    'resolved': {
      label: language === "ar" ? "تم الحل" : "Resolved",
      className: 'bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-full text-sm'
    },
    'rejected': {
      label: language === "ar" ? "غير معتمد" : "Not Approved",
      className: 'bg-red-100 text-red-800 border border-red-200 px-3 py-1 rounded-full text-sm'
    },
  };

  const statusInfo = statusMap[issueStatus || issue.status];

  const title = language === "ar" ? issue.title_ar : issue.title_en;
  const description = language === "ar" ? issue.description_ar : issue.description_en;
  const location = language === "ar" ? issue.location_ar : issue.location_en;
  const category = language === "ar"
    ? {
        Roads: "الطرق",
        Utilities: "المرافق",
        Sanitation: "النظافة",
        Safety: "السلامة",
        "Public Spaces": "الأماكن العامة",
        Other: "أخرى",
      }[issue.category] || issue.category
    : issue.category;
  const department = language === "ar"
    ? {
        "Transportation": "النقل",
        "Environment": "البيئة",
        "Public Works": "الأشغال العامة",
        "Water Authority": "سلطة المياه",
        "Electricity Department": "قسم الكهرباء",
        "Communication": "الاتصالات",
        "Health Department": "قسم الصحة",
        "Other": "أخرى",
      }[issue.department || "Public Works"] || issue.department
    : issue.department || "Public Works";

  const handleApprove = () => {
    setIssueStatus('in-progress');
    toast({
      title: language === "ar" ? "تم اعتماد المشكلة" : "Issue approved",
      description: language === "ar"
        ? "تم اعتماد المشكلة وهي الآن قيد التنفيذ."
        : "The issue has been approved and is now in progress.",
    });
  };

  const handleReject = () => {
    if (!statusUpdate.trim()) {
      toast({
        title: language === "ar" ? "سبب الرفض مطلوب" : "Rejection reason required",
        description: language === "ar"
          ? "يرجى تقديم سبب لرفض هذه المشكلة."
          : "Please provide a reason for rejecting this issue.",
        variant: "destructive",
      });
      return;
    }

    setIssueStatus('rejected');
    setShowRejectionDialog(false);
    toast({
      title: language === "ar" ? "تم رفض المشكلة" : "Issue rejected",
      description: language === "ar"
        ? "تم رفض المشكلة مع السبب المقدم من قبلك."
        : "The issue has been rejected with your provided reason.",
    });
  };

  const handleRevert = () => {
    setIssueStatus('pending');
    setStatusUpdate("");
    toast({
      title: language === "ar" ? "تم إلغاء القرار" : "Decision reverted",
      description: language === "ar"
        ? "تمت إعادة المشكلة إلى حالة الانتظار."
        : "The issue has been reverted to pending status.",
    });
  };

  const handleComment = () => {
    if (!comment.trim() && rating === 0) {
      toast({
        title: language === "ar" ? "لا يوجد تعليق أو تقييم" : "No comment or rating",
        description: language === "ar"
          ? "يرجى إدخال تعليق أو اختيار تقييم بالنجوم قبل الإرسال."
          : "Please enter a comment or select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: language === "ar" ? "تم إرسال التعليق" : "Comment submitted",
      description: language === "ar"
        ? `تمت إضافة تعليقك${rating > 0 ? ` وتقييمك (${rating} نجوم)` : ""} إلى هذه المشكلة.`
        : `Your comment${rating > 0 ? ` and rating (${rating} stars)` : ""} has been added to this issue.`,
    });

    setComment("");
    setRating(0);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
      toast({
        title: language === "ar" ? "شكراً لك" : "Thank you",
        description: language === "ar"
          ? "لقد قمت بالتصويت لصالح هذه المشكلة."
          : "You've upvoted this issue.",
      });
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
      toast({
        title: language === "ar" ? "تم استلام ملاحظاتك" : "Feedback received",
        description: language === "ar"
          ? "لقد قمت بالتصويت ضد هذه المشكلة."
          : "You've downvoted this issue.",
      });
    }
  };

  const handleSaveDraft = () => {
    if (!editForm || !user) {
      toast({
        title: language === "ar" ? "تسجيل الدخول مطلوب" : "Login Required",
        description: language === "ar"
          ? "يرجى تسجيل الدخول لحفظ المسودة."
          : "Please log in to save a draft.",
        variant: "destructive",
      });
      return;
    }

    setDrafts([...drafts, { ...editForm, id: `draft-${Date.now()}`, createdAt: new Date().toISOString() }]);
    toast({
      title: language === "ar" ? "تم حفظ المسودة" : "Draft Saved",
      description: language === "ar"
        ? "تم حفظ البلاغ كمسودة."
        : "The issue has been saved as a draft.",
    });
  };

  const handleEditSubmit = () => {
    if (!editForm) return;
    const updatedIssues = mockIssues.map(i =>
      i.id === id && i.userId === user?.id
        ? { ...i, ...editForm }
        : i
    );
    (mockIssues as any).splice(0, mockIssues.length, ...updatedIssues);
    setIsEditing(false);
    toast({
      title: language === "ar" ? "تم تعديل البلاغ" : "Issue Updated",
      description: language === "ar"
        ? "تم تحديث بيانات البلاغ."
        : "The issue has been updated.",
    });
  };

  const handleDelete = () => {
    const updatedIssues = mockIssues.filter(i => i.id !== id || i.userId !== user?.id);
    (mockIssues as any).splice(0, mockIssues.length, ...updatedIssues);
    toast({
      title: language === "ar" ? "تم حذف البلاغ" : "Issue Deleted",
      description: language === "ar"
        ? "تم حذف البلاغ بنجاح."
        : "The issue has been deleted successfully.",
    });
    navigate("/issues");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setRating(i)}
          className="focus:outline-none"
        >
          <Star
            className={`h-6 w-6 ${i <= rating ? "text-blue-500 fill-current" : "text-gray-300"}`}
          />
        </button>
      );
    }
    return stars;
  };

  const renderCommentStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? "text-blue-500 fill-current" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  const canEdit = user && (user.id === issue.userId || user.role === "government");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/issues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "ar" ? "العودة إلى المشكلات" : "Back to Issues"}
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>
                  {language === "ar"
                    ? `تم الإبلاغ في ${new Date(issue.date).toLocaleDateString('ar')}`
                    : `Reported on ${new Date(issue.date).toLocaleDateString()}`}
                </span>
              </div>
              <div className="flex items-center">
                <Flag className="mr-1 h-4 w-4" />
                <span>{category}</span>
              </div>
            </div>
          </div>

          <div className={statusInfo.className}>
            {statusInfo.label}
          </div>
        </div>

        {canEdit && (
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setIsEditing(true)}>{language === "ar" ? "تعديل" : "Edit"}</Button>
            <Button onClick={handleDelete} variant="destructive">{language === "ar" ? "حذف" : "Delete"}</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              {isEditing && canEdit ? (
                <div className="space-y-4">
                  <Input
                    value={editForm?.title_ar}
                    onChange={(e) => setEditForm({ ...editForm!, title_ar: e.target.value })}
                    placeholder={language === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}
                    className="mb-2"
                  />
                  <Input
                    value={editForm?.title_en}
                    onChange={(e) => setEditForm({ ...editForm!, title_en: e.target.value })}
                    placeholder={language === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}
                    className="mb-2"
                  />
                  <Textarea
                    value={editForm?.description_ar}
                    onChange={(e) => setEditForm({ ...editForm!, description_ar: e.target.value })}
                    placeholder={language === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}
                    className="mb-2"
                    rows={3}
                  />
                  <Textarea
                    value={editForm?.description_en}
                    onChange={(e) => setEditForm({ ...editForm!, description_en: e.target.value })}
                    placeholder={language === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}
                    className="mb-2"
                    rows={3}
                  />
                  <Input
                    value={editForm?.location_ar}
                    onChange={(e) => setEditForm({ ...editForm!, location_ar: e.target.value })}
                    placeholder={language === "ar" ? "الموقع (عربي)" : "Location (Arabic)"}
                    className="mb-2"
                  />
                  <Input
                    value={editForm?.location_en}
                    onChange={(e) => setEditForm({ ...editForm!, location_en: e.target.value })}
                    placeholder={language === "ar" ? "الموقع (إنجليزي)" : "Location (English)"}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleEditSubmit}>{language === "ar" ? "حفظ" : "Save"}</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      {language === "ar" ? "إلغاء" : "Cancel"}
                    </Button>
                    <Button onClick={handleSaveDraft} variant="outline">
                      {language === "ar" ? "حفظ كمسودة" : "Save as Draft"}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    {language === "ar" ? "وصف المشكلة" : "Issue Description"}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {description}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">
                      {language === "ar" ? "الموقع" : "Location"}
                    </h3>
                    <div className="h-96">
                      <IssueMap readOnly={true} />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "ar" ? "التحديثات" : "Updates"}
              </h2>

              {issueStatus === 'in-progress' || issueStatus === 'resolved' ? (
                <div className="space-y-4">
                  {issueStatus === 'resolved' && (
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <div className="flex items-center text-green-700 mb-1">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          {language === "ar" ? "تم حل المشكلة" : "Issue Resolved"}
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          {language === "ar" ? "منذ يومين" : "2 days ago"}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {language === "ar"
                          ? "تمت معالجة هذه المشكلة بنجاح من قبل إدارة الأشغال العامة. تم إصلاح المنطقة وهي الآن آمنة للاستخدام العام."
                          : "This issue has been successfully addressed by the Department of Public Works. The area has been repaired and is now safe for public use."}
                      </p>
                    </div>
                  )}

                  {issueStatus === 'in-progress' || issueStatus === 'resolved' ? (
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center text-blue-700 mb-1">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          {language === "ar" ? "العمل جارٍ" : "Work In Progress"}
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          {language === "ar" ? "منذ 5 أيام" : "5 days ago"}
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {language === "ar"
                          ? `تم تكليف ${department} بالمشكلة. تم إرسال فريق لمعالجة المشكلة المبلغ عنها.`
                          : `The issue has been assigned to ${department}. A team has been dispatched to address the reported problem.`}
                      </p>
                    </div>
                  ) : null}

                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <div className="flex items-center text-amber-700 mb-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        {language === "ar" ? "تم استلام المشكلة" : "Issue Acknowledged"}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {language === "ar" ? "منذ 7 أيام" : "7 days ago"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {language === "ar"
                        ? "تمت مراجعة تقريرك والتحقق منه. تم تعيينه للتقييم والحل."
                        : "Your report has been reviewed and verified. It has been assigned for assessment and resolution."}
                    </p>
                  </div>
                </div>
              ) : issueStatus === 'rejected' ? (
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4 py-2">
                    <div className="flex items-center text-red-700 mb-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        {language === "ar" ? "تم رفض التقرير" : "Report Not Approved"}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {language === "ar" ? "منذ 3 أيام" : "3 days ago"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {language === "ar"
                        ? statusUpdate || "بعد المراجعة، لم تتم الموافقة على هذا التقرير للإجراء. قد يكون ذلك لأن المشكلة موجودة في ملكية خاصة، أو تمت معالجتها بالفعل، أو تقع خارج نطاق اختصاصنا."
                        : statusUpdate || "After review, this report was not approved for action. This may be because the issue is on private property, has already been addressed, or falls outside our jurisdiction."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-4 py-2">
                    <div className="flex items-center text-amber-700 mb-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span className="font-medium">
                        {language === "ar" ? "تم استلام التقرير" : "Report Received"}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {language === "ar" ? "الآن" : "Just now"}
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {language === "ar"
                        ? "تم استلام تقريرك وهو قيد المراجعة من قبل فريقنا. عادة ما نقوم بمعالجة التقارير الجديدة في غضون 1-2 يوم عمل."
                        : "Your report has been received and is awaiting review by our team. We typically process new reports within 1-2 business days."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "ar" ? "مناقشة المجتمع" : "Community Discussion"}
              </h2>

              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          {language === "ar" ? "جين سميث" : "Jane Smith"}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {language === "ar" ? "منذ 3 أيام" : "3 days ago"}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        {language === "ar"
                          ? "لقد لاحظت هذه المشكلة أيضًا. إنها تشكل خطرًا على المشاة، خاصة في المساء. آمل أن يتم إصلاحها قريبًا."
                          : "I've noticed this issue too. It's been a hazard for pedestrians, especially during the evening. I hope it gets fixed soon."}
                      </p>
                      <div className="flex items-center mt-1 space-x-1">
                        {renderCommentStars(4)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          {language === "ar" ? "مايكل جونسون" : "Michael Johnson"}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {language === "ar" ? "منذ يومين" : "2 days ago"}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">
                        {language === "ar"
                          ? "أبلغت عن نفس المشكلة الشهر الماضي. سعيد برؤيتها تحظى بمزيد من الاهتمام الآن."
                          : "I reported this same issue last month. Glad to see it's getting more attention now."}
                      </p>
                      <div className="flex items-center mt-1 space-x-1">
                        {renderCommentStars(3)}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    {language === "ar" ? "إضافة تعليق" : "Add a Comment"}
                  </h3>
                  <Textarea
                    placeholder={language === "ar"
                      ? "شارك أفكارك أو معلومات إضافية..."
                      : "Share your thoughts or additional information..."}
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex items-center mb-3">
                    <span className="mr-2 text-gray-600">
                      {language === "ar" ? "التقييم:" : "Rating:"}
                    </span>
                    <div className="flex space-x-1">{renderStars()}</div>
                  </div>
                  <Button
                    onClick={handleComment}
                    className="bg-government-600 hover:bg-government-700"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {language === "ar" ? "إضافة تعليق" : "Add Comment"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "ar" ? "حالة المشكلة" : "Issue Status"}
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {language === "ar" ? "الحالة الحالية:" : "Current Status:"}
                  </span>
                  <span className={statusInfo.className}>{statusInfo.label}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {language === "ar" ? "القسم:" : "Department:"}
                  </span>
                  <span className="font-medium">{department}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {language === "ar" ? "رقم المرجع:" : "Reference ID:"}
                  </span>
                  <span className="font-mono text-sm">{`REP-${issue.id.padStart(6, '0')}`}</span>
                </div>
              </div>

              {user?.role === "government" && (
                <>
                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {language === "ar" ? "إجراء حكومي" : "Government Action"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === "ar"
                        ? "كممثل حكومي، يمكنك الموافقة على تقرير المشكلة هذا أو رفضه."
                        : "As a government representative, you can approve or reject this issue report."}
                    </p>

                    {issueStatus === 'rejected' && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertTitle>
                          {language === "ar" ? "تم رفض المشكلة" : "Issue Rejected"}
                        </AlertTitle>
                        <AlertDescription>
                          {language === "ar"
                            ? statusUpdate || "تم رفض هذه المشكلة."
                            : statusUpdate || "This issue has been rejected."}
                        </AlertDescription>
                      </Alert>
                    )}

                    {(issueStatus === 'rejected' || issueStatus === 'in-progress') && (
                      <Button
                        onClick={handleRevert}
                        variant="outline"
                        className="w-full justify-center mb-3"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {language === "ar" ? "إلغاء القرار" : "Revert Decision"}
                      </Button>
                    )}

                    {issueStatus === 'pending' && (
                      <>
                        <div className="flex flex-col gap-3">
                          <Button
                            onClick={handleApprove}
                            className="bg-government-600 hover:bg-government-700 w-full justify-center"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {language === "ar" ? "الموافقة على المشكلة" : "Approve Issue"}
                          </Button>

                          <AlertDialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                className="w-full justify-center"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                {language === "ar" ? "رفض المشكلة" : "Reject Issue"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {language === "ar" ? "رفض المشكلة" : "Reject Issue"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {language === "ar"
                                    ? "يرجى تقديم سبب لرفض هذه المشكلة. سيكون هذا مرئيًا للمبلغ."
                                    : "Please provide a reason for rejecting this issue. This will be visible to the reporter."}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <Textarea
                                placeholder={language === "ar" ? "سبب الرفض..." : "Reason for rejection..."}
                                value={statusUpdate}
                                onChange={(e) => setStatusUpdate(e.target.value)}
                                className="my-3"
                                rows={3}
                              />
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  {language === "ar" ? "إلغاء" : "Cancel"}
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleReject} className="bg-destructive text-destructive-foreground">
                                  {language === "ar" ? "تأكيد الرفض" : "Confirm Rejection"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  {language === "ar" ? "الجدول الزمني" : "Timeline"}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {language === "ar" ? "تم الإبلاغ:" : "Reported:"}
                    </span>
                    <span>{new Date(issue.date).toLocaleDateString(language === "ar" ? 'ar' : 'en')}</span>
                  </div>

                  {issueStatus !== 'pending' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "ar" ? "تم الاستلام:" : "Acknowledged:"}
                      </span>
                      <span>{new Date(new Date(issue.date).getTime() + 86400000 * 2).toLocaleDateString(language === "ar" ? 'ar' : 'en')}</span>
                    </div>
                  )}

                  {(issueStatus === 'in-progress' || issueStatus === 'resolved') && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "ar" ? "بدأ العمل:" : "Work Started:"}
                      </span>
                      <span>{new Date(new Date(issue.date).getTime() + 86400000 * 4).toLocaleDateString(language === "ar" ? 'ar' : 'en')}</span>
                    </div>
                  )}

                  {issueStatus === 'resolved' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {language === "ar" ? "تم الحل:" : "Resolved:"}
                      </span>
                      <span>{new Date(new Date(issue.date).getTime() + 86400000 * 7).toLocaleDateString(language === "ar" ? 'ar' : 'en')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "ar" ? "دعم المجتمع" : "Community Support"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {language === "ar"
                  ? "هل تؤثر هذه المشكلة عليك؟ أظهر دعمك للمساعدة في تحديد أولوية هذا التقرير."
                  : "Does this issue affect you? Show your support to help prioritize this report."}
              </p>

              <div className="flex justify-center space-x-6">
                <Button
                  variant={liked ? "default" : "outline"}
                  className={liked ? "bg-government-600 hover:bg-government-700" : ""}
                  onClick={handleLike}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {language === "ar" ? `دعم (${issue.votes + (liked ? 1 : 0)})` : `Support (${issue.votes + (liked ? 1 : 0)})`}
                </Button>

                <Button
                  variant={disliked ? "default" : "outline"}
                  className={disliked ? "bg-red-600 hover:bg-red-700" : ""}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  {language === "ar" ? "غير موافق" : "Disagree"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "ar" ? "هل تحتاج مساعدة؟" : "Need Help?"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {language === "ar"
                  ? "إذا كان لديك أسئلة حول هذه المشكلة أو ترغب في تقديم معلومات إضافية:"
                  : "If you have questions about this issue or want to provide additional information:"}
              </p>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/contact">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {language === "ar" ? "اتصل بالدعم" : "Contact Support"}
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/issues/${issue.id}/report-problem`}>
                    <Flag className="mr-2 h-4 w-4" />
                    {language === "ar" ? "الإبلاغ عن مشكلة في هذا التقرير" : "Report Problem with this Issue"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;