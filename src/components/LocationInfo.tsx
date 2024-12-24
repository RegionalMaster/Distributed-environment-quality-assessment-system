import { SensorLocation } from "@/types/sensors";
import { Card } from "./ui/card";
import { MapPin, Building, Home } from "lucide-react";

interface LocationInfoProps {
  location: SensorLocation;
}

export const LocationInfo = ({ location }: LocationInfoProps) => {
  return (
    <Card className="p-4 animate-fade-in">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sensor Location</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Building</span>
          </div>
          <span className="text-sm font-medium">{location.building}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Room</span>
          </div>
          <span className="text-sm font-medium">{location.room}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Floor: {location.floor}
        </div>
      </div>
    </Card>
  );
};