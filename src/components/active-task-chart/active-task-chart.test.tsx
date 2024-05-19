import { render } from '@/tests/test-utils';

import '@testing-library/jest-dom';
import { ActiveTasksChartWrapper } from './active-task-chart.stories';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('ActiveTasksChartWrapper', () => {
  it('should render the component', () => {
    const { container } = render(<ActiveTasksChartWrapper />);
    expect(container.getElementsByClassName('recharts-responsive-container').length).toBe(1);
  });
});
