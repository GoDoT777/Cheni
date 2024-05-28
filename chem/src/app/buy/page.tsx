"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./buy.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import chemicalData from "../../../public/parcer/scraped_data.json";

// const chemicalData = [
//   {
//     href: "https://www.spectrumchemical.com/chemical/organic-chemicals/biochemistry-chemicals/reagents-for-pharmacological-research/zolmitriptan-tci-z0024",
//     text: "Zolmitriptan",
//     casNumber: "139264-17-8",
//     formula: "C16H21N3O2",
//     itemNumber: "TCI-Z0024",
//     cas: "139264-17-8",
//     manufacturer: "TCI America",
//   },
// ];

export default function ChemSafe() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRedirect = (url: any) => {
    router.push(url);
  };
  const handleSearch = () => {
    const result = chemicalData.find(
      (chemical) => chemical.casNumber === searchValue
    );
    if (result) {
      setSearchResult(result);
      setErrorMessage("");
    } else {
      setSearchResult(null);
      setErrorMessage("Incorrect CAS number");
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
            id="profile"
            onClick={() => handleRedirect("/profile")}
          >
            <Image
              src="/images/profile.png"
              width={200}
              height={200}
              alt="Profile"
            />
          </button>
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
          <button
            className="icos"
            id="logout"
            onClick={() => handleRedirect("/signin")}
          >
            <Image
              src="/images/logout.png"
              width={200}
              height={200}
              alt="Logout"
            />
          </button>
        </div>
        <div className="right">
          <div className="header">Our shop:</div>
          <div className="items">
            <input
              id="search"
              type="text"
              placeholder="Enter CAS number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button id="searchButton" onClick={handleSearch}>
              Search
            </button>
            <div className="result">
              {searchResult ? (
                <div>
                  <p>
                    <strong>Text:</strong> {searchResult.text}
                  </p>
                  <p>
                    <strong>CAS Number:</strong> {searchResult.casNumber}
                  </p>
                  <p>
                    <strong>Formula:</strong> {searchResult.formula}
                  </p>
                  <p>
                    <strong>Item Number:</strong> {searchResult.itemNumber}
                  </p>
                  <p>
                    <strong>Manufacturer:</strong> {searchResult.manufacturer}
                  </p>
                  <p>
                    <a
                      href={searchResult.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More Info
                    </a>
                  </p>
                </div>
              ) : (
                errorMessage && <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
        <div className="maint"></div>
      </nav>
    </div>
  );
}
