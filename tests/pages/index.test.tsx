import { render, screen } from '@testing-library/react';

import Index from '../../pages/index';

describe('Should render the app without crashing', () => {
  it('Renders the Dashboard page', () => {
    render(<Index />);
    expect(
      screen.getByRole('button', { name: 'Filter by region' })
    ).toBeInTheDocument();
  });
});