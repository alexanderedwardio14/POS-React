import React, { useState, useEffect } from "react";
import axios from "axios";

const Report = () => {
  const [transaction, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const response = await axios.get("http://localhost:5000/transactions");
    setTransactions(response.data);
  };

  return (
    <div>
      <h1 className="title">Reporting</h1>
      <h2 className="subtitle">List of Transaction</h2>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>TrxId</th>
            <th>Quantity</th>
            <th>Products</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((trx, index) => (
            <tr key={trx.uuid}>
              <td>{index + 1}</td>
              <td>{trx.trxId}</td>
              <td>{trx.quantity}</td>
              <td>{trx.product.name}</td>
              <td>{trx.user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
