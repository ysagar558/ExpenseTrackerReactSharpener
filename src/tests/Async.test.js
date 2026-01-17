import { render, screen, waitFor } from "@testing-library/react";
import ExpenseTracker from "../components/ExpenseTracker";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../store/index";

describe('Async test cases', () => {
    test('fetches expenses on component mount', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({
                e1: { amount: "500", description: "Food", category: "Food" },
            })
        })
        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        expect(await screen.findByText("₹500")).toBeInTheDocument();

    })

    test('renders money spent placeholder', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => null
        })
        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        expect(await screen.findByPlaceholderText(/money spent/i)).toBeInTheDocument();

    })

    test('renders expense description placeholder', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => null
        })
        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        expect(await screen.findByPlaceholderText(/expense description/i)).toBeInTheDocument();

    })

    test('Add new expense on form submit', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => null
        })

        window.fetch.mockResolvedValueOnce({
            json: async () => ({
                name: 'e1'

            })
        })
        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await userEvent.type(screen.getByPlaceholderText(/money spent/i), "300");
        await userEvent.type(
            screen.getByPlaceholderText(/expense description/i),
            "Petrol"
        );
        await userEvent.selectOptions(screen.getByRole("combobox"), "Petrol");
        await userEvent.click(screen.getByRole("button", { name: /add expense/i }));

        expect(await screen.findByText("Petrol")).toBeInTheDocument();

    })

    test('Clicking on edit fills form data', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => ({
                e1: { amount: "1000", description: "Shopping", category: "Shopping" },
            })
        })

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await userEvent.click(await screen.findByText(/edit/i));

        expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
        expect(screen.getAllByDisplayValue("Shopping")[0]).toBeInTheDocument();

    })

    test('Update expenses on submit', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                e1: { amount: "1000", description: "Shopping", category: "Shopping" },
            })
        })

        window.fetch.mockResolvedValueOnce({ ok: true });

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await userEvent.click(await screen.findByText(/edit/i));
        await userEvent.clear(screen.getByPlaceholderText(/money spent/i));
        await userEvent.type(screen.getByPlaceholderText(/money spent/i), "1200");
        await userEvent.click(screen.getByRole("button", { name: /update expense/i }));

        expect(await screen.findByText("₹1200")).toBeInTheDocument();

    })

    test('Deletes expense on delete click', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                e1: { amount: "1000", description: "Shopping", category: "Shopping" },
            })
        })

        window.fetch.mockResolvedValueOnce({ ok: true });

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await userEvent.click(await screen.findByText(/delete/i));

        await waitFor(() =>
            expect(screen.queryByText("₹1000")).not.toBeInTheDocument());

    })

    test('Activates premium button', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                e1: { amount: "15000", description: "Shopping", category: "Shopping" },
            })
        })

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        expect(await screen.findByText(/activate premium/i)).toBeInTheDocument();

    })

    test('Activates toggle theme on clicking Activat premium button', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                e1: { amount: "15000", description: "Shopping", category: "Shopping" },
            })
        })

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await userEvent.click(await screen.findByText(/activate premium/i));

        expect(await screen.findByText(/toggle theme/i)).toBeInTheDocument();

    })

    test('Handles fetch failure', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce(new Error('Fetch failed'));

        render(<Provider store={store}>
            <ExpenseTracker />
        </Provider>);

        await waitFor(() =>
            expect(screen.getAllByText(/add expense/i)[0]).toBeInTheDocument()
        );

    });


});