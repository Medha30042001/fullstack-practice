import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  const [page, setPage] = useState("login");

  return (
    <>
        {page === 'login' && <Login setPage={setPage}/>}
        {page === 'signup' && <Signup setPage={setPage}/>}
        {page === 'home' && <Home />}
        {/* If page === 'login' → true
            → React renders <Login />

            If page !== 'login' → false
            → React renders nothing */}
    </>
  )
}

export default App
