"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent";
import InputField from "../../../components/InputField";
import Nbutton from "../../../components/Nbutton";
import Rbutton from "../../../components/Rbutton";
import Gbutton from "../../../components/Gbutton";
import { formatDate } from "../../../utils/FromDate";
import "./mainp.css";

interface DataItem {
  id: any;
  cas: string;
  name: string;
  amount: any;
  si: string;
}

export default function ChemSafe() {
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [user, setUser] = useState<null | any>(null); // Adjust 'any' to the actual user type if known
  const [data, setData] = useState<DataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingAmount, setEditingAmount] = useState("");
  const [dataa, setDataa] = useState<DataItem[]>([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const dataa = new Date();
    const day = String(dataa.getDate()).padStart(2, "0");
    const month = String(dataa.getMonth() + 1).padStart(2, "0");
    const year = String(dataa.getFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const response = await fetch("/api/mainy");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: DataItem[] = await response.json();
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

  const handleDelete = async (itemId: string) => {
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

  const handleEdit = (itemId: string, currentAmount: string) => {
    setEditingId(itemId);
    setEditingAmount(currentAmount);
  };

  const handleSave = async (itemId: string) => {
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

  const renderDataRows = (data: DataItem[]) => {
    if (!Array.isArray(data)) {
      return <div>Data is not an array</div>;
    }
    return data.map((item, index) => (
      <div key={index} className="data-row">
        <span>{item.name}</span>
        <span>{item.cas}</span>
        <span>
          {editingId === item.id ? (
            <InputField
              placeholder="Editing"
              width="70px"
              height="30px"
              type="number"
              value={editingAmount}
              onChange={(e) => setEditingAmount(e.target.value)}
            />
          ) : (
            item.amount
          )}{" "}
          {item.si}
        </span>
        <span>-</span>
        <div className="buttons">
          <Rbutton
            onClick={() => handleDelete(item.id)}
            width="80px"
            height="30px"
          >
            Delete
          </Rbutton>

          {editingId === item.id ? (
            <Gbutton
              onClick={() => handleSave(item.id)}
              width="80px"
              height="30px"
            >
              Save
            </Gbutton>
          ) : (
            <Nbutton
              onClick={() => handleEdit(item.id, item.amount)}
              width="80px"
              height="30px"
            >
              Edit
            </Nbutton>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      <HeadContent title="Main" />
      <nav>
        <LeftNav />
        <div className="right">
          <div className="header">
            Chemical Storage <span className="date">({currentDate}) </span>
          </div>
          <div className="underline"></div>
          <div className="table-header">
            <span>Element Name</span>
            <span>CAS Number</span>
            <span>Quantity</span>
            <span>Expiration Date</span>
            <span>Actions</span>
          </div>
          <div className="display-data">
            {error ? <div>{error}</div> : renderDataRows(data)}
          </div>
        </div>
      </nav>
    </>
  );
}
