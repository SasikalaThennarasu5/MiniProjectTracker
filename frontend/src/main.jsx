import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import TraineeDashboard from './pages/TraineeDashboard'
import TrainerDashboard from './pages/TrainerDashboard'
import ProjectForm from './pages/ProjectForm'
import axiosInstance from './utils/axios'

/*
  Entry point: sets up routes and a very small auth helper using localStorage for JWT token.
  axiosInstance automatically attaches token via interceptors (see src/utils/axios.js)
*/

function App(){
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ token ? <Navigate to='/dashboard' /> : <Navigate to='/login' /> } />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<TraineeDashboard/>} />
        <Route path="/trainer" element={<TrainerDashboard/>} />
        <Route path="/project/new" element={<ProjectForm/>} />
        <Route path="/project/edit/:id" element={<ProjectForm/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
