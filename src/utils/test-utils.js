import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rocketReducer from '../features/rocket/rocketSlice';

export function renderWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { rocket: rocketReducer } }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
