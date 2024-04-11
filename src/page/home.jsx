/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import Inputfield from '../component/input-field'
import Nav from '../component/nav'
import { httpClient } from '../lib/http-client'
import { useNavigate } from 'react-router-dom'
import { TaskProvider } from '../context/task-context'
import Tasklist from '../component/task-list'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const [tasks, setTasks] = useState([])
  const [sharedTasks, setSharedTasks] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const checkSession = async () => {
      try {
        const res = await httpClient.get('/auth/user/me')
        if (!res) {
          navigate('/')
        }
      } catch (err) {
        navigate('/')
      }
    }
    checkSession()

    const fetchTasks = async () => {
      try {
        const res = await httpClient.get('/user/task')
        setTasks(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTasks()

    const fetchSharedTasks = async () => {
      try {
        const res = await httpClient.get('/rbac/tasks')
        const ids = res.data?.map((id) => id.resourceId)
        console.log(ids)
        const items = await httpClient.post('/user/task/taskbyid', { ids: ids })
        console.log(items.data)
        setSharedTasks(items.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSharedTasks()
  }, [])

  // const notifyError = (msg) => {
  //   toast.error(msg, { position: 'top-center', autoClose: 2000 })
  // }

  const notifySuccess = (msg) => {
    toast.success(msg, { position: 'bottom-left', autoClose: 2000 })
  }

  const addTask = async (task) => {
    try {
      console.log(task)
      const res = await httpClient.post('/user/task/newtask', { value: task })
      console.log('newTask', res)
      setTasks([...tasks, res.data])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (task) => {
    try {
      const res = await httpClient.delete(`/user/task/${task._id}`)
      console.log('item', res.data)
      const newtasks = tasks.filter((ele) => ele._id !== task._id)
      setTasks(newtasks)

      const sharedres = await httpClient.delete(`/rbac/tasks/${task._id}`)
      if (!sharedres) {
        const newSharedTasks = sharedTasks.filter((ele) => ele._id !== task._id)

        notifySuccess('deleted successfully!')

        setSharedTasks(newSharedTasks)
     }

    } catch (err) {
      console.log(err)
    }
  }

  const modifyTask = async (value, id) => {
    try {
      const res = await httpClient.put('/user/task/updatetask', { value: value, id: id })
      console.log('updated task', res)
      const { task } = res.data[0]
      console.log(task)
      const updatedtasks = tasks.map((ele) => ele._id == id ? { ...ele, task: task } : ele)
      console.log(updatedtasks)
      setTasks(updatedtasks)
    } catch (err) {
      console.log(err)
    }
  }

  const shareTask = async (email, resourceId, actions) => {
    try {
      const res = await httpClient.post('/rbac/tasks/rolebinding', { userEmail: email, resourceId, actions: actions })
      console.log(res.data)
      notifySuccess(res.data.msg)

    } catch (err) {
      console.log(err)
    }
  }

  const deleteTaskByUser = async (task) => {
    try {
      const canI = await httpClient.post('rbac/tasks', { resourceId: task._id, actions: task.action })
      console.log(canI.data)


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
    <TaskProvider value={{ tasks, sharedTasks, addTask, deleteTask, modifyTask, shareTask, deleteTaskByUser }}>
      <ToastContainer />
      <div className='w-full h-full bg-slate-100 flex flex-col gap-6'>
        <Nav handleUserLogout={handleUserLogout} />
        <Inputfield />
        <Tasklist />
      </div>
    </TaskProvider>

  )
}

export default Home