import React, { useState } from "react";
import "./ExpenseTracker.css";

const ExpenseTracker = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();

        const newExpense = {
            id: Date.now(),
            amount,
            description,
            category,
        };

        setExpenses((prev) => [...prev, newExpense]);

        // clear fields
        setAmount("");
        setDescription("");
        setCategory("");
    };

    return (
        <div className="expense-container">
            <h2>Add Expense</h2>

            <form className="expense-form" onSubmit={submitHandler}>
                <input
                    type="number"
                    placeholder="Money Spent"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Expense Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Salary">Salary</option>
                    <option value="Shopping">Shopping</option>
                </select>

                <button>Add Expense</button>
            </form>

            <ul className="expense-list">
                {expenses.map((exp) => (
                    <li key={exp.id}>
                        <span>₹{exp.amount}</span>
                        <span>{exp.description}</span>
                        <span>{exp.category}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;
