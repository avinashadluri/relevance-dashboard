import { render } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { TotalTasksChart } from '@/components/total-tasks';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('LabelTaskChart', () => {
  it('should render the component', () => {
    const { container } = render(
      <TotalTasksChart
        data={[
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
        ]}
      />
    );
    expect(container.getElementsByClassName('recharts-responsive-container').length).toBe(1);
  });
});
