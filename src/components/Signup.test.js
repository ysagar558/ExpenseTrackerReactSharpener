import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import { Provider } from 'react-redux';
import store from '../store/index';

describe('Signup componenet',() =>{
    test('renders email input', () => {
  render(
  <Provider store={store}>
  <Signup/>
  </Provider>
);
  const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
}) 

test('renders password input', () => {
  render(
  <Provider store={store}>
  <Signup/>
  </Provider>
);
  const confirmPasswordInput =
      screen.getByPlaceholderText(/confirm password/i);
    expect(confirmPasswordInput).toBeInTheDocument();
}) 

test('renders sign up button', () => {
  render(
  <Provider store={store}>
  <Signup/>
  </Provider>
);
   const signupButton = screen.getByRole("button", { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
}) 

test('renders link text', () => {
  render(
  <Provider store={store}>
  <Signup/>
  </Provider>
);
   const linkText = screen.getByText('Have an account? Login');
    expect(linkText).toBeInTheDocument();
}) 

test('renders password input', () => {
  render(
  <Provider store={store}>
  <Signup/>
  </Provider>
);
   const passwordInput = screen.getByPlaceholderText(/^password$/i);
    expect(passwordInput).toBeInTheDocument();
}) 


});