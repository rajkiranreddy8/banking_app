import React from "react";

const TransactionTableRow = ({ transaction }) => {
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{transaction.name1}</td> 
      <td>{transaction.name2}</td> 
      <td>{transaction.amount}</td>
    </tr>
  );
};

export default TransactionTableRow;
