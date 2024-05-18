import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from '@/components/navbar';

const meta: Meta<typeof Navbar> = {
  title: 'toms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  args: {
    children: 'Navbar'
  }
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
