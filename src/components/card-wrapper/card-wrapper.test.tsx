import { render, screen } from '@/tests/test-utils';

import '@testing-library/jest-dom';
import { ActiveTasksChartWrapper } from './card-wrapper.stories';

describe('ActiveTasksChartWrapper', () => {
  it('should render the component', () => {
    render(<ActiveTasksChartWrapper />);

    expect(screen.getByText(/Pending approvals requested/i)).toBeInTheDocument();
    expect(screen.getByText(/18625/i)).toBeInTheDocument();
    expect(screen.getByText(/Hello card/i)).toBeInTheDocument();
  });
});
