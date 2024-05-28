"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent"; // Adjust the path as necessary
import "./add.css";

export default function ChemSafe() {
  const router = useRouter();
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [data, setData] = useState([]);

  const handleRedirect = (url: any) => {
    router.push(url);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`/api/storage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cas, name, amount, si }),
    });

    if (response.ok) {
      const newItem = await response.json();
      setData((prevData) => [...prevData, newItem]);
      setCas("");
      setName("");
      setAmount("");
      setSi("");
    } else {
      console.log("storage failed");
    }
  };

  return (
    <div>
      <HeadContent title="Add new" />
      <nav>
        <LeftNav /> {/* Use the LeftNav component here */}
        <div className="right">
          <div className="header">Our list:</div>
          <div className="items">
            <form onSubmit={handleSubmit}>
              <input
                id="inp"
                type="text"
                placeholder="Cas"
                value={cas}
                required
                onChange={(e) => setCas(e.target.value)}
              />
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="custom-select">
                <select
                  value={si}
                  required
                  onChange={(e) => setSi(e.target.value)}
                >
                  <option value="">Select SI:</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                </select>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="display-data">
            {data.map((item, index) => (
              <div key={index} className="data-row">
                <span>{item.cas}</span>
                <span>{item.name}</span>
                <span>{item.amount}</span>
                <span>{item.si}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
