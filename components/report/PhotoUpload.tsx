
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

interface PhotoUploadProps {
  photos: File[];
  photoPreviews: string[];
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoRemove: (index: number) => void;
}

export const PhotoUpload = ({
  photos,
  photoPreviews,
  onPhotoUpload,
  onPhotoRemove,
}: PhotoUploadProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Evidence</CardTitle>
        <CardDescription>
          Upload photos or documents related to the issue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {photos.length === 0 ? (
            <div 
              className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-government-400', 'bg-government-50');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('border-government-400', 'bg-government-50');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-government-400', 'bg-government-50');
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const changeEvent = {
                    target: { files: e.dataTransfer.files }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  onPhotoUpload(changeEvent);
                }
              }}
            >
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium mb-1">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Support for JPG, PNG and PDF up to 10MB
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onPhotoUpload}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={handleButtonClick}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative border rounded-lg overflow-hidden h-24">
                    {preview === 'pdf' ? (
                      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-600">
                        <p className="text-xs font-medium">PDF Document</p>
                      </div>
                    ) : (
                      <img 
                        src={preview} 
                        alt={`Uploaded photo ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                      onClick={() => onPhotoRemove(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onPhotoUpload}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  multiple
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleButtonClick}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Add More Photos
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
