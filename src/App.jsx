import './App.css'
import { Footer, AppAppBar } from './components/index.js'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './redux/userSlice.js';
import { useEffect } from 'react';
import { useLoadingContext } from './contexts/LoadingContext.jsx';
import { LinearProgress } from '@mui/material';

function App() {
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.currentUser?.user?.refreshToken)
  const accessToken = useSelector(state => state.currentUser?.accessToken)
 const backendURL = import.meta.env.VITE_BACKEND_URL
 const{isLoading}=useLoadingContext()
  useEffect(()=>{
  const refreshTheToken = async () => {
    try {
      const res = await axios.post(`${backendURL}/user/refresh-token`,
        { refreshToken: refreshToken },
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      dispatch(login(res.data.data.data))

    } catch (error) {
      dispatch(logout())
      throw error
    }

  }
  refreshTheToken();
},[])

  return (
    <div className=' flex flex-col'>
      <AppAppBar />
      {isLoading && <div>
      <LinearProgress />
      </div>}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
