
import { Button } from "@/components/ui/button";
import { CheckIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { IssueStatus } from "./IssueCard";

interface StatusFilterProps {
  statuses: IssueStatus[];
  selectedStatuses: IssueStatus[];
  onChange: (statuses: IssueStatus[]) => void;
}

export default function StatusFilter({ statuses, selectedStatuses, onChange }: StatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'resolved': 'Resolved',
    'rejected': 'Rejected',
  };

  const toggleStatus = (status: IssueStatus) => {
    if (selectedStatuses.includes(status)) {
      onChange(selectedStatuses.filter(s => s !== status));
    } else {
      onChange([...selectedStatuses, status]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange([...statuses]);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon className="h-4 w-4" />
        <span>Status</span>
        {selectedStatuses.length > 0 && (
          <span className="bg-government-600 text-white rounded-full px-2 py-0.5 text-xs">
            {selectedStatuses.length}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <div className="flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-700">
              <span>Status</span>
              <div className="flex gap-2">
                <button 
                  className="text-xs text-gray-500 hover:text-government-600"
                  onClick={clearAll}
                >
                  Clear
                </button>
                <button 
                  className="text-xs text-gray-500 hover:text-government-600"
                  onClick={selectAll}
                >
                  Select All
                </button>
              </div>
            </div>
            <div className="space-y-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md"
                  onClick={() => toggleStatus(status)}
                >
                  <div className="flex-shrink-0 h-4 w-4 border rounded mr-2 flex items-center justify-center">
                    {selectedStatuses.includes(status) ? (
                      <CheckIcon className="h-3 w-3 text-government-600" />
                    ) : null}
                  </div>
                  <span>{statusLabels[status]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
