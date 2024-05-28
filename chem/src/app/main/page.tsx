"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent";
import "./mainp.css";

export default function ChemSafe() {
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingAmount, setEditingAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mainy");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(typeof data); // Проверяем тип данных
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setError("Received data is not an array");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch("/api/deleteItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setData(data.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (itemId, currentAmount) => {
    setEditingId(itemId);
    setEditingAmount(currentAmount);
  };

  const handleSave = async (itemId) => {
    try {
      const response = await fetch("/api/updateItem", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId, amount: editingAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      setData(
        data.map((item) =>
          item.id === itemId ? { ...item, amount: editingAmount } : item
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const renderDataRows = (data) => {
    if (!Array.isArray(data)) {
      return <div>Данные не являются массивом</div>;
    }
    return data.map((item, index) => (
      <div key={index} className="data-row">
        <span className="pad">{item.cas}</span>
        <span className="pad">{item.name}</span>
        <span className="pad">
          {editingId === item.id ? (
            <input
              type="number"
              className="inside"
              value={editingAmount}
              onChange={(e) => setEditingAmount(e.target.value)}
            />
          ) : (
            item.amount
          )}
        </span>
        <span className="padr">{item.si}</span>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
        {editingId === item.id ? (
          <button className="inside" onClick={() => handleSave(item.id)}>
            Save
          </button>
        ) : (
          <button
            className="inside"
            onClick={() => handleEdit(item.id, item.amount)}
          >
            Edit
          </button>
        )}
      </div>
    ));
  };

  return (
    <>
      <HeadContent title="Main" />
      <nav>
        <LeftNav />
        <div className="right">
          <div className="header">Our storage:</div>
          <div className="display-data">
            {error ? <div>{error}</div> : renderDataRows(data)}
          </div>
        </div>
      </nav>
    </>
  );
}
