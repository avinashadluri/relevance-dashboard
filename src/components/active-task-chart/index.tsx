import { DonutChart, Legend } from '@tremor/react';

import { useMyContext } from '@/components/providers/MainProvider';

export const ActiveTasksChart: React.FC<{
  data: Array<{ date: string; value: number }>;
}> = ({ data }) => {
  const pageData = useMyContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
      <DonutChart
        data={data}
        index="date"
        category="value"
        colors={['black', 'cyan', 'indigo', 'violet']}
        className="w-140"
        showLabel={false}
      />
      <Legend
        categories={data.map(
          (val) =>
            `${val.date} (${val.value} tasks, ${Math.round(
              (val.value / pageData.active_tasks) * 100
            )}%)`
        )}
        colors={['black', 'cyan', 'indigo', 'violet']}
      />
    </div>
  );
};
