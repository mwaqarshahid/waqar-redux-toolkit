/** @jest-environment jsdom */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import App from '../App';

export const handlers = [
  rest.get(process.env.REACT_APP_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'FalconSat',
        },
        {
          name: 'DemoSat',
        },
        {
          name: 'Trailblazer',
        },
      ]),
    )
  })
];

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

it('renders the App component', () => {
  renderWithProviders(<App />);
  expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();
});

it('fetches latest launch vehicles', async () => {
  renderWithProviders(<App />);
  const rocketsList = await screen.findAllByTestId('title');
  expect(screen.queryByText(/FalconSat/i)).toBeInTheDocument();
  expect(rocketsList).toHaveLength(3);
})
