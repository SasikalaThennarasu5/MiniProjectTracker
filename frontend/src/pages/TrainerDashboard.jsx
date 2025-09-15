import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { Link } from 'react-router-dom'

/*
  Trainer dashboard: lists all projects and allows deletion.
  Only trainer/admin (is_staff) should be able to create/delete via backend permissions.
*/
export default function TrainerDashboard(){
  const [projects,setProjects]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{ fetchProjects() },[])

  async function fetchProjects(){
    setLoading(true)
    try{
      const res = await axios.get('/api/mini-projects/')
      setProjects(res.data)
    }catch(err){}
    setLoading(false)
  }

  async function remove(id){
    if(!confirm('Delete this project?')) return
    try{
      await axios.delete(`/api/mini-projects/${id}/`)
      fetchProjects()
    }catch(err){}
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trainer Panel</h1>
        <div>
          <Link to="/project/new" className="mr-3 px-4 py-2 bg-indigo-600 text-white rounded">Create Project</Link>
          <button onClick={()=>{localStorage.removeItem('token');window.location.href='/login'}} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </header>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {projects.map(p=>(
            <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600">Assigned: {p.assigned_to.username} • {p.priority} • {p.status}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/project/edit/${p.id}`} className="px-3 py-1 bg-yellow-400 rounded">Edit</Link>
                <button onClick={()=>remove(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
