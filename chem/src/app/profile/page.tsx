"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./prof.css";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function ChemSafe() {
  const router = useRouter(); // Moved above handleRedirect to fix scope issue
  const handleRedirect = (url: any) => {
    router.push(url);
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
          <div className="header">Your profile:</div>
          <div className="display-data"></div>
        </div>
      </nav>
    </>
  );
}
