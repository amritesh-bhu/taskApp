import { useTask } from "../context/task-context"
import { useState } from "react"
import Edittask from "./edit-field"
import Sharemode from "./share-field"

const Usertask = () => {
  const [editMode, setEditMode] = useState(false)
  const [editTask, setEditTask] = useState('')
  const [taskId, setTaskId] = useState(-1)
  const [shareMode, setShareMode] = useState(false)

  const { tasks, deleteTask, modifyTask } = useTask()

  const changeTask = (e) => {
    e.preventDefault()
    modifyTask(editTask, taskId)
    setEditTask('')
    setEditMode(!editMode)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex items-center bg-white shadow-2xl rounded-2xl py-3 px-3">
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-900">Task created by you</span>
      </div>
      <div className="h-full flex flex-col gap-4 px-2">
        {
          tasks.length ? (tasks.map((task) => {
            return (
              <div className="flex justify-between bg-white px-3 py-3 rounded-2xl shadow-2xl gap-4" key={task._id}>
                <div>{task.task}</div>
                <div className="flex gap-2">
                  <svg onClick={() => {
                    setEditMode(!editMode)
                    setTaskId(task._id)
                    setEditTask(task.task)
                  }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
                  <svg onClick={() => {
                    setTaskId(task._id)
                    setShareMode(!shareMode)
                  }}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                  <svg onClick={() => deleteTask(task)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
                {
                  editMode && task._id == taskId && (
                    <Edittask
                      changeTask={changeTask}
                      editTask={editTask}
                      setEditTask={setEditTask}
                      editMode={editMode}
                      setEditMode={setEditMode}
                    />
                  )
                }
                {
                  shareMode && task._id == taskId && (
                    <Sharemode
                      taskId={taskId}
                      shareMode={shareMode}
                      setShareMode={setShareMode}
                    />
                  )
                }
              </div>
            )
          })) : (
            <div className="flex justify-center items-center">
              <span>Nothing to show</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Usertask