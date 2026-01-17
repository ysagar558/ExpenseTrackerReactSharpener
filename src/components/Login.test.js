import { render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import store from '../store/index';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Signup from './Signup';

describe('Login component', () => {
  test('renders login', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const linkElement = screen.getAllByText(/login/i);
    expect(linkElement.length).toBe(2);
  });

  test('renders forgot password', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const linkForgotElement = screen.getByText('Forgot Password');
    expect(linkForgotElement).toBeInTheDocument();
  });

  test('renders sign up', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const linkForgotElement = screen.getByText('Don’t have an account? Sign up');
    expect(linkForgotElement).toBeInTheDocument();
  });

  test('renders Log in button', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('renders email input field', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('login button is disabled when input fields are empty', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  test('Sign up text', () => {
    render(
      <Provider store={store}>
        <Login/>
        <Signup/>
      </Provider>
    );
    const signupButton = screen.getByRole('button',{name:/Sign up/i});
    userEvent.click(signupButton);

    const signupText = screen.getByText('SignUp', { exact: true });
    expect(signupText).toBeInTheDocument();

  });

  test('email text in signup  present', () => {
    render(
      <Provider store={store}>
        <Login/>
        <Signup/>
      </Provider>
    );
    const signupButton = screen.getByRole('button',{name:/Sign up/i});
    userEvent.click(signupButton);

    const emailText = screen.getAllByPlaceholderText('Email')[0];
    expect(emailText).toBeInTheDocument();

  });

  test('email text in signup  present', () => {
    render(
      <Provider store={store}>
        <Login/>
        <Signup/>
      </Provider>
    );
    const signupButton = screen.getByRole('button',{name:/Sign up/i});
    userEvent.click(signupButton);

    const passwordText = screen.getAllByPlaceholderText('Password')[0];
    expect(passwordText).toBeInTheDocument();

  });

  test('email text in signup  present', () => {
    render(
      <Provider store={store}>
        <Login/>
        <Signup/>
      </Provider>
    );
    const signupButton = screen.getByRole('button',{name:/Sign up/i});
    userEvent.click(signupButton);

    const passwordConfirmText = screen.getAllByPlaceholderText('Confirm Password')[0];
    expect(passwordConfirmText).toBeInTheDocument();

  });



});


