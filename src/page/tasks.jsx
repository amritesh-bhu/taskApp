import { httpClient } from '../lib/http-client'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const navigate = useNavigate()
  const handleUserLogout = async () => {
    try {
      const userSession = await httpClient.delete('/auth/user/logout')
      console.log(userSession)
      setTimeout(() => {
        navigate('/')
      }, 5000);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <button onClick={handleUserLogout}>
        Logout
      </button>
    </div>
  )
}

export default Tasks