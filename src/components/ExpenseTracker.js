import React, { useState, useEffect } from "react";
import "./ExpenseTracker.css";

const BASE_URL = "https://appointment-booking-syst-e0829-default-rtdb.firebaseio.com/expenses";

const ExpenseTracker = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${BASE_URL}.json`);
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

        const expenseData = {
            amount,
            description,
            category,
        };

        try {
            //  UPDATE
            if (editingId) {
                const response = await fetch(
                    `${BASE_URL}/${editingId}.json`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(expenseData),
                    }
                );

                if (!response.ok) throw new Error("Update failed");

                setExpenses((prev) =>
                    prev.map((exp) =>
                        exp.id === editingId ? { id: editingId, ...expenseData } : exp
                    )
                );

                setEditingId(null);
            }
            // ADD
            else {
                const response = await fetch(`${BASE_URL}.json`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(expenseData),
                });

                if (!response.ok) throw new Error("Add failed");

                const data = await response.json();

                setExpenses((prev) => [
                    ...prev,
                    { id: data.name, ...expenseData },
                ]);
            }

            // Clear form
            setAmount("");
            setDescription("");
            setCategory("");

        } catch (err) {
            alert(err.message);
        }
    };

    // DELETE
    const deleteHandler = async (id) => {
        try {
            const response = await fetch(
                `${BASE_URL}/${id}.json`,
                { method: "DELETE" }
            );

            if (!response.ok) throw new Error("Delete failed");

            setExpenses((prev) => prev.filter((exp) => exp.id !== id));

            console.log("Expense successfully deleted");

        } catch (err) {
            alert(err.message);
        }
    };

    // START EDIT
    const editHandler = (expense) => {
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setEditingId(expense.id);
    };

    return (
        <div className="expense-container">
            <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

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

                <button>{editingId ? "Update Expense" : "Add Expense"}</button>
            </form>

            <ul className="expense-list">
                {expenses.map((exp) => (
                    <li key={exp.id}>
                        <span>₹{exp.amount}</span>
                        <span>{exp.description}</span>
                        <span>{exp.category}</span>

                        <button onClick={() => editHandler(exp)} className="edit-btn">Edit</button>
                        <button onClick={() => deleteHandler(exp.id)} className="delete-btn">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseTracker;
