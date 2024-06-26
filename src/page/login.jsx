import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { httpClient } from "../lib/http-client"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
// import { AuthProvider } from "../context/auth-context";

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await httpClient.get('/auth/user/me')
                console.log('login', res.data)
                if (res) {
                    navigate('/tasks')
                }
            } catch (err) {
                console.log(err, 'Please login!')
            }
        }
        checkSession()
    }, [])


    
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const notifyError = (msg) => {
        toast.error(msg, { position: 'top-center', autoClose: 2000 })
    }
    const notifySuccess = (msg) => {
        toast.success(msg, { position: 'bottom-left', autoClose: 2000 })
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault()
            if (!user?.email) {
                notifyError('Email and Password is required!')
            } else if (!user?.password) {
                notifyError('Email and password is required!')
            } else {
                const userAuth = await httpClient.post('/auth/user/login', user)
                notifySuccess(userAuth.data.msg)
                setTimeout(() => {
                    navigate('/tasks')
                }, 2000);
            }
        } catch (err) {
            notifyError(err.response.data.error)
            console.log(err)
        }
    }

    return (
        // <AuthProvider value={{showPassword,handleShowPassword,notifyError,notifySuccess}}>
        <div className="w-2/3 h-2/3 flex justify-center items-center shadow-2xl rounded-md sm:w-2/3 h-2/3">
            <ToastContainer />
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-l-lg flex flex-col  justify-center">

                <span className="text-4xl font-bold text-white ml-10">Welcome Back!</span>
                <span className="font-medium text-slate-100 ml-10 mr-10 mt-4 text-wrap">Please login to manage your tasks here , your tasks might be waiting for you to get complete and start.</span>

            </div>
            <div className="w-full h-full bg-white rounded-r-lg flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-black">Hello!</span>
                <span className="font-medium text-slate-700 mt-2 mb-4">Sign in to your account</span>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 w-full rounded-full shadow-2xl py-3 px-3 focus-within:ring-2 ring-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                        <input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="E-mail"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="placeholder:text-slate-400 block outline-none"
                        />

                    </div>
                    <div className="flex flex-col gap-2">

                        <div className="flex justify-between items-center bg-white w-full rounded-full shadow-2xl group focus-within:ring-2 ring-1 py-3 px-3">
                            <div className="flex items-center gap-3 ">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>


                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="placeholder:text-slate-400 block outline-none"
                                />
                            </div>
                            <div>
                                {
                                    showPassword ? (
                                        <svg onClick={handleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        <svg onClick={handleShowPassword} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )
                                }
                            </div>

                        </div>
                        <div className="flex items-center justify-between px-3">

                            <div className="flex items-center justify-center gap-1">
                                <input className="h-4 w-4" type="checkbox" />
                                <span className="text-slate-400 text-sm">Remember me</span>
                            </div>
                            <div>
                                <span className="text-slate-400 text-sm">Forgot Password?</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <button type="submit" className="text-white font-medium rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 py-3 px-12 shadow-2xl">
                            Log in
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <span className="text-slate-400 text-sm">
                            {" Don't have an account?"}
                        </span>
                        <nav>
                            <Link to="/signup">
                                <span className="text-indigo-700 text-sm font-medium">
                                    Create
                                </span>
                            </Link>
                        </nav>
                    </div>
                </form>
            </div>

        </div>
        // </AuthProvider> 
    )
}

export default Login