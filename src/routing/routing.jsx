import { Routes, Route } from 'react-router-dom'
import Login from '../page/login'
import Register from '../page/register'
import Home from '../page/home'

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/tasks' element={<Home />} />
            </Routes>
    </>
    )
}

export default Routing