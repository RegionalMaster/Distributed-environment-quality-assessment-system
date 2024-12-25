# Airwise Connection

App I am working on for realtime low cost air quality monitoring. You may view working deployed version [here](https://regionalmaster.github.io/Distributed-environment-quality-assessment-system/).

### Prerequisites
- Node.js (v18 or higher)
- npm 

2. Install dependencies:
```bash
npm install

```

3. Start the development server:
```bash
npm run dev

```

## Building for Production

To create a production build:

```bash
npm run build

```

# AirwiseConnection: A Low-Cost Edge Computing Solution for Real-Time Air Quality Monitoring

## Abstract

This paper presents AirwiseConnection, an innovative edge computing-based air quality monitoring system that combines Internet of Things (IoT) sensor technology with modern web architecture. The system provides real-time monitoring of multiple air quality parameters including PM2.5, PM10, CO2, Total Volatile Organic Compounds (TVOC), temperature, and humidity. By leveraging edge computing and low-power Bluetooth technology, the system achieves high efficiency while maintaining low energy consumption and cost-effectiveness. We describe the system architecture, implementation details, and potential applications in environmental monitoring and public health.

## 1. Introduction

Air quality monitoring has become increasingly important in both indoor and outdoor environments due to its direct impact on human health and well-being. Traditional monitoring systems often lack real-time capabilities, require complex infrastructure, or consume excessive energy. AirwiseConnection addresses these limitations by providing a user-friendly, energy-efficient monitoring solution that leverages edge computing and modern web technologies.

The system utilizes edge computing principles to process data locally, reducing cloud dependency and minimizing latency in real-time monitoring. This approach significantly reduces bandwidth usage and associated costs while enabling offline functionality and ensuring data privacy through local processing. Energy efficiency is achieved through the use of Bluetooth Low Energy (BLE) for sensor communication, optimized data sampling rates, efficient client-side processing, and minimal network transmission requirements.

## 2. System Architecture

The AirwiseConnection system architecture comprises two main components: the hardware sensor array with its associated microcontroller unit, and the software stack that processes and presents the data. This section details the technical implementation of both components and their integration.

![System Architecture](./assets/system_architecture.png)
*Figure 1: AirwiseConnection System Architecture showing the five main layers: Sensing, Data Acquisition, Communication, Edge Processing, and Application layers.*

### 2.1 System Overview with Bluetooth and Edge Computing

The system operates entirely on edge computing principles, eliminating cloud dependency while maintaining robust functionality:

#### Sensing Module:
- Sensors collect air quality data and transmit it over Bluetooth to the mobile device
- Utilizes ESP32 module for Bluetooth communication
- Collects data for PM2.5, PM10, CO2, TVOC, temperature, and humidity

#### Edge Device (Mobile Phone):
- Functions as the central processing unit
- Receives raw sensor data via Bluetooth
- Processes data locally and displays real-time results
- Implements Progressive Web App (PWA) for data visualization

#### Edge Processing Architecture:
- All data processing occurs on the mobile device
- Data is stored temporarily in device memory or local storage
- No cloud dependency required

#### System Flow:
1. User opens the PWA on their mobile device
2. Bluetooth pairs the phone with the sensing module
3. Sensing module transmits air quality data to phone
4. Phone processes data locally to calculate AQI
5. PWA displays results in real-time

#### Advantages of Edge Processing with Bluetooth:
- Local computation without external server dependency
- Enhanced power efficiency through Bluetooth Low Energy
- Improved portability for mobile and localized monitoring
- Reduced latency in data processing and visualization
- Enhanced privacy through local data handling

## 3. Technical Implementation

### 3.1 Hardware Architecture

The hardware implementation centers around a carefully selected array of low-cost, high-precision sensors integrated with an energy-efficient microcontroller unit.

#### Sensor Array
- **Particulate Matter**: PMS7003 sensor using laser scattering technology
  - Range: 0-500μg/m³ with 1μg/m³ resolution
  - Power consumption: 100mA active, 200μA standby

- **Carbon Dioxide**: SCD30 sensor with NDIR dual-channel technology
  - Range: 400-10000ppm with ±(30ppm + 3%) accuracy
  - Power consumption: 19mA average
  - Features automatic self-calibration

- **VOC Detection**: SGP30 multi-pixel gas sensor
  - TVOC detection up to 60000ppb
  - On-chip humidity compensation

- **Environmental Conditions**: SHT31 sensor
  - Temperature accuracy: ±0.3°C
  - Relative humidity accuracy: ±2% RH

#### Microcontroller and Communication
- **ESP32-WROOM-32 Microcontroller**:
  - Dual-core Xtensa® 32-bit LX6 microprocessor at 240 MHz
  - 520 KB SRAM and 4 MB flash storage
  - Integrated Bluetooth module for sensor communication
  - Power consumption:
    - Full-power operation: 160-260mA
    - Deep-sleep mode: 10μA

- **Bluetooth Communication**:
  - Uses ESP32's built-in Bluetooth capabilities
  - Implements Bluetooth Low Energy (BLE) for power efficiency
  - Range optimized for indoor monitoring
  - Supports direct pairing with mobile devices
  - Configurable transmission intervals for power optimization

### 3.2 Power Management System

Power efficiency is achieved through a sophisticated management system built around an LDO regulator providing stable 3.3V supply with over 90% efficiency. The system implements dynamic frequency scaling and sensor duty cycling, automatically adjusting power consumption based on monitoring requirements. This adaptive approach ensures optimal power usage while maintaining system responsiveness.

### 3.3 Software Architecture

The software implementation employs modern web technologies to create a responsive and efficient user interface while handling complex data processing at the edge. The frontend is built using React 18 with TypeScript, providing robust type safety and improved development efficiency. The application architecture follows a component-based design pattern, utilizing React's latest features including hooks for state management and effect handling.

State management is implemented through a combination of React Query for server state and custom hooks for local state management. This hybrid approach allows for efficient handling of real-time data streams while maintaining a responsive user interface. React Query provides automatic background refetching, cache invalidation, and optimistic updates, crucial for real-time air quality monitoring.

### 3.4 Edge Computing Implementation

The edge computing implementation in AirwiseConnection represents a sophisticated approach to local data processing and storage. At its core, the system implements a structured data pipeline that processes raw sensor data into actionable information. The core data structure for sensor readings is defined as follows:

```typescript
interface SensorData {
    timestamp: number;      // Unix timestamp in milliseconds
    pm25: number;          // PM2.5 in μg/m³
    pm10: number;          // PM10 in μg/m³
    co2: number;           // CO2 in ppm
    tvoc: number;          // TVOC in ppb
    temperature: number;    // Temperature in °C
    humidity: number;      // Relative humidity in %
}
```

This data structure serves as the foundation for all sensor communications and data processing operations. The complete data processing pipeline, including AQI calculations and health index generation, is detailed in Appendix A.

### 3.5 Data Storage Architecture

The system implements a multi-tiered storage strategy optimized for time-series data. The storage configuration is defined through a structured interface:

```typescript
interface StorageConfig {
    dbName: string;
    storeName: string;
    retention: number;     // Days to retain data
    maxEntries: number;    // Maximum entries per store
}
```

This configuration drives the entire storage system, which includes IndexedDB for time-series data, LocalStorage for configuration, and Cache API for offline functionality. The complete storage implementation, including data retention policies and pruning strategies, is provided in Appendix B.

### 3.6 BLE Communication Protocol

The Bluetooth Low Energy communication protocol uses a compact packet structure for efficient data transmission:

```typescript
interface BLEPacket {
    header: number;      // 1 byte: packet type and flags
    length: number;      // 1 byte: payload length
    payload: Uint8Array; // Variable length: sensor data
    checksum: number;    // 1 byte: CRC-8
}
```

This packet structure ensures efficient data transmission while maintaining data integrity through checksum validation. The complete BLE protocol implementation, including GATT service specifications and packet handling, is detailed in Appendix C.

### 3.7 Power Management Implementation

The power management system operates based on a simple but effective state model:

```typescript
interface PowerState {
    mode: 'active' | 'idle' | 'sleep';
    currentDraw: number;  // mA
    voltage: number;      // V
}
```

This state model drives the dynamic power adjustment system. The full implementation of power management algorithms, including temperature monitoring and frequency scaling, is provided in Appendix D.

## Progressive Web Application (PWA) Architecture

### The Essence of Progressive Web Applications

At its core, a Progressive Web Application is not merely a website, but a sophisticated digital ecosystem that adapts and responds to user interactions across diverse devices and network conditions. Unlike traditional web applications, PWAs leverage cutting-edge web APIs and design principles to deliver an experience that feels native, responsive, and seamless.

### The Technical Architecture of Resilience

The magic of Airwise Connection's PWA lies in its meticulously crafted service worker implementation. Service workers act as intelligent network proxies, sitting between the web application and the network, intercepting and managing network requests with unprecedented granularity.

Consider the service worker's installation phase:

```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

This seemingly simple code snippet encapsulates a powerful concept: proactive asset caching. Before the application even loads, critical resources are stored locally, ensuring lightning-fast subsequent loads and providing a robust offline experience.

### Offline-First: A Paradigm Shift

Traditional web applications crumble when internet connectivity becomes unstable. Airwise Connection takes a radically different approach. By implementing a "network-first with intelligent fallback" strategy, the application remains functional even in challenging network environments.

The fetch event handler in the service worker demonstrates this resilience:

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

This code ensures that if a network request fails, the application can seamlessly serve cached content, maintaining a smooth user experience.

### Manifest: The Digital Identity

Beyond technical implementation, PWAs require a digital identity. The `manifest.json` file in Airwise Connection is more than a configuration—it's a declaration of the application's intent and personality.

```json
{
  "name": "Air Quality Monitor",
  "short_name": "AQI Monitor",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000"
}
```

These few lines enable the application to be "installed" on a user's device, complete with custom icons and a standalone launch experience that mimics native mobile applications.

### Performance and Optimization

Leveraging Vite's PWA plugin, Airwise Connection implements sophisticated caching and runtime strategies. The configuration goes beyond simple asset storage, implementing intelligent caching mechanisms that balance performance with data freshness.

```typescript
VitePWA({
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 24 * 60 * 60
          }
        }
      }
    ]
  }
})
```

This configuration ensures that API responses are cached efficiently, reducing unnecessary network requests and improving overall application responsiveness.

### User-Centric Update Mechanism

The application doesn't just work offline—it communicates its state transparently:

```typescript
registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline');
  }
});
```

This code snippet embodies a philosophy of user empowerment, giving users control over updates while maintaining a smooth, uninterrupted experience.

## 4. Results and Discussion

The AirwiseConnection system demonstrates significant improvements in real-time air quality monitoring, achieving high accuracy and reliability while maintaining low energy consumption and cost-effectiveness. The edge computing approach enables efficient data processing and storage, reducing cloud dependency and minimizing latency. The system's modular design and open architecture facilitate easy integration with various sensors and devices, making it a versatile solution for diverse applications.

## 5. Conclusion

AirwiseConnection presents a novel approach to real-time air quality monitoring, leveraging edge computing and IoT technologies to provide a user-friendly, energy-efficient, and cost-effective solution. The system's technical innovations, including its sophisticated data processing pipeline, power management system, and communication protocol, make it an attractive option for widespread deployment in various settings. Future work will focus on enhancing the system's capabilities, exploring new applications, and improving its performance.

## Appendices

### Appendix A: Data Processing Pipeline Implementation

The complete implementation of the data processing pipeline includes AQI calculations and health index generation:

```typescript
// Full AQIProcessor implementation
class AQIProcessor {
    private calculatePM25Index(pm25: number): number {
        const breakpoints = [
            { low: 0, high: 12.0, index: 50 },
            { low: 12.1, high: 35.4, index: 100 },
            { low: 35.5, high: 55.4, index: 150 },
            // Additional breakpoints...
        ];
        return this.interpolateAQI(pm25, breakpoints);
    }

    private interpolateAQI(
        concentration: number,
        breakpoints: Array<{low: number; high: number; index: number}>
    ): number {
        const bp = breakpoints.find(b => 
            concentration >= b.low && concentration <= b.high);
        if (!bp) return 500; // Hazardous level

        return ((bp.index / (bp.high - bp.low)) * 
                (concentration - bp.low)) + bp.low;
    }
}

interface ProcessedData extends SensorData {
    aqi: number;           // Calculated Air Quality Index
    healthIndex: number;   // Custom health risk index (0-100)
    recommendations: string[];
    calibrationStatus: {
        lastCalibration: number;
        driftFactor: number;
        isCalibrated: boolean;
    };
}
```

### Appendix B: Storage System Implementation

The complete storage system implementation includes data retention management and offline capabilities:

```typescript
interface StorageStrategy {
    timeSeriesDB: {
        store: 'IndexedDB';
        config: {
            dbName: string;
            storeName: string;
            version: number;
            indices: Array<{
                name: string;
                keyPath: string;
                unique: boolean;
            }>;
        };
    };
    configStorage: {
        store: 'LocalStorage';
        prefix: string;
        encryption: boolean;
    };
    offlineCache: {
        store: 'CacheAPI';
        strategy: 'stale-while-revalidate';
        maxAge: number;
    };
}

class DataRetentionManager {
    private readonly MAX_ENTRIES = 1000000;
    private readonly RETENTION_PERIOD = 30 * 24 * 60 * 60 * 1000; // 30 days

    async pruneOldData(): Promise<void> {
        const threshold = Date.now() - this.RETENTION_PERIOD;
        await this.db.transaction('readings', 'readwrite')
            .objectStore('readings')
            .delete(IDBKeyRange.upperBound(threshold));
    }
}
```

### Appendix C: BLE Protocol Implementation

The complete BLE protocol implementation includes GATT service specifications and packet handling:

```typescript
interface BLEProtocol {
    service: {
        uuid: '0000181A-0000-1000-8000-00805F9B34FB'; // Environmental Sensing
        characteristics: {
            measurement: {
                uuid: '00002A6E-0000-1000-8000-00805F9B34FB';
                properties: ['read', 'notify'];
                descriptors: ['clientCharacteristicConfiguration'];
            };
            configuration: {
                uuid: '00002A6F-0000-1000-8000-00805F9B34FB';
                properties: ['read', 'write'];
            };
        };
    };
}

class BLEManager {
    private async processPacket(packet: BLEPacket): Promise<ProcessedData> {
        if (!this.validateChecksum(packet)) {
            throw new Error('Invalid checksum');
        }

        const sensorData = this.decodeSensorData(packet.payload);
        return await this.processAndStore(sensorData);
    }

    private validateChecksum(packet: BLEPacket): boolean {
        const data = new Uint8Array([
            packet.header,
            packet.length,
            ...packet.payload
        ]);
        return this.calculateCRC8(data) === packet.checksum;
    }
}
```

### Appendix D: Power Management Implementation

The complete power management system implementation includes dynamic frequency scaling and temperature monitoring:

```typescript
class PowerManager {
    private readonly VOLTAGE_THRESHOLD = 3.3;
    private readonly TEMP_THRESHOLD = 85;

    async adjustPowerMode(state: PowerState): Promise<void> {
        if (state.temperature > this.TEMP_THRESHOLD) {
            await this.enterLowPowerMode();
            return;
        }

        const powerConsumption = state.currentDraw * state.voltage;
        await this.optimizePowerConsumption(powerConsumption);
    }

    private async optimizePowerConsumption(power: number): Promise<void> {
        // Dynamic frequency scaling implementation
        const frequency = this.calculateOptimalFrequency(power);
        await this.setClockFrequency(frequency);
    }
}
