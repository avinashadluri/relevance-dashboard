import type { Meta, StoryObj } from '@storybook/react';

import { SummaryCard } from '@/components/summary-card';
import { MainProvider } from '@/components/providers/MainProvider';

const SummaryCardWrapper: React.FC = () => {
  return (
    <MainProvider>
      <SummaryCard />
    </MainProvider>
  );
};
const meta: Meta<typeof SummaryCard> = {
  title: 'toms/SummaryCard',
  component: SummaryCardWrapper,
  tags: ['autodocs'],
  args: {
    children: 'SummaryCard'
  }
};

export default meta;

type Story = StoryObj<typeof SummaryCard>;

export const Default: Story = {};
