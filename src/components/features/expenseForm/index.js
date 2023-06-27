import React, { useEffect, useState } from "react";
import "./style.css";

const ExpenseForm = ({
  expenseData: addExpenseData,
  editValuesData,
  editExpenseData,
}) => {
  const [expenseData, setExpenseData] = useState({
    title: "",
    price: "",
    date: "",
  });

  useEffect(() => {
    if (editValuesData !== null) {
      const dateString = editValuesData.date.toLocaleDateString().split("/");
      const formatDate = `${dateString[2]}-${
        dateString[0].length !== 2 ? "0" + dateString[0] : dateString[0]
      }-${dateString[1].length !== 2 ? "0" + dateString[1] : dateString[1]}`;
      setExpenseData({
        title: editValuesData.title,
        price: editValuesData.price,
        date: formatDate,
      });
    }
  }, [editValuesData]);

  const inputChangeHandler = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      id:
        editValuesData !== null
          ? editValuesData.id
          : Math.floor(Math.random() * 1000),
      title: expenseData.title,
      price: expenseData.price,
      date: new Date(expenseData.date),
    };

    editValuesData !== null ? editExpenseData(data) : addExpenseData(data);

    setExpenseData({
      title: "",
      price: "",
      date: "",
    });
  };

  return (
    <div className='expense-form'>
      <h4>Add Expense</h4>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='expenseTitle'>Expense</label>
          <input
            type='text'
            id='expenseTitle'
            placeholder='Add expense'
            name='title'
            value={expenseData.title}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            value={expenseData.price}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div>
          <label htmlFor='expenseDate'>Date</label>
          <input
            type='date'
            id='expenseDate'
            name='date'
            value={expenseData.date}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <button className='btn' type='submit'>
          {editValuesData !== null ? "Edit" : "Add"} Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
