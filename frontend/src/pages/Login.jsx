import React, { useState } from 'react'
import axios from '../utils/axios'

/*
  Login page: gets JWT token from backend and stores in localStorage.
  For demo, use sample users created by backend management command:
    - trainer / (your trainer's password)
    - alice / (no password unless created via createsuperuser; adjust as needed)
  In a real app, you'd create users and set passwords properly.
*/
export default function Login(){
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const res = await axios.post('/api/token/', {username,password})
      localStorage.setItem('token', res.data.access)
      // optionally, refresh token saved too
      window.location.href = '/dashboard'
    }catch(err){
      // error handling shown by interceptor
    }finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center p-6">
      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Trainee Mini Project Tracker</h2>
        <input className="w-full p-3 border rounded mb-4" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input type="password" className="w-full p-3 border rounded mb-4" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-3 bg-indigo-600 text-white rounded" disabled={loading}>{loading? 'Logging...':'Login'}</button>
      </form>
    </div>
  )
}
