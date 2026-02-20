import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Hello");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not logged in");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/home`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response?.data));
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>

    <div className="p-4 text-xl">
        {message || "Loading..."}
    </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="bg-red-700 py-1 px-4 rounded-md text-white w-35 hover:bg-red-400 transition"
      >
        Logout
      </button>
    </>
  );
};

export default Home;
