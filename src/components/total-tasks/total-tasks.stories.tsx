import type { Meta, StoryObj } from '@storybook/react';

import { TotalTasksChart } from '@/components/total-tasks';

const meta: Meta<typeof TotalTasksChart> = {
  title: 'toms/TotalTasksChart',
  component: TotalTasksChart,
  tags: ['autodocs'],
  args: {
    data: [
      {
        value: 4,
        date: 'Mar 11'
      },
      {
        value: 159,
        date: 'Mar 11'
      },
      {
        value: 1,
        date: 'Mar 11'
      },
      {
        value: 226,
        date: 'Mar 18'
      },
      {
        value: 5,
        date: 'Mar 18'
      },
      {
        value: 17,
        date: 'Mar 18'
      },
      {
        value: 7,
        date: 'Mar 18'
      },
      {
        value: 7,
        date: 'Mar 18'
      },
      {
        value: 5846,
        date: 'Mar 25'
      },
      {
        value: 7,
        date: 'Mar 25'
      },
      {
        value: 2,
        date: 'Apr 1'
      },
      {
        value: 6,
        date: 'Apr 1'
      },
      {
        value: 2,
        date: 'Apr 1'
      },
      {
        value: 4,
        date: 'Apr 1'
      },
      {
        value: 566,
        date: 'Apr 1'
      },
      {
        value: 642,
        date: 'Apr 8'
      },
      {
        value: 642,
        date: 'Apr 15'
      },
      {
        value: 685,
        date: 'Apr 22'
      },
      {
        value: 1,
        date: 'Apr 29'
      },
      {
        value: 443,
        date: 'Apr 29'
      },
      {
        value: 2,
        date: 'Apr 29'
      },
      {
        value: 1314,
        date: 'May 6'
      },
      {
        value: 1,
        date: 'May 6'
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof TotalTasksChart>;

export const Default: Story = {};
