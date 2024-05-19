import { render } from '@/tests/test-utils';

import '@testing-library/jest-dom';
import { LabelTaskChart } from '@/components/label-task-chart';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('LabelTaskChart', () => {
  it('should render the component', () => {
    const { container } = render(
      <LabelTaskChart
        data={[
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
        ]}
      />
    );
    expect(container.getElementsByClassName('recharts-responsive-container').length).toBe(1);
  });
});
