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
  const [actionReq, setActionReq] = useState([])

  const navigate = useNavigate()

  const [ws, setWs] = useState(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await httpClient.get('/auth/user/me')
        console.log('login', res.data)
        if (res) {
          navigate('/tasks')
        }
      } catch (err) {
        navigate('/')
        console.log(err, 'Please login!')
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5005')

    socket.onopen = () => {
      console.log('connected')
      socket.send("hi there")
      setWs(socket)

    }

    socket.onmessage = (msg) => {
      const pmsg = JSON.parse(msg.data)
      switch (pmsg.type) {
        case 'new task':
          notifyInfo('New Task added !')
          console.log(tasks)
          setTasks((prev) => [pmsg.item, ...prev])
          break
        default :
          notifyInfo(msg.data)
          break
      }
    }

    // socket.onclose = () => {
    //   console.log('disconnected')
    // }

    return () => {
      if (socket) {
        console.log("closing")
        socket.close()
      }
      setWs(null)
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await httpClient.get('/user/task')
        setTasks(res.data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await httpClient.get('/rbac/tasks')
        const ids = res.data?.map((id) => id.resourceId)
        const items = await httpClient.post('/user/task/taskbyid', { ids: ids })
        setSharedTasks(items.data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const userReqs = await httpClient.get('/action/requests/listrqsts')
        console.log('user req', userReqs.data)
        setActionReq(userReqs.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])


  const notifyInfo = (msg) => {
    toast.info(msg, { position: 'top-center', autoClose: 2000 })
  }

  const notifyError = (msg) => {
    toast.error(msg, { position: 'top-center', autoClose: 2000 })
  }

  // useEffect(() => {
  //   if (ws) {
  //     ws.send("hi from client")
  //   }
  // }, [ws])

  const notifySuccess = (msg) => {
    toast.success(msg, { position: 'bottom-left', autoClose: 2000 })
  }

  const addTask = async (task) => {
    try {
      console.log(task)
      const res = await httpClient.post('/user/task/newtask', { value: task })
      console.log('newTask', res)
      setTasks([res.data, ...tasks])
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (task) => {
    try {
      console.log('user', task)
      const res = await httpClient.delete(`/user/task/${task._id}`)
      console.log('item', res.data)
      const newtasks = tasks.filter((ele) => ele._id !== task._id)
      setTasks(newtasks)

      const sharedres = await httpClient.delete(`/rbac/tasks/${task._id}`)
      console.log('hey', sharedres)
      if (sharedres.data) {
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
      console.log(res.data.resourceId)
      notifySuccess(res.data.msg)

      const newSharedTask = await httpClient.post('/user/task/taskbyid', { ids: [res.resourceId], userEmail: res.userEmail })
      console.log(newSharedTask)
    } catch (err) {
      console.log(err)
    }
  }

  // const deleteTaskByUser = async (task) => {
  //   try {
  //     const canI = await httpClient.post('rbac/tasks', { resourceId: task._id, actions: task.action })
  //     console.log(canI.data)


  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleUserLogout = async () => {
    try {
      const userSession = await httpClient.delete('/auth/user/logout')
      console.log(userSession)
      ws.onclose = () => {
        console.log('disconnected')
      }
      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <TaskProvider value={{ tasks, sharedTasks, actionReq, addTask, deleteTask, modifyTask, shareTask, setSharedTasks, setActionReq }}>
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