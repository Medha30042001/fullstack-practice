import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Signup = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const signupRef = useRef(null);

  const signup = async () => {
    try {
      (await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
        role,
      }),
        setPage("login"));
    } catch (err) {
        alert(err.response?.data?.error || "Signup Failed");
    }
  };

  useEffect(() => {
    signupRef.current.focus();
  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="p-6 shadow rounded flex flex-col w-80 space-y-2 bg-gray-200">
          <h2 className="text-4xl text-center font-bold mb-4">Signup</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="none"
            className="border p-2 rounded"
            ref={signupRef}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="border p-2 rounded"
          />

          <select
            className="border p-2 rounded w-40 self-center"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-5 items-center justify-center pt-4">
            <button
              onClick={signup}
              className="bg-black py-1 px-4 rounded-md text-white w-35 hover:bg-gray-600 transition"
            >
              Signup
            </button>

            <button
              onClick={() => setPage("login")}
              className="bg-blue-500 py-1 px-4 rounded-md text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
