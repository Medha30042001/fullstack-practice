import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Login = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef(null);

  const login = async () => {
    const res = await axios.post("http://localhost:4000/auth/login", {
        email, password
    });

    localStorage.setItem("token", res.data.token);
    setPage("home");
  };

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col space-y-2 bg-gray-200 p-6 rounded shadow w-80">
          <h2 className="text-4xl font-bold text-center mb-4">Login</h2>

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="none"
            className="border p-2 rounded"
            ref={loginRef}
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            className="border p-2 rounded"
          />

          <div className="flex gap-4 justify-center pt-5">
            <button
              onClick={login}
              className="bg-black text-white py-1 px-3 rounded w-30 hover:bg-gray-700 transition"
            >Login</button>

            <button onClick={() => setPage("signup")} 
            className="bg-blue-500 py-1 px-4 rounded-md text-white hover:bg-blue-700 transition">
                Go to signup</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
