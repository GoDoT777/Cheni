'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import './signup.css';
import { useRouter } from 'next/navigation';

export default function ChemSafe() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/signin');
  };
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
            <button type="submit" onClick={(e) => handleSubmit(e, 'signup')}>
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
  );
}
