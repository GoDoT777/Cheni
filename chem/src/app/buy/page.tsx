"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import chemicalData from "../../../public/parcer/scraped_data.json";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent";
import InputField from "../../../components/InputField";
import Nbutton from "../../../components/Nbutton";
import "./buy.css";

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
      <HeadContent title="Buy" />
      <nav>
        <LeftNav />
        <div className="right">
          <div className="header">Our shop:</div>
          <div className="underline"></div>
          <div className="items">
            <InputField
              placeholder="Enter Cas"
              width="150px"
              height="30px"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <Nbutton onClick={handleSearch} width="80px" height="30px">
              Search
            </Nbutton>

            <div className="result">
              {searchResult ? (
                <div>
                  <p>
                    <strong>Name:</strong> {searchResult.text}
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
                      More Info...
                    </a>
                  </p>
                </div>
              ) : (
                errorMessage && <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
