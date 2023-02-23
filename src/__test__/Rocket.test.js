/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Rocket from '../components/Rocket';

it('renders the Rocket component', () => {
  render(<Rocket />);
  expect(screen.getByRole('heading', { name: /Flight Status/i }))
  expect(screen.getByRole('heading', { name: /Upcoming Status/i }))
});

it('displays the name prop in Title', () => {
  render(<Rocket name='Falcon' />);
  expect(screen.getByTestId('title', { name: /Flight Status/i }))
});

it('displays the details prop in Details', () => {
  render(<Rocket details='It flew' />);
  expect(screen.getByTestId('details', { name: /It flew/i }))
});

it('displays the status prop in Flight Status', () => {
  render(<Rocket success={true} />);
  expect(screen.getByRole('heading', { name: /Flight Status: Successfully Flew/i }))
});

it('displays the upcoming prop in Upcoming Status', () => {
  render(<Rocket upcoming={false} />);
  expect(screen.getByTestId('title', { name: /Upcoming Status: False/i }))
});
