"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./add.css";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ChemSafe() {
  const router = useRouter();
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]); // Add a state to hold data

  const handleRedirect = (url) => {
    router.push(url);
  };

  const handleSubmit = async (e) => {
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
      setIsLoggedIn(true);
    } else {
      console.log("storage failed");
    }
  };

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <title>Mainp</title>
      </Head>
      <nav>
        <div className="leftnav">
          <button
            className="icos"
            id="main"
            onClick={() => handleRedirect("/main")}
          >
            <Image
              src="/images/main-menu.png"
              width={200}
              height={200}
              alt="Main Menu"
            />
          </button>
          <button
            className="icos"
            id="buy"
            onClick={() => handleRedirect("/buy")}
          >
            <Image src="/images/buy.png" width={200} height={200} alt="Buy" />
          </button>
          <button
            className="icos"
            id="add"
            onClick={() => handleRedirect("/add")}
          >
            <Image
              src="/images/circle.png"
              width={200}
              height={200}
              alt="Add"
            />
          </button>
        </div>
        <div className="right">
          <div className="header">Our list:</div>
          <div className="items">
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
                <option value="0">Select SI:</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
              </select>
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
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
