import axios from 'axios';
import React, { useEffect } from 'react'

const Home = () => {

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/home`, {
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