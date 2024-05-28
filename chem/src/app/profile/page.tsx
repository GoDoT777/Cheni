"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LeftNav from "../../../components/LeftNav";
import HeadContent from "../../../components/HeadContent";
import "./prof.css";

export default function ChemSafe() {
  const router = useRouter();

  return (
    <>
      <HeadContent title="Profile" />
      <nav>
        <LeftNav />
        <div className="right">
          <div className="header">Your profile:</div>
          <div className="display-data"></div>
        </div>
      </nav>
    </>
  );
}
