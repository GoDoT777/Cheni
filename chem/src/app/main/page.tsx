"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./mainp.css";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ChemSafe() {
  const router = useRouter(); // Moved above handleRedirect to fix scope issue
  const handleRedirect = (url) => {
    router.push(url);
  };
  const [cas, setCas] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [si, setSi] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]); // New state to hold fetched data
  const [error, setError] = useState(null); // State to hold any fetch errors

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

  const renderDataRows = (data) => {
    if (!Array.isArray(data)) {
      return <div>Данные не являются массивом</div>;
    }

    return data.map((item, index) => (
      <div key={index} className="data-row">
        <span>{item.cas}</span>
        <span>{item.name}</span>
        <span>{item.amount}</span>
        <span>{item.si}</span>
      </div>
    ));
  };

  return (
    <>
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
          <div className="header">Our storage:</div>
          <div className="display-data">
            {error ? <div>{error}</div> : renderDataRows(data)}{" "}
            {/* Использование функции для отображения данных */}
          </div>
        </div>
      </nav>
    </>
  );
}