import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Tasks from './pages/tasks'
export const serverurl="http://localhost:8000"
function App() {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/task' element={<Tasks/>}></Route>
      </Routes>
    </div>
  )
}

export default App