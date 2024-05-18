import type { Meta, StoryObj } from '@storybook/react';

import { ActiveTasksChart } from '@/components/active-task-chart';
import { MainProvider } from '@/components/providers/MainProvider';

const ActiveTasksChartWrapper: React.FC = () => {
  return (
    <MainProvider>
      <ActiveTasksChart
        data={[
          {
            date: 'starting-up',
            value: 9631
          },
          {
            date: 'running',
            value: 9093
          },
          {
            date: 'idle',
            value: 8737
          },
          {
            date: 'pending-approval',
            value: 33
          }
        ]}
      />
    </MainProvider>
  );
};
const meta: Meta<typeof ActiveTasksChart> = {
  title: 'toms/ActiveTasksChart',
  component: ActiveTasksChartWrapper,
  tags: ['autodocs'],
  args: {
    data: [
      {
        date: 'starting-up',
        value: 9631
      },
      {
        date: 'running',
        value: 9093
      },
      {
        date: 'idle',
        value: 8737
      },
      {
        date: 'pending-approval',
        value: 33
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof ActiveTasksChart>;

export const Default: Story = {};
