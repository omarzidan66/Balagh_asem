// src/pages/IssuesPage.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import IssueCard, { IssueStatus } from "@/components/IssueCard";
import StatusFilter from "@/components/StatusFilter";
import { issueCategories, mockIssues, departmentsList, departmentMapping } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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

const IssuesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<IssueStatus[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<DraftIssue[]>([]);
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const allStatuses: IssueStatus[] = ['pending', 'in-progress', 'resolved', 'rejected'];

  useEffect(() => {
    if (user?.role === 'government' && user?.department) {
      const deptKey = Object.keys(departmentMapping).find(key => key === user.department);
      if (deptKey) {
        const englishDeptName = departmentMapping[deptKey as keyof typeof departmentMapping].en;
        setSelectedDepartments([englishDeptName]);
      }
    }
  }, [user]);

  // دالة لحفظ المسودة
  const saveDraft = (draft: DraftIssue) => {
    setDrafts([...drafts, draft]);
    toast({
      title: language === "ar" ? "تم حفظ المسودة" : "Draft Saved",
      description: language === "ar" ? "تم حفظ البلاغ كمسودة." : "The issue has been saved as a draft.",
    });
  };

  // دالة لتعديل البلاغ
  const editIssue = (issueId: string, updatedData: Partial<DraftIssue>) => {
    const updatedIssues = mockIssues.map(issue =>
      issue.id === issueId && issue.userId === user?.id
        ? { ...issue, ...updatedData }
        : issue
    );
    (mockIssues as any).splice(0, mockIssues.length, ...updatedIssues);
    toast({
      title: language === "ar" ? "تم تعديل البلاغ" : "Issue Updated",
      description: language === "ar" ? "تم تحديث بيانات البلاغ." : "The issue has been updated.",
    });
  };

  // دالة لحذف البلاغ
  const deleteIssue = (issueId: string) => {
    const updatedIssues = mockIssues.filter(issue => issue.id !== issueId || issue.userId !== user?.id);
    (mockIssues as any).splice(0, mockIssues.length, ...updatedIssues);
    toast({
      title: language === "ar" ? "تم حذف البلاغ" : "Issue Deleted",
      description: language === "ar" ? "تم حذف البلاغ بنجاح." : "The issue has been deleted successfully.",
    });
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch =
      searchQuery === "" ||
      (language === "ar"
        ? (issue.title_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
           issue.description_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
           issue.location_ar.toLowerCase().includes(searchQuery.toLowerCase()))
        : (issue.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
           issue.description_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
           issue.location_en.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(issue.category);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(issue.status);

    const matchesDepartment =
      user?.role !== 'government'
        ? selectedDepartments.length === 0 || selectedDepartments.includes(issue.department || "Public Works")
        : issue.department === departmentMapping[user.department as keyof typeof departmentMapping]?.en;

    return matchesSearch && matchesCategory && matchesStatus && matchesDepartment;
  });

  const userDepartmentDisplay = user?.role === 'government' && user?.department
    ? language === 'ar'
      ? departmentMapping[user.department as keyof typeof departmentMapping]?.ar
      : departmentMapping[user.department as keyof typeof departmentMapping]?.en
    : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('communityIssues')}</h1>

      {user?.role === 'government' && user?.department && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700">
            {language === "ar"
              ? `أنت تشاهد المشكلات المتعلقة بقسم "${userDepartmentDisplay}" فقط`
              : `You are viewing issues for the "${userDepartmentDisplay}" department only`}
          </p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t('searchIssues')}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <CategoryFilter
              categories={issueCategories}
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              title={language === "ar" ? "الفئات" : "Categories"}
              buttonLabel={language === "ar" ? "تصفية حسب الفئة" : "Filter by Category"}
            />
            <StatusFilter
              statuses={allStatuses}
              selectedStatuses={selectedStatuses}
              onChange={setSelectedStatuses}
            />
            {user?.role !== 'government' && (
              <CategoryFilter
                categories={departmentsList}
                selectedCategories={selectedDepartments}
                onChange={setSelectedDepartments}
                title={language === "ar" ? "الأقسام" : "Departments"}
                buttonLabel={language === "ar" ? "تصفية حسب القسم" : "Filter by Department"}
              />
            )}
          </div>
        </div>
        {filteredIssues.length === 0 ? (
          <p className="text-gray-500">{t('noIssuesMatch')}</p>
        ) : (
          <p className="text-gray-500">
            {language === "ar"
              ? `عرض ${filteredIssues.length} مشكلة`
              : `Showing ${filteredIssues.length} issues`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIssues.map(issue => (
          <IssueCard
            key={issue.id}
            {...issue}
            department={issue.department || "Public Works"}
            userId={issue.userId}
            onEdit={(updatedData) => editIssue(issue.id, updatedData)}
            onDelete={() => deleteIssue(issue.id)}
            onSaveDraft={saveDraft}
          />
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;