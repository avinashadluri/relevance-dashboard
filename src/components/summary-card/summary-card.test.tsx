import { render, screen } from '@/tests/test-utils';
import '@testing-library/jest-dom';
import { SummaryCardWrapper } from './summary-card.stories';

describe('SummaryCard', () => {
  it('should render the component', () => {
    render(<SummaryCardWrapper />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Summary & Performance/i)).toBeInTheDocument();
    expect(screen.getByText(/10589 tasks/i)).toBeInTheDocument();
    expect(screen.getAllByText(/over the last 2 months/i)[0]).toBeInTheDocument();
  });
});
