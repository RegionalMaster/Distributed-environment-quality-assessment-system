export interface PollutantData {
  pm25: number;
  pm10: number;
  co2: number;
  tvoc: number;
  temperature: number;
  humidity: number;
}

export interface SensorLocation {
  id: string;
  name: string;
  room: string;
  floor: string;
  building: string;
}

export interface AQIReading {
  timestamp: string;
  value: number;
  pollutants: PollutantData;
  location: SensorLocation;
}

export type AQILevel = 'good' | 'moderate' | 'unhealthy' | 'hazardous';