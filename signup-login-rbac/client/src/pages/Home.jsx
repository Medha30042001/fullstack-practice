import axios from 'axios';
import React, { useEffect } from 'react'

const Home = () => {

    useEffect(() => {
        axios.get("http://localhost:4000/auth/home", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response?.data))
    }, []);
  return (
    <div>Home</div>
  )
}

export default Home