import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../Components/Navigation';

test('renders Chitter logo/link', () => {
  render(
    <MemoryRouter>
      <Navigation loggedIn={false} />
    </MemoryRouter>
  );
  const chitterLogo = screen.getByText('Chitter 🦜');
  expect(chitterLogo).toBeInTheDocument();
});

test('renders Login and Sign Up links when not logged in', () => {
  render(
    <MemoryRouter>
      <Navigation loggedIn={false} />
    </MemoryRouter>
  );
  const loginLink = screen.getByText('Login');
  const signUpLink = screen.getByText('Sign Up');
  expect(loginLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

test('renders Log out button when logged in', () => {
  const mockLogout = jest.fn();
  render(
    <MemoryRouter>
      <Navigation loggedIn={true} onLogout={mockLogout} />
    </MemoryRouter>
  );
  const logoutButton = screen.getByText('Log out');
  expect(logoutButton).toBeInTheDocument();
});
