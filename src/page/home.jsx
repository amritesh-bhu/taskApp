import { useState } from 'react'
import Inputfield from '../component/input-field'
import Nav from '../component/nav'
import { httpClient } from '../lib/http-client'
import { useNavigate } from 'react-router-dom'
import { TaskProvider } from '../context/task-context'
import Tasklist from '../component/task-list'
import { useEffect } from 'react'

const Home = () => {
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const crtasks = await httpClient.get('/user/task')
        setTasks(crtasks.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTasks()
  }, [])

  const addTask = async (task) => {
    try {
      console.log(task)
      const newtask = await httpClient.post('/user/task/newtask', { value: task })
      console.log('newTask', newtask)
      setTasks([...tasks, newtask.data])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (task) => {
    try {
      const delitem = await httpClient.delete(`/user/task/${task._id}`)
      console.log('item', delitem.data)
      const newtasks = tasks.filter((ele) => ele._id !== task._id)
      setTasks(newtasks)
    } catch (err) {
      console.log(err)
    }
  }

  const modifyTask = async (value, id) => {
    try {
      const updatedTask = await httpClient.put('/user/task/updatetask', { value: value, id: id })
      console.log('updated task',updatedTask)
      const { task } = updatedTask.data[0]
      console.log(task)
      const updatedtasks = tasks.map((ele) => ele._id == id ? { ...ele, task: task } : ele)
      console.log(updatedtasks)
      setTasks(updatedtasks)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUserLogout = async () => {
    try {
      const userSession = await httpClient.delete('/auth/user/logout')
      console.log(userSession)
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <TaskProvider value={{ tasks, addTask, deleteTask, modifyTask }}>
      <div className='w-full h-full bg-slate-100 flex flex-col gap-6'>
        <Nav handleUserLogout={handleUserLogout} />
        <Inputfield />
        <Tasklist />
      </div>
    </TaskProvider>

  )
}

export default Home