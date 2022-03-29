import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('has three buttons', () => {
  render(<App />);
  expect(screen.getAllByRole("button")).toHaveLength(3);
});
