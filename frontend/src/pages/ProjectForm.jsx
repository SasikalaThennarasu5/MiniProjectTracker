import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'

/*
  ProjectForm: used for creating and editing projects (trainer only).
  Shows advanced Axios usage: GET for user list, POST/PUT for create/update.
*/
export default function ProjectForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [users,setUsers]=useState([])
  const [form,setForm]=useState({title:'',description:'',assigned_to_id:'',priority:'medium',status:'todo',due_date:''})
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    fetchUsers()
    if(id) fetchProject()
  },[])

  async function fetchUsers(){
    try{
      const res = await axios.get('/api/mini-projects/') // tiny cheat: get projects and extract users
      const usersArr = res.data.map(p=>p.assigned_to).filter((v,i,a)=>v && a.findIndex(x=>x.id===v.id)===i)
      setUsers(usersArr)
    }catch(err){}
  }

  async function fetchProject(){
    try{
      const res = await axios.get(`/api/mini-projects/${id}/`)
      const p = res.data
      setForm({...form, title:p.title, description:p.description, assigned_to_id:p.assigned_to.id, priority:p.priority, status:p.status, due_date:p.due_date || ''})
    }catch(err){}
  }

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      if(id){
        await axios.put(`/api/mini-projects/${id}/`, form)
      }else{
        await axios.post('/api/mini-projects/', form)
      }
      navigate('/trainer')
    }catch(err){}
    setLoading(false)
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Project':'Create Project'}</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full p-2 border rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
          <textarea className="w-full p-2 border rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <select className="w-full p-2 border rounded" value={form.assigned_to_id} onChange={e=>setForm({...form,assigned_to_id:e.target.value})} required>
            <option value="">Select Trainee</option>
            {users.map(u=> <option key={u.id} value={u.id}>{u.username}</option>)}
          </select>
          <div className="flex gap-2">
            <select className="p-2 border rounded" value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
            <select className="p-2 border rounded" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="todo">To Do</option><option value="inprogress">In Progress</option><option value="done">Done</option>
            </select>
            <input type="date" className="p-2 border rounded" value={form.due_date} onChange={e=>setForm({...form,due_date:e.target.value})} />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading? 'Saving...':'Save'}</button>
            <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
