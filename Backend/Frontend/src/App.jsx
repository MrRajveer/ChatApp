import React from 'react'
import Left from './home/left/Left'
import Right from './home/right/Right'
import Logout from './home/left1/Logout'
import Signup from './compnents/Signup'
import Login from './compnents/Login'
import { useAuth } from './context/AuthProvider'
import toast, { Toaster } from 'react-hot-toast';

import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />

      </Routes>
      <Toaster />


    </>
  )
}

export default App