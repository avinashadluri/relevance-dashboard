import { BarChart } from '@tremor/react';

export const LabelTaskChart: React.FC<{
  data: Array<{ date: string; value: number }>;
}> = ({ data }) => {
  return (
    <BarChart
      data={data}
      index="date"
      categories={['value']}
      colors={['green']}
      yAxisWidth={140}
      showLegend={false}
      layout="vertical"
    />
  );
};
