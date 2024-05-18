import type { Meta, StoryObj } from '@storybook/react';

import { AreaChartSeries } from '@/components/area-chart';

const meta: Meta<typeof AreaChartSeries> = {
  title: 'toms/AreaChartSeries',
  component: AreaChartSeries,
  tags: ['autodocs'],
  args: {
    data: [
      {
        value: 3,
        date: 'Mar 24'
      },
      {
        value: 22,
        date: 'Mar 31'
      },
      {
        value: 22,
        date: 'Apr 1'
      },
      {
        value: 1,
        date: 'Apr 7'
      },
      {
        value: 13,
        date: 'Apr 15'
      },
      {
        value: 2,
        date: 'Apr 22'
      },
      {
        value: 1,
        date: 'Apr 29'
      },
      {
        value: 54,
        date: 'May 6'
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof AreaChartSeries>;

export const Default: Story = {};
