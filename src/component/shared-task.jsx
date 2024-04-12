import { useState } from "react"
import { useTask } from "../context/task-context"
import { httpClient } from "../lib/http-client"
import Edittask from "./edit-field"

const Sharedtask = () => {

  const [editMode, setEditMode] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [taskId, setTaskId] = useState(-1)
  const [editTask, setEditTask] = useState('')
  const [action, setAction] = useState('')

  const { sharedTasks, setSharedTasks, deleteTask, modifyTask } = useTask()

  const editTaskByUser = async (e) => {
    e.preventDefault()
    const resEdit = await httpClient.post('/rbac/tasks/cani', { resourceId: taskId, actions: action })
    console.log('useredit', resEdit.data)
    if (resEdit.data) {
      const newtasks = sharedTasks.map((ele) => ele._id == taskId ? { ...ele, task: editTask } : ele)
      setSharedTasks(newtasks)
      modifyTask(editTask, taskId)
      setEditTask('')
      setTaskId(-1)
    }
    setEditMode(!editMode)
  }

  const deleteTaskByUser = async (id) => {
    try {
      console.log(id)
      const resCanI = await httpClient.post('rbac/tasks/cani', { resourceId: id, actions: 'delete' })
      console.log('byUser', resCanI.data)
      if (resCanI.data) {
        deleteTask({ _id: id })
        setTaskId(-1)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 ">
      <div className="flex justify-center items-center rounded-2xl shadow-2xl bg-white py-3 px-3">
        <span className="text-2xl font-bold text-transparent bg-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-900 shadow-2xl">Sharedtask</span>
      </div>
      <div className="flex flex-col gap-4 px-2">
        {
          sharedTasks.length ? (sharedTasks.map((task) => {
            return (
              <div key={task._id} className="flex items-center justify-between bg-white shadow-2xl rounded-2xl gap-4 p-3">
                <div>{task.task}</div>
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <svg onClick={() => {
                      setEditTask(task.task)
                      setTaskId(task._id)
                      setAction('edit')
                      setEditMode(!editMode)
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </div>
                  <div>
                    <svg onClick={() => deleteTaskByUser(task._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                  <div>
                    <svg onClick={() => {
                      setToggleMenu(!toggleMenu)
                      setTaskId(task._id)
                    }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </div>
                  {
                    toggleMenu && task._id == taskId && (
                      <div className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
                        <div className="flex flex-col justify-center p-2 bg-white rounded-md gap-4">
                          <div className="flex justify-end">
                            <svg onClick={() => setToggleMenu(!toggleMenu)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold ">Request for action</span>
                          </div>
                          <div className="flex justify-center gap-2">
                            <div className="bg-white flex gap-2 px-2 shadow-2xl rounded-2xl">
                              <input type="checkbox" />
                              <label>Edit</label>
                            </div>
                            <div className="bg-white flex gap-2 px-2 shadow-2xl rounded-2xl">
                              <input type="checkbox" />
                              <label>Delete</label>
                            </div>
                          </div>
                          <div className="shadow-2xl rounded-2xl px-2 flex justify-center items-center">
                            <button className="text-white text-sm font-semibold bg-gradient-to-r from-indigo-500 to-indigo-900 shadow-2xl rounded-2xl p-2">Delete</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    editMode && task._id == taskId && (
                      <Edittask
                        changeTask={editTaskByUser}
                        editTask={editTask}
                        setEditTask={setEditTask}
                        editMode={editMode}
                        setEditMode={setEditMode}
                      />
                    )
                  }
                </div>
              </div>
            )
          })) : (
            <div>Nothing to show</div>
          )
        }
      </div>
    </div>
  )
}

export default Sharedtask