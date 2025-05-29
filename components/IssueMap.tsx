import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IssueMapProps {
  lat?: number;
  lng?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

export default function IssueMap({ 
  lat = 31.9454, 
  lng = 35.9284, 
  onLocationSelect, 
  readOnly = false 
}: IssueMapProps) {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState({ lat, lng });
  const [isLocating, setIsLocating] = useState(false);

  // Initialize the map using Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const L = window.L;
    if (!L) {
      console.error("Leaflet not loaded");
      return;
    }

    // Create the map with additional options
    const map = L.map(mapRef.current, {
      zoomControl: true,
      minZoom: 2,
      maxZoom: 18,
      scrollWheelZoom: true,
    }).setView([selectedLocation.lat, selectedLocation.lng], 10);

    // Add OpenStreetMap tile layer with proper options
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      tileSize: 256,
      zoomOffset: 0,
      // Add error handling for tiles
      errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChgB6bwxzBgAAAABJRU5ErkJggg==',
    }).addTo(map);

    // Add a marker
    const marker = L.marker([selectedLocation.lat, selectedLocation.lng], {
      draggable: !readOnly
    }).addTo(map);

    // Invalidate size after initialization
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Handle marker drag events
    if (!readOnly) {
      marker.on('dragend', function(e) {
        const position = marker.getLatLng();
        setSelectedLocation({ lat: position.lat, lng: position.lng });
        if (onLocationSelect) {
          onLocationSelect(position.lat, position.lng);
        }
      });

      map.on('click', function(e) {
        const position = e.latlng;
        marker.setLatLng(position);
        setSelectedLocation({ lat: position.lat, lng: position.lng });
        if (onLocationSelect) {
          onLocationSelect(position.lat, position.lng);
        }
      });
    }

    // Handle zoom events
    map.on('zoomend', () => {
      map.invalidateSize();
    });

    // Store references
    leafletMapRef.current = map;
    markerRef.current = marker;

    // Cleanup
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markerRef.current = null;
      }
    };
  }, [readOnly, onLocationSelect]); // Added dependencies

  // Update marker position when props change
  useEffect(() => {
    if (markerRef.current && leafletMapRef.current && 
        (lat !== selectedLocation.lat || lng !== selectedLocation.lng)) {
      setSelectedLocation({ lat, lng });
      markerRef.current.setLatLng([lat, lng]);
      leafletMapRef.current.panTo([lat, lng]);
      leafletMapRef.current.invalidateSize();
    }
  }, [lat, lng]);

  const getCurrentLocation = () => {
    if (!leafletMapRef.current || !markerRef.current) return;
    
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          markerRef.current.setLatLng([latitude, longitude]);
          leafletMapRef.current.panTo([latitude, longitude]);
          leafletMapRef.current.invalidateSize();
          setSelectedLocation({ lat: latitude, lng: longitude });
          
          if (onLocationSelect) {
            onLocationSelect(latitude, longitude);
          }
          
          setIsLocating(false);
          
          toast({
            title: "تم تحديد موقعك",
            description: "تم تحديد موقعك الحالي بنجاح",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          
          let errorMessage = "حدث خطأ أثناء تحديد موقعك";
          if (error.code === 1) {
            errorMessage = "تم رفض الوصول إلى الموقع. يرجى تمكين مشاركة الموقع في متصفحك";
          } else if (error.code === 2) {
            errorMessage = "غير قادر على الحصول على الموقع الحالي";
          } else if (error.code === 3) {
            errorMessage = "انتهت مهلة تحديد الموقع";
          }
          
          toast({
            title: "خطأ في تحديد الموقع",
            description: errorMessage,
            variant: "destructive",
          });
        },
        { 
          enableHighAccuracy: true, 
          timeout: 10000, 
          maximumAge: 0 
        }
      );
    } else {
      toast({
        title: "غير مدعوم",
        description: "متصفحك لا يدعم تحديد الموقع",
        variant: "destructive",
      });
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-2">
      <div 
        ref={mapRef}
        className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden"
        style={{ zIndex: 0 }} // Changed z-50 to zIndex: 0
      ></div>
      
      {!readOnly && (
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            الإحداثيات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={getCurrentLocation}
            disabled={isLocating}
          >
            <Navigation className="h-4 w-4" />
            {isLocating ? "جاري تحديد الموقع..." : "تحديد موقعي الحالي"}
          </Button>
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    L: any;
  }
}