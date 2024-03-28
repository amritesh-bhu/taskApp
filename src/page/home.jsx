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
        console.log(crtasks)
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

  // const deleteTask = async (task) =>{
  //   try{
  //     const delitem = await httpClient.delete(`/user/task/${task._id}`)

  //   }catch(err){
  //     console.log(err)
  //   }
  // }

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
    <TaskProvider value={{ tasks, addTask }}>
      <div className='w-full h-full bg-slate-100 flex flex-col gap-6'>
        <Nav handleUserLogout={handleUserLogout} />
        <Inputfield />
        <Tasklist />
      </div>
    </TaskProvider>

  )
}

export default Home