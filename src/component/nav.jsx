import { useState } from "react"
import { useTask } from "../context/task-context"
import { Listnotification } from "./list-notification"

// eslint-disable-next-line react/prop-types
const Nav = ({ handleUserLogout }) => {
    const [showLogout, setLogout] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [showReq, setShowReq] = useState(false)

    const { actionReq } = useTask()
    const handlePopup = () => {
        setLogout(!showLogout)
    }

    return (
        <div className="w-full static bg-white shadow-2xl flex items-center justify-between gap-4 px-4 py-2">
            <div><span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-900">Hello Sample</span></div>
            <div className="flex items-center justify-end gap-4">

                <div className="relative">
                    <svg onClick={() => setShowReq(!showReq)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:stroke-2 stroke-slate-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    {
                        actionReq.length != 0 && (
                            <div className="px-2 bg-indigo-500 rounded-full text-center text-white text-sm absolute -top-2 -end-2">
                                {actionReq.length}
                            </div>
                        )
                    }

                </div>
                <svg onClick={handlePopup} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 hover:stroke-2 stroke-slate-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {
                    showLogout && (
                        <div className="absolute top-14 transition-transform ease-out delay-500 duration-300 right-5 bg-white flex justify-center items-center px-2 py-2 gap-2 mr-2 rounded-md">
                            <button onClick={handleUserLogout}>Logout</button>
                        </div>)

                }

                {
                    showReq && (
                        <Listnotification
                            showReq={showReq}
                            setShowReq={setShowReq}
                        />
                    )
                }

            </div>

        </div>
    )
}

export default Nav