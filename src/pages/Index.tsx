import { useState, useEffect } from "react";
import { AQIDisplay } from "@/components/AQIDisplay";
import { SensorStatus } from "@/components/SensorStatus";
import { AQIChart } from "@/components/AQIChart";
import { PollutantDetails } from "@/components/PollutantDetails";
import { LocationInfo } from "@/components/LocationInfo";
import { bluetoothService } from "@/services/bluetoothService";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [currentReading, setCurrentReading] = useState<any | null>(null);
  const [historicalData, setHistoricalData] = useState<Array<{ time: string; value: number }>>([]);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    const success = await bluetoothService.connect();
    if (success) {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Successfully connected to the air quality sensor.",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Could not connect to the sensor. Make sure Bluetooth is enabled.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = bluetoothService.subscribe((data) => {
      // Calculate AQI based on PM2.5 and PM10 values
      const aqi = Math.max(
        calculatePM25AQI(data.pm25),
        calculatePM10AQI(data.pm10)
      );

      const reading = {
        timestamp: new Date().toISOString(),
        value: aqi,
        pollutants: data,
        location: {
          id: 'sensor-001',
          name: 'Main Sensor',
          room: 'Room 101',
          floor: '1st Floor',
          building: 'Main Building'
        }
      };

      setCurrentReading(reading);
      setHistoricalData(prev => [
        ...prev.slice(-11),
        { time: new Date().toLocaleTimeString(), value: aqi }
      ]);

      if (aqi > 150) {
        toast({
          title: "High Air Pollution Alert",
          description: `AQI level is ${aqi}. Take necessary precautions.`,
          variant: "destructive",
        });
      }
    });

    return () => {
      unsubscribe();
      bluetoothService.disconnect();
    };
  }, [isConnected, toast]);

  if (!currentReading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold mb-8">Air Quality Monitor</h1>
          <Button onClick={handleConnect} size="lg">
            Connect to Sensor
          </Button>
          <p className="text-sm text-muted-foreground">
            Note: Web Bluetooth is only supported in Chrome, Edge, and Opera
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8 animate-fade-in">
          Air Quality Monitor
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AQIDisplay aqi={currentReading.value} />
          </div>
          <LocationInfo location={currentReading.location} />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <PollutantDetails data={currentReading.pollutants} />
          <div className="space-y-6">
            <SensorStatus
              isConnected={isConnected}
              signalStrength={bluetoothService.isDeviceConnected() ? 87 : 0}
              lastUpdate={new Date(currentReading.timestamp).toLocaleString()}
            />
            <AQIChart data={historicalData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// AQI calculation functions
const calculatePM25AQI = (pm25: number) => {
  if (pm25 <= 12.0) return ((50 - 0) / (12.0 - 0) * (pm25 - 0) + 0);
  if (pm25 <= 35.4) return ((100 - 51) / (35.4 - 12.1) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4) return ((150 - 101) / (55.4 - 35.5) * (pm25 - 35.5) + 101);
  return 150;
};

const calculatePM10AQI = (pm10: number) => {
  if (pm10 <= 54) return ((50 - 0) / (54 - 0) * (pm10 - 0) + 0);
  if (pm10 <= 154) return ((100 - 51) / (154 - 55) * (pm10 - 55) + 51);
  if (pm10 <= 254) return ((150 - 101) / (254 - 155) * (pm10 - 155) + 101);
  return 150;
};

export default Index;