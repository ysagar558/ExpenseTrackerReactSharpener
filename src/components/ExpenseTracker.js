import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expensesSlice";
import { themeActions } from "../store/themeSlice";
import "./ExpenseTracker.css";

const BASE_URL =
  "https://appointment-booking-syst-e0829-default-rtdb.firebaseio.com/expenses";

const ExpenseTracker = () => {
  const dispatch = useDispatch();

  // Redux state
  const expenses = useSelector((state) => state.expenses.items);
  // const token=useSelector((state)=>state.auth.token);
const token=localStorage.getItem('token');
  // Local UI state (form-related → should stay local)
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [toggleBtn,setToggleBtn]=useState(false);

  // FETCH EXPENSES
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${BASE_URL}.json?auth=${token}`);
        const data = await response.json();

        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          dispatch(expensesActions.setExpenses(loadedExpenses));
        }
      } catch (err) {
        console.error("Failed to fetch expenses");
      }
    };

    fetchExpenses();
  }, [dispatch]);

  // ADD / UPDATE EXPENSE
  const submitHandler = async (e) => {
    e.preventDefault();

    const expenseData = {
      amount,
      description,
      category,
    };

    try {
      // UPDATE
      if (editingId) {
        const response = await fetch(
          `${BASE_URL}/${editingId}.json?auth=${token}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData),
          }
        );

        if (!response.ok) throw new Error("Update failed");

        dispatch(
          expensesActions.updateExpense({
            id: editingId,
            ...expenseData,
          })
        );

        setEditingId(null);
      }
      // ADD
      else {
        const response = await fetch(`${BASE_URL}.json?auth=${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        });

        if (!response.ok) throw new Error("Add failed");

        const data = await response.json();

        dispatch(
          expensesActions.addExpense({
            id: data.name,
            ...expenseData,
          })
        );
      }

      // Clear form
      setAmount("");
      setDescription("");
      setCategory("");
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔹 DELETE EXPENSE
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${id}.json?auth=${token}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete failed");

      dispatch(expensesActions.deleteExpense(id));
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

  const csvData = expenses.map((exp) => ({
    Amount: exp.amount,
    Description: exp.description,
    Category: exp.category,
  }));

  const headers = [
    { label: "Amount", key: "Amount" },
    { label: "Description", key: "Description" },
    { label: "Category", key: "Category" },
  ];

  //  PREMIUM LOGIC
  const totalAmount = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

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

        <button>
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* PREMIUM BUTTON */}
      {totalAmount > 10000 && (
        <button className="premium-btn"onClick={()=>{
          setToggleBtn(true);
          dispatch(themeActions.toggleTheme());
        }}>
          Activate Premium
        </button>
      )}

      {toggleBtn&&<button onClick={()=>dispatch(themeActions.toggleTheme())} className="toggle-btn">
        Toggle Theme</button>};

      {toggleBtn&&<CSVLink
        data={csvData}
        headers={headers}
        filename="expenses.csv"
        target="_blank"
        className="csv-btn"
      >Download Expenses CSV</CSVLink>}

      <ul className="expense-list">
        {expenses.map((exp) => (
          <li key={exp.id}>
            <span>₹{exp.amount}</span>
            <span>{exp.description}</span>
            <span>{exp.category}</span>

            <button
              onClick={() => editHandler(exp)}
              className="edit-btn"
            >
              Edit
            </button>

            <button
              onClick={() => deleteHandler(exp.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
