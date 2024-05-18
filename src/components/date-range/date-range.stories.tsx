import type { Meta, StoryObj } from '@storybook/react';

import { DateRangeSummary } from '@/components/date-range';

const meta: Meta<typeof DateRangeSummary> = {
  title: 'toms/DateRangeSummary',
  component: DateRangeSummary,
  tags: ['autodocs'],
  args: {
    dateRangeStart: 'Mar 13, 2024',
    dateRangeEnd: 'Today'
  }
};

export default meta;

type Story = StoryObj<typeof DateRangeSummary>;

export const Default: Story = {};
