"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./signup.css";
import { useRouter } from "next/navigation";

export default function ChemSafe() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/signin");
  };
  const handleSubmit = async (e: any, path: any) => {
    e.preventDefault();
    const response = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      setIsLoggedIn(true);
      router.push("/main");
    } else {
      console.log(`${path} failed`);
    }
  };
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
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
        <title>ChemSafe</title>

        <main>
          <div className="bg">
            <div className="logo-container">
              <Image
                src="/images/ico.png"
                id="logo-size"
                alt="Logo"
                width={2000}
                height={2000}
              />
              <p id="Chem" className="logo">
                Chem.Safe
              </p>
            </div>
            <Image
              src="/images/signleft.png"
              className="image-size"
              alt="Sign left"
              width={1099000}
              height={689}
            />
          </div>

          <div className="sign-up">
            <div id="signi">Sign up</div>
            <form>
              <div className="same">Email:</div>
              <input
                type="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="same">Password:</div>
              <input
                placeholder="Example123"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn">
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, "signup")}
                >
                  Sign up
                </button>
              </div>
              <span className="signref">
                Already have an account?
                <button id="signup" type="button" onClick={handleSignIn}>
                  Sign in
                </button>
              </span>
            </form>
          </div>
        </main>
      </>
    </div>
  );
}
