import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { logout } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../contexts/LoadingContext';

export default function UserProfile({ imgSrc  }) {
  const userImg = useSelector(state=>state.currentUser?.user?.avatar)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const accessToken = useSelector(state => state.currentUser?.accessToken)
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const {setIsLoading}=useLoadingContext()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      setIsLoading(true)
      await axios.get(`${backendURL}/user/logout`, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      dispatch(logout())
      navigate('/')

    } catch (error) {
      console.log("Error in logout", error)
    }
    finally{
      setIsLoading(false)
    }
  }


  return (
    <div>
      <Avatar
        alt="Remy Sharp"
        src={imgSrc || userImg}
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
