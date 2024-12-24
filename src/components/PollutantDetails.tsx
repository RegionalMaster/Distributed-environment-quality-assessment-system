import { PollutantData } from "@/types/sensors";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  Droplets, 
  Thermometer, 
  Wind, 
  Activity,
  Gauge
} from "lucide-react";

interface PollutantDetailsProps {
  data: PollutantData;
}

export const PollutantDetails = ({ data }: PollutantDetailsProps) => {
  const getPM25Level = (value: number) => {
    if (value <= 12) return "Good";
    if (value <= 35.4) return "Moderate";
    if (value <= 55.4) return "Unhealthy for Sensitive Groups";
    return "Unhealthy";
  };

  const getCO2Level = (value: number) => {
    if (value < 1000) return "Good";
    if (value < 2000) return "Moderate";
    return "Poor";
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-lg font-medium mb-4">Detailed Pollutant Levels</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span>PM2.5</span>
            </div>
            <span className="text-sm font-medium">{data.pm25.toFixed(1)} µg/m³</span>
          </div>
          <Progress value={(data.pm25 / 150) * 100} className="h-2" />
          <span className="text-sm text-muted-foreground">{getPM25Level(data.pm25)}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <span>PM10</span>
            </div>
            <span className="text-sm font-medium">{data.pm10.toFixed(1)} µg/m³</span>
          </div>
          <Progress value={(data.pm10 / 300) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <span>CO₂</span>
            </div>
            <span className="text-sm font-medium">{data.co2.toFixed(0)} ppm</span>
          </div>
          <Progress value={(data.co2 / 5000) * 100} className="h-2" />
          <span className="text-sm text-muted-foreground">{getCO2Level(data.co2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Temperature</span>
            </div>
            <span className="text-lg font-medium">{data.temperature.toFixed(1)}°C</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Humidity</span>
            </div>
            <span className="text-lg font-medium">{data.humidity.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};