import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTableRow from "./TransactionTableRow";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/transaction-history")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionTableRow
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
