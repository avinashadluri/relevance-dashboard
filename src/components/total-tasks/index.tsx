import { BarChart } from '@tremor/react';

export const TotalTasksChart: React.FC<{
  data: Array<{ date: string; value: number }>;
}> = ({ data }) => {
  return (
    <BarChart
      data={data}
      index="date"
      categories={['value']}
      colors={['blue']}
      yAxisWidth={60}
      showLegend={false}
    />
  );
};
