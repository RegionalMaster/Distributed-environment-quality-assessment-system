import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface AQIChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
}

export const AQIChart = ({ data }: AQIChartProps) => {
  return (
    <Card className="p-6 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">AQI History</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};