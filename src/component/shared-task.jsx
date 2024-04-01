import { useTask } from "../context/task-context"

const Sharedtask = () => {

  const { sharedTasks } = useTask()

  return (
    <div className="w-full flex flex-col items-center gap-4 ">
      <div className="flex justify-center items-center rounded-2xl shadow-2xl bg-white py-3 px-3">
        <span className="text-2xl font-bold text-transparent bg-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-900 shadow-2xl">Sharedtask</span>
      </div>
      <div className="flex flex-col gap-4 px-2">
        {
          sharedTasks.length ? (sharedTasks.map((task) => {
            return (
              <div
                key={task._id}
                className="flex items-center justify-between bg-white shadow-2xl rounded-2xl gap-4 p-3">
                <div>
                  {task.task}
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                  </svg>
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