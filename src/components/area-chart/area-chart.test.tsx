import { render } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { AreaChartSeries } from './';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

describe('AreaChartSeries', () => {
  it('should render the component', () => {
    const { container } = render(
      <AreaChartSeries
        colors={['green', 'lime']}
        data={[
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
        ]}
      />
    );
    expect(container.getElementsByClassName('recharts-responsive-container').length).toBe(1);
  });
});
