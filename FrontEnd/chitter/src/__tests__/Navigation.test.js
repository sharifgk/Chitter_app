import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Components/Navigation';

test('renders Chitter brand', () => {
  render(
    <MemoryRouter>
      <Navigation loggedIn={false} />
    </MemoryRouter>
  );
  const brandElement = screen.getByText('Chitter 🦜');
  expect(brandElement).toBeInTheDocument();
});

test('renders Login and Sign Up links when not logged in', () => {
  render(
    <MemoryRouter>
      <Navigation loggedIn={false} />
    </MemoryRouter>
  );
  const loginLinkElement = screen.getByText('Login');
  const signUpLinkElement = screen.getByText('Sign Up');
  expect(loginLinkElement).toBeInTheDocument();
  expect(signUpLinkElement).toBeInTheDocument();
});

test('renders Log out button when logged in', () => {
  const mockLogout = jest.fn();
  render(
    <MemoryRouter>
      <Navigation loggedIn={true} onLogout={mockLogout} />
    </MemoryRouter>
  );
  const logoutButtonElement = screen.getByText('Log out');
  expect(logoutButtonElement).toBeInTheDocument();
});
