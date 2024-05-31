"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent";
import InputField from "../../../components/InputField";
import Gbutton from "../../../components/Gbutton";
import "./add.css";

interface DataItem {
  cas: string;
  name: string;
  amount: number;
  si: string;
}

export default function ChemSafe() {
  const router = useRouter();
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [data, setData] = useState<DataItem[]>([]);

  const handleRedirect = (url: string) => {
    router.push(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/storage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cas, name, amount, si }),
    });

    if (response.ok) {
      const newItem: DataItem = await response.json();
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
        <LeftNav />
        <div className="right">
          <div className="header">Our list:</div>
          <div className="underline"></div>
          <div className="items">
            <form onSubmit={handleSubmit}>
              <InputField
                placeholder="Cas"
                width="300px"
                height="30px"
                value={cas}
                required
                onChange={(e: any) => setCas(e.target.value)}
              />
              <InputField
                placeholder="Name"
                width="300px"
                height="30px"
                value={name}
                required
                onChange={(e: any) => setName(e.target.value)}
              />
              <InputField
                min="0"
                placeholder="Amount"
                type="number"
                width="100px"
                height="30px"
                value={amount}
                required
                onChange={(e: any) => setAmount(e.target.value)}
              />
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

              <Gbutton type="submit" width="80px" height="30px">
                Submit
              </Gbutton>
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
