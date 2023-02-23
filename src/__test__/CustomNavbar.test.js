/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import CustomNavbar from '../components/CustomNavbar';

it('renders Navbar component', () => {
  renderWithProviders(<CustomNavbar />);

  expect(screen.queryByText(/Space X Tech./i)).toBeInTheDocument();
});

it('search input should allow any text to be entered', () => {
  renderWithProviders(<CustomNavbar />);

  const input = screen.getByTestId('searchName')
  fireEvent.change(input, { target: { value: 'waqar' } })
  expect(input.value).toBe('waqar')
});
