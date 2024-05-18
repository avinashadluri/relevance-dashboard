import type { Meta, StoryObj } from '@storybook/react';

import { LabelTaskChart } from '@/components/label-task-chart';

const meta: Meta<typeof LabelTaskChart> = {
  title: 'toms/LabelTaskChart',
  component: LabelTaskChart,
  tags: ['autodocs'],
  args: {
    data: [
      {
        date: 'Low Intent',
        value: 892
      },
      {
        date: 'Received prospect reply',
        value: 118
      },
      {
        date: 'Mid Fit',
        value: 280
      },
      {
        date: 'Low Fit',
        value: 120
      },
      {
        date: 'Address not found',
        value: 145
      }
    ]
  }
};

export default meta;

type Story = StoryObj<typeof LabelTaskChart>;

export const Default: Story = {};
