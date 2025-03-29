import React, { useState, useEffect } from "react";
import "./StockManagement.css";

const defaultStocks = [
  {
    id: 1,
    name: "Coffee Beans",
    category: "Beverages",
    supplier: "Supplier A",
    quantity: 20,
    minStock: 5,
    reorderQty: 10,
    unit: "kg",
    lastRestock: "2024-03-01",
    restockQty: 15,
    restockPrice: 200,
    totalCost: 2000,
    unitsSold: 5,
    wastage: 1,
    mfgDate: "2024-02-01",
    expiry: "2025-06-10"
  },
  {
    id: 2,
    name: "Tea Leaves",
    category: "Beverages",
    supplier: "Supplier B",
    quantity: 30,
    minStock: 10,
    reorderQty: 15,
    unit: "kg",
    lastRestock: "2024-03-05",
    restockQty: 20,
    restockPrice: 150,
    totalCost: 3000,
    unitsSold: 8,
    wastage: 2,
    mfgDate: "2024-02-10",
    expiry: "2025-07-15"
  }
];


const StockManagement = () => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    const savedStocks = localStorage.getItem("stocks");
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
    } else {
      setStocks(defaultStocks);
      localStorage.setItem("stocks", JSON.stringify(defaultStocks));
    }
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      localStorage.setItem("stocks", JSON.stringify(stocks));
    }
  }, [stocks]);

  const [newStock, setNewStock] = useState({
    id: "",
    name: "",
    category: "",
    supplier: "",
    quantity: "",
    minStock: "",
    reorderQty: "",
    unit: "",
    lastRestock: "",
    restockQty: "",
    restockPrice: "",
    totalCost: "",
    unitsSold: "",
    wastage: "",
    mfgDate: "",
    expiry: ""
  });

  const handleInputChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  const addStock = () => {
    const isEmpty = Object.values(newStock).every((value) => value === "");
  
    if (isEmpty) {
      alert("Please enter at least one detail.");
      return;
    }
  
    const updatedStocks = [...stocks, { ...newStock, id: stocks.length + 1 }];
    setStocks(updatedStocks);
    resetForm();
  };
  

  const deleteStock = (id) => {
    const updatedStocks = stocks.filter((stock) => stock.id !== id);
    setStocks(updatedStocks);
  };

  const editStock = (stock) => {
    setNewStock(stock);
    setEditingStock(stock.id);
  };

  const updateStock = () => {
    const updatedStocks = stocks.map((stock) =>
      stock.id === editingStock ? { ...newStock, id: editingStock } : stock
    );
    setStocks(updatedStocks);
    setEditingStock(null);
    resetForm();
  };

  const resetForm = () => {
    setNewStock({
      id: "",
      name: "",
      category: "",
      supplier: "",
      quantity: "",
      minStock: "",
      reorderQty: "",
      unit: "",
      lastRestock: "",
      restockQty: "",
      restockPrice: "",
      totalCost: "",
      unitsSold: "",
      wastage: "",
      mfgDate: "",
      expiry: ""
    });
  };

  return (
    <div className="stock-container">
      <h2>Stock Management</h2>
      <div className="form-container1">
        <input type="text" name="name" placeholder="Product Name" value={newStock.name} onChange={handleInputChange} />
        <input type="text" name="category" placeholder="Category" value={newStock.category} onChange={handleInputChange} />
        <input type="text" name="supplier" placeholder="Supplier Name" value={newStock.supplier} onChange={handleInputChange} />
        <input type="number" name="quantity" placeholder="Stock Quantity" value={newStock.quantity} onChange={handleInputChange} />
        <input type="number" name="minStock" placeholder="Min Stock Level" value={newStock.minStock} onChange={handleInputChange} />
        <input type="number" name="reorderQty" placeholder="Reorder Quantity" value={newStock.reorderQty} onChange={handleInputChange} />
        <input type="text" name="unit" placeholder="Unit" value={newStock.unit} onChange={handleInputChange} />
        <input type="date" name="lastRestock" value={newStock.lastRestock} onChange={handleInputChange} />
        <input type="number" name="restockQty" placeholder="Restock Quantity" value={newStock.restockQty} onChange={handleInputChange} />
        <input type="number" name="restockPrice" placeholder="Restock Price" value={newStock.restockPrice} onChange={handleInputChange} />
        <input type="number" name="totalCost" placeholder="Total Cost" value={newStock.totalCost} onChange={handleInputChange} />
        <input type="number" name="unitsSold" placeholder="Units Sold" value={newStock.unitsSold} onChange={handleInputChange} />
        <input type="number" name="wastage" placeholder="Wastage" value={newStock.wastage} onChange={handleInputChange} />
        <input type="date" name="mfgDate" value={newStock.mfgDate} onChange={handleInputChange} />
        <input type="date" name="expiry" value={newStock.expiry} onChange={handleInputChange} />
        {editingStock ? (
          <button onClick={updateStock}>Update Stock</button>
        ) : (
          <button onClick={addStock}>Add Stock</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Reorder Qty</th>
            <th>Unit</th>
            <th>Last Restock</th>
            <th>Restock Qty</th>
            <th>Restock Price</th>
            <th>Total Cost</th>
            <th>Units Sold</th>
            <th>Wastage</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id} className={stock.quantity < stock.minStock ? "low-stock" : ""}>
              <td>{stock.name}</td>
              <td>{stock.category}</td>
              <td>{stock.supplier}</td>
              <td>{stock.quantity}</td>
              <td>{stock.minStock}</td>
              <td>{stock.reorderQty}</td>
              <td>{stock.unit}</td>
              <td>{stock.lastRestock}</td>
              <td>{stock.restockQty}</td>
              <td>{stock.restockPrice}</td>
              <td>{stock.totalCost}</td>
              <td>{stock.unitsSold}</td>
              <td>{stock.wastage}</td>
              <td>{stock.mfgDate}</td>
              <td>{stock.expiry}</td>
              <td>
                <button className="edit-btn" onClick={() => editStock(stock)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteStock(stock.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
