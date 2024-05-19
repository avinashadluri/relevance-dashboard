import { render, screen } from '@/tests/test-utils';

import '@testing-library/jest-dom';
import { Navbar } from '@/components/navbar';

describe('Navbar', () => {
  it('should render the component', () => {
    render(<Navbar />);

    // Assert
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Date range selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Date range selected' })).toBeInTheDocument();
  });
});
