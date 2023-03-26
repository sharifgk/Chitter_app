import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PeepForm from '../Components/PeepForm';

test('renders peep input field and post peep button', () => {
  render(<PeepForm />);
  const peepInput = screen.getByLabelText('Peep');
  const postPeepButton = screen.getByText('Post Peep');

  expect(peepInput).toBeInTheDocument();
  expect(postPeepButton).toBeInTheDocument
});

