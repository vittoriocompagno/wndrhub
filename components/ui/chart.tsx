"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartProps {
  title?: string;
  description?: string;
  data: Array<Record<string, any>>;
  type?: "line" | "bar" | "area";
  xAxis?: string;
  yAxis?: string;
  className?: string;
  height?: number;
  categories?: Array<{
    name: string;
    key: string;
    color?: string;
  }>;
}

export function Chart({
  title,
  description,
  data,
  type = "line",
  xAxis = "name",
  yAxis = "value",
  className,
  height = 400,
  categories,
}: ChartProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories ? (
              categories.map((category) => (
                <Bar
                  key={category.key}
                  dataKey={category.key}
                  fill={category.color || `hsl(var(--primary))`}
                />
              ))
            ) : (
              <Bar dataKey={yAxis} fill={`hsl(var(--primary))`} />
            )}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories ? (
              categories.map((category) => (
                <Area
                  key={category.key}
                  type="monotone"
                  dataKey={category.key}
                  stroke={category.color || `hsl(var(--primary))`}
                  fill={category.color || `hsl(var(--primary))`}
                  fillOpacity={0.2}
                />
              ))
            ) : (
              <Area
                type="monotone"
                dataKey={yAxis}
                stroke={`hsl(var(--primary))`}
                fill={`hsl(var(--primary))`}
                fillOpacity={0.2}
              />
            )}
          </AreaChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories ? (
              categories.map((category) => (
                <Line
                  key={category.key}
                  type="monotone"
                  dataKey={category.key}
                  stroke={category.color || `hsl(var(--primary))`}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey={yAxis}
                stroke={`hsl(var(--primary))`}
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <Card className={cn("p-6", className)}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-4" style={{ width: "100%", height }}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </Card>
  );
}