// eslint-disable-next-line react/prop-types
const Edittask = ({ changeTask, editTask, setEditTask, editMode, setEditMode }) => {
    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg flex flex-col gap-4 justify-center">
                <div className="flex justify-end">
                    <svg onClick={()=> setEditMode(!editMode)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-3">
                    <span className="text-md font-semibold text-slate-900">are you Sure, You want to rename the task ?</span>
                    <form className="flex flex-col gap-4" onSubmit={changeTask}>
                        <div className="flex items-center justify-center rounded-full shadow-lg focus-within:ring-2 ring-1 bg-white px-2 py-3 gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-indigo-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                            <input
                                id="task"
                                name="task"
                                className="placeholder:text-slate-500 block outline-none"
                                type="text"
                                placeholder="Edit your task"
                                value={editTask}
                                onChange={(e) => setEditTask(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-white justify-center rounded-full">
                            <button
                                id="taskbtn"
                                name="taskbtn"
                                className="text-white font-bold rounded-full shadow-xl bg-gradient-to-r from-indigo-500 to-indigo-900 p-3"
                                type="submit"
                            >Edit Task </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edittask