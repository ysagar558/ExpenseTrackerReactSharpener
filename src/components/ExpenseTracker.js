import React, { useState,useEffect } from "react";
import "./ExpenseTracker.css";

const FIREBASE_URL = "https://appointment-booking-syst-e0829-default-rtdb.firebaseio.com/expenses.json";

const ExpenseTracker = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(FIREBASE_URL);
                const data = await response.json();

                if (data) {
                    const loadedExpenses = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));

                    setExpenses(loadedExpenses);
                }
            } catch (err) {
                console.error("Failed to fetch expenses");
            }
        };

        fetchExpenses();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newExpense = {
            amount,
            description,
            category,
        };

        try {
            const response = await fetch(FIREBASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExpense),
            });

            if (!response.ok) {
                throw new Error("Failed to add expense");
            }

            const data = await response.json();

            setExpenses((prev) => [
                ...prev,
                { id: data.name, ...newExpense },
            ]);

            // Clear form
            setAmount("");
            setDescription("");
            setCategory("");

        } catch (err) {
            alert(err.message);
        }
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
