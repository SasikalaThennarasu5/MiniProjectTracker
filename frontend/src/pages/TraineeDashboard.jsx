import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

/*
  Trainee dashboard: lists projects assigned to current user.
  Demonstrates GET, filtering via query params, and updating status via PUT.
*/
export default function TraineeDashboard(){
  const [projects,setProjects]=useState([])
  const [loading,setLoading]=useState(true)
  const [filter,setFilter]=useState({status:'',priority:''})

  useEffect(()=>{
    fetchProjects()
  },[filter])

  async function fetchProjects(){
    setLoading(true)
    try{
      // use query params for filtering
      const params = {}
      if(filter.status) params.status = filter.status
      if(filter.priority) params.priority = filter.priority
      const res = await axios.get('/api/mini-projects/', { params })
      // backend returns all projects; trainee will see only those assigned to them
      setProjects(res.data)
    }catch(err){}
    setLoading(false)
  }

  async function markDone(id){
    try{
      await axios.patch(`/api/mini-projects/${id}/`, {status:'done'})
      fetchProjects()
    }catch(err){}
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div>
          <Link to="/trainer" className="mr-3 px-4 py-2 bg-green-500 text-white rounded">Trainer Panel</Link>
          <button onClick={()=>{localStorage.removeItem('token');window.location.href='/login'}} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </header>

      <section className="mb-4 flex gap-3">
        <select value={filter.status} onChange={e=>setFilter({...filter,status:e.target.value})} className="p-2 border rounded">
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filter.priority} onChange={e=>setFilter({...filter,priority:e.target.value})} className="p-2 border rounded">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </section>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p=>(
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">Assigned to: {p.assigned_to.username}</p>
              <p className="mt-2">{p.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="mr-2">Priority: {p.priority}</span>
                  <span>Status: {p.status}</span>
                </div>
                {p.status !== 'done' && <button onClick={()=>markDone(p.id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Mark Done</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
