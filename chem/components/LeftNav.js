// components/LeftNav.js
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./LeftNav.css"; // Assuming you have this CSS file

const LeftNav = () => {
  const router = useRouter();

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div className="leftnav">
      <button
        className="icos"
        id="profile"
        onClick={() => handleRedirect("/profile")}
      >
        <Image src="/images/profile.png" width={30} height={30} alt="Profile" />
      </button>
      <button
        className="icos"
        id="main"
        onClick={() => handleRedirect("/main")}
      >
        <Image
          src="/images/main-menu.png"
          width={30}
          height={30}
          alt="Main Menu"
        />
      </button>
      <button className="icos" id="buy" onClick={() => handleRedirect("/buy")}>
        <Image src="/images/buy.png" width={30} height={30} alt="Buy" />
      </button>
      <button className="icos" id="add" onClick={() => handleRedirect("/add")}>
        <Image src="/images/circle.png" width={30} height={30} alt="Add" />
      </button>
      <button
        className="icos"
        id="logout"
        onClick={() => handleRedirect("/signin")}
      >
        <Image src="/images/logout.png" width={30} height={30} alt="Logout" />
      </button>
    </div>
  );
};

export default LeftNav;
