import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";

const TransactionList = () => {
  const [products, setProducts] = useState([]);
  //const { user } = useSelector((state) => state.auth);

  const current = new Date();
  const trxId = `${current.getDate()}${
    current.getMonth() + 1
  }${current.getFullYear()}`;

  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/productsall");
    setProducts(response.data);
  };

  const buy = async (productId, stock, id, pname) => {
    try {
      await axios.patch(`http://localhost:5000/stock/${productId}`, {
        stock: stock - 1,
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }

    try {
      await axios.post("http://localhost:5000/transactions", {
        quantity: 1,
        type: 1,
        productId: id,
        trxId: trxId + id,
      });
      setMsg(`Buy ${pname} Success`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }

    getProducts();
  };

  return (
    <div>
      <h1 className="title">Transaction</h1>
      <h2 className="subtitle">List of Stock</h2>
      <p className="has-text-centered">{msg}</p>
      <p>{trxId}</p>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.user.name}</td>
              <td>
                <button
                  onClick={() =>
                    buy(product.uuid, product.stock, product.id, product.name)
                  }
                  className="button is-small is-danger"
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
