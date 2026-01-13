import { createSlice } from "@reduxjs/toolkit";


const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        items: [],
    },
    reducers: {
        setExpenses(state, action) {
            state.items = action.payload;
        },
        addExpense(state, action) {
            state.items.push(action.payload);
        },
        deleteExpense(state, action) {
            state.items = state.items.filter(
                (exp) => exp.id !== action.payload
            );
        },
        updateExpense(state, action) {
            const index = state.items.findIndex(
                (exp) => exp.id === action.payload.id
            );
            state.items[index] = action.payload;
        },
    },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
