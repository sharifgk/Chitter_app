import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import LoginForm from '../Components/LoginForm';

test('renders email and password input fields ', () => {
    render(
        <MemoryRouter><LoginForm /></MemoryRouter>);
  const emailInput = screen.getByLabelText('Email address');
  const passwordInput = screen.getByLabelText('Password');
  

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
 
});
