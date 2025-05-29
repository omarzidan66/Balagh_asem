
import { Button } from "@/components/ui/button";
import { CheckIcon, FilterIcon } from "lucide-react";
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  title?: string;
  buttonLabel?: string;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onChange, 
  title = "Categories",
  buttonLabel = "Filter"
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectAll = () => {
    onChange([...categories]);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon className="h-4 w-4" />
        <span>{buttonLabel}</span>
        {selectedCategories.length > 0 && (
          <span className="bg-government-600 text-white rounded-full px-2 py-0.5 text-xs">
            {selectedCategories.length}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <div className="flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-700">
              <span>{title}</span>
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
            <div className="max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex-shrink-0 h-4 w-4 border rounded mr-2 flex items-center justify-center">
                    {selectedCategories.includes(category) ? (
                      <CheckIcon className="h-3 w-3 text-government-600" />
                    ) : null}
                  </div>
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
