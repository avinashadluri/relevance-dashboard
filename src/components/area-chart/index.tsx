import { AreaChart } from '@tremor/react';

export const AreaChartSeries: React.FC<{
  data: Array<{ date: string; value: number }>;
  colors: Array<string>;
}> = ({ data, colors }) => {
  return (
    <div className="testing">
      <AreaChart
        className="h-40"
        data={data}
        index="date"
        categories={['value']}
        colors={colors}
        yAxisWidth={60}
        showGridLines={false}
        showXAxis={false}
        showLegend={false}
        showYAxis={false}
      />
    </div>
  );
};
