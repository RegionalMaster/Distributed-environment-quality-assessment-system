import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface AQIDisplayProps {
  aqi: number;
  className?: string;
}

export const AQIDisplay = ({ aqi, className }: AQIDisplayProps) => {
  const getAQIColor = (value: number) => {
    if (value <= 50) return "bg-good";
    if (value <= 100) return "bg-moderate";
    if (value <= 150) return "bg-unhealthy";
    return "bg-hazardous";
  };

  const getAQIText = (value: number) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Moderate";
    if (value <= 150) return "Unhealthy";
    return "Hazardous";
  };

  return (
    <Card className={cn("p-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground">Current AQI</span>
          <div className="mt-2 text-5xl font-bold animate-pulse-slow">{aqi}</div>
          <span className="mt-2 text-lg font-medium">{getAQIText(aqi)}</span>
        </div>
        <Progress value={aqi} max={300} className={cn("h-2", getAQIColor(aqi))} />
      </div>
    </Card>
  );
};