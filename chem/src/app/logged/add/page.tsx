import React from "react";
import Image from "next/image";
import "./signin.css";

export default function ChemSafe() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
              width={200000}
              height={200000}
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
          <div id="signi">Sign in</div>
          <form action="#">
            <div className="same">Email:</div>
            <input type="text" placeholder="example@chem.safe" />
            <div className="same">
              Password:
              <span className="forg">
                <a href="#">Forgot Password?</a>
              </span>
            </div>
            <input type="password" placeholder="Qwerty123!" />
            <div className="btn">
              <button>Sign in</button>
            </div>
            <span className="signref">
              Don't have an account? <a href="#"> Sign up</a>
            </span>
          </form>
        </div>
      </main>
    </div>
  );
}
