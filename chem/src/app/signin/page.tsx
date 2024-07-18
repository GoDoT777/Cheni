'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './signin.css';
import { useRouter } from 'next/navigation';

export default function ChemSafe() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e: any, path: any) => {
    e.preventDefault();
    const response = await fetch(`/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      setIsLoggedIn(true);
      router.push('/main');
    } else {
      console.log(`${path} failed`);
    }
  };

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <main>
      <div className="bg">
        <div className="logo-container">
          <button className="icos" id="main" onClick={() => handleRedirect('/home')}>
            <Image src="/images/ico.png" id="logo-size" alt="Logo" width={1000} height={1000} />
            <p id="Chem" className="logo">
              Chem.Safe
            </p>
          </button>
        </div>
        <Image
          src="/images/signleft.png"
          className="image-size"
          alt="Sign left"
          width={1000}
          height={689}
        />
      </div>

      <div className="sign-up">
        <h1 id="signi">Sign in</h1>

        <form>
          <p className="same">Email:</p>
          <input
            type="email"
            autoComplete="email"
            placeholder="example@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="same">
            Password:
            <span className="forg">
              <a href="#">Forgot Password?</a>
            </span>
          </p>
          <input
            placeholder="Example123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn">
            <button type="submit" onClick={(e) => handleSubmit(e, 'login')}>
              Sign in
            </button>
          </div>
          <span className="signref">
            Don't have an account?
            <button id="signup" type="button" onClick={(e) => handleRedirect('/signup')}>
              Sign up
            </button>
          </span>
        </form>
      </div>
    </main>
  );
}
