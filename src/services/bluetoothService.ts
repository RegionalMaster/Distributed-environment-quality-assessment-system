interface SensorData {
  pm25: number;
  pm10: number;
  co2: number;
  tvoc: number;
  temperature: number;
  humidity: number;
}

class BluetoothService {
  private isConnected: boolean = false;
  private simulationInterval: NodeJS.Timeout | null = null;
  private listeners: ((data: SensorData) => void)[] = [];

  async connect() {
    try {
      // Simulate successful connection
      this.isConnected = true;
      
      // Start sending simulated data
      this.simulationInterval = setInterval(() => {
        const simulatedData: SensorData = {
          pm25: Math.random() * 50,  // 0-50 µg/m³
          pm10: Math.random() * 100, // 0-100 µg/m³
          co2: 400 + Math.random() * 1000, // 400-1400 ppm
          tvoc: Math.random() * 1000,
          temperature: 20 + Math.random() * 5, // 20-25°C
          humidity: 30 + Math.random() * 40, // 30-70%
        };
        this.notifyListeners(simulatedData);
      }, 2000); // Update every 2 seconds

      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }

  subscribe(callback: (data: SensorData) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notifyListeners(data: SensorData) {
    this.listeners.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    this.isConnected = false;
  }

  isDeviceConnected() {
    return this.isConnected;
  }
}

export const bluetoothService = new BluetoothService();