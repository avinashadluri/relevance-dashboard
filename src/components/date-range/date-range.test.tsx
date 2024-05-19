import { render, screen } from '@/tests/test-utils';

import '@testing-library/jest-dom';
import { DateRangeSummary } from '@/components/date-range';

describe('DateRangeSummary', () => {
  it('should render the component', () => {
    render(<DateRangeSummary dateRangeStart="Mar 13, 2024" dateRangeEnd="Today" />);

    // Assert
    expect(screen.getByText(/Mar 13, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
  });
});
