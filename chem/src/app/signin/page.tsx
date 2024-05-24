import React from "react";
import "./signin.css";

export default function ChemSafe() {
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="index.css" />
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
            <img src="ico.png" id="logo-size" alt="Logo" />
            <p id="Chem" className="logo">
              Chem.Safe
            </p>
          </div>
          <img
            src="chem/public/images/signleft.png"
            className="image-size"
            alt="Sign left"
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
