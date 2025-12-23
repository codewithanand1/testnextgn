import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import { UserContext } from './context/UserData'

export const serverurl="http://localhost:8000"

function App() {
  const{userdata, loading}=useContext(UserContext)
  
  if(loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={userdata ? <Navigate to="/home" /> : <Login/>}></Route>
        <Route path='/home' element={userdata ? <Home/> : <Navigate to={"/login"} />}></Route>
        <Route path='/task' element={userdata ? <Tasks/> : <Navigate to={"/login"} />}></Route>
        <Route path='/' element={<Navigate to={userdata ? "/home" : "/login"} />}></Route>
      </Routes>
    </div>
  )
}

export default App