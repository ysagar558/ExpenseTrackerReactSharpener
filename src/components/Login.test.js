import { render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import store from '../store/index';

describe('Login component',()=>{
test('renders login', () => {
  render(
  <Provider store={store}>
  <Login/>
  </Provider>
);
  const linkElement = screen.getAllByText(/login/i);
  expect(linkElement.length).toBe(2);
});

test('renders forgot password', () => {
  render(
  <Provider store={store}>
  <Login/>
  </Provider>
);
  const linkForgotElement = screen.getByText('Forgot Password');
  expect(linkForgotElement).toBeInTheDocument();
});

test('renders sign up', () => {
  render(
  <Provider store={store}>
  <Login/>
  </Provider>
);
  const linkForgotElement = screen.getByText('Don’t have an account? Sign up');
  expect(linkForgotElement).toBeInTheDocument();
});

test('renders Log in button', () => {
  render(
  <Provider store={store}>
  <Login/>
  </Provider>
);
 const loginButton = screen.getByRole("button", { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('renders email input field', () => {
  render(
  <Provider store={store}>
  <Login/>
  </Provider>
);
 const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();
});


});


