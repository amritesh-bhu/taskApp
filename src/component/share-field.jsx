import { useState } from "react"
import { useTask } from "../context/task-context"

// eslint-disable-next-line react/prop-types
const Sharemode = ({taskId, shareMode, setShareMode }) => {

    const [email, setEmail] = useState('')
    const [actions, setActions] = useState([])

    const {shareTask} = useTask()

    const handleSubmit = (e) => {
        e.preventDefault()
        shareTask(email,taskId,actions)
        setEmail('')
        setShareMode(!shareMode)
    }



    return (
        <div className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white flex flex-col justify-center gap-4">
                <div className="flex justify-end">
                    <svg onClick={() => setShareMode(!shareMode)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-3">
                    <span className="text-slate-500 font-semibold text-lg">are you sure, You want to share ?</span>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex items-center justify-center rounded-full shadow-lg focus-within:ring-2 ring-1 bg-white px-2 py-3 gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-indigo-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <input
                                placeholder="Provide the email"
                                className="placeholder:text-slate-400 block outline-none"
                                id="sm"
                                name="sharemode"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-500 font-semibold text-lg">
                                Actions
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    className="checked:bg-indigo-500"
                                    type="checkbox"
                                    value='edit'
                                    onChange={(e) => setActions([...actions, e.target.value])}
                                />
                                <label className="text-slate-500 font-medium text-sm">Edit</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    type="checkbox"
                                    value='delete'
                                    onChange={(e) => setActions([...actions, e.target.value])}
                                />
                                <label className="text-slate-500 font-medium text-sm">Delete</label>
                            </div>
                        </div>
                        <div className="flex justify-center items-center rounded-full">
                            <button className="bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-bold rounded-full shadow-xl px-4 py-2">
                                Share
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Sharemode