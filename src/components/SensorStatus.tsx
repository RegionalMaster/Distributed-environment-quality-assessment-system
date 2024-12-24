import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Signal, Wifi } from "lucide-react";

interface SensorStatusProps {
  isConnected: boolean;
  signalStrength: number;
  lastUpdate: string;
}

export const SensorStatus = ({ isConnected, signalStrength, lastUpdate }: SensorStatusProps) => {
  return (
    <Card className="p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Signal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sensor Status</span>
        </div>
        <Badge variant={isConnected ? "default" : "destructive"}>
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Signal Strength</span>
          </div>
          <span className="text-sm font-medium">{signalStrength}%</span>
        </div>
        <div className="text-xs text-muted-foreground">Last Update: {lastUpdate}</div>
      </div>
    </Card>
  );
};