import { render, screen } from "@testing-library/react";
import ExpenseTracker from "./ExpenseTracker";
import { Provider } from 'react-redux';
import store from '../store/index';

describe('ExpenseTracker Component', () => {

  test('check money placeholder Expense', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );
    const linkElement = screen.getAllByPlaceholderText('Money Spent')[0];
    expect(linkElement).toBeInTheDocument();


  })

  test('check Expense Description placeholder', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );
    const linkElement = screen.getAllByPlaceholderText('Expense Description')[0];
    expect(linkElement).toBeInTheDocument();


  })

  test('check Add Expense text', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    const linkElement = screen.getAllByText(/add expense/i)[0];
    expect(linkElement).toBeInTheDocument();


  })

  test('check Add Expense button', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    expect(
      screen.getByRole("button", { name: /add expense/i })
    ).toBeInTheDocument();
  })

  test('check Activate Premium button initially', () => {
    render(
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    );

    expect(
      screen.queryByText(/activate premium/i)
    ).not.toBeInTheDocument();
  });


})