import type { Meta, StoryObj } from '@storybook/react';

import { CardWrapper } from '@/components/card-wrapper';
import { MainProvider } from '@/components/providers/MainProvider';

const ActiveTasksChartWrapper: React.FC = () => {
  return (
    <MainProvider>
      <CardWrapper
        heading="Pending approvals requested"
        count={18625}
        subtext="requests"
        showDot
        dotColor="green"
      >
        <h1>Hello card</h1>
      </CardWrapper>
    </MainProvider>
  );
};
const meta: Meta<typeof CardWrapper> = {
  title: 'toms/CardWrapper',
  component: ActiveTasksChartWrapper,
  tags: ['autodocs'],
  args: {
    heading: 'Pending approvals requested',
    count: 18625,
    subtext: 'requests',
    showDot: true,
    dotColor: 'green'
  }
};

export default meta;

type Story = StoryObj<typeof CardWrapper>;

export const Default: Story = {};
