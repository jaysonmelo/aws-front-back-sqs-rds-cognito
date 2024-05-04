import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { logout } from './authenticate';

const Home = (props) => {
  const { loggedIn, usuario } = props
  const navigate = useNavigate()
  let hidden = "hidden";
  if (localStorage.getItem('username') !== null) {
    hidden = "";
  }
  const handleLogoout=()=>{
    logout();
  };

  return (
    <div>
      <div>
        <label>Welcome, {localStorage.getItem('username')}</label>
      </div>
      <label>This is the home page.</label>
      <div>
      <Button hidden={hidden}
        style={{margin:"10px"}}
        variant='contained'
        onClick={handleLogoout}
      >
        Logout
      </Button>
        {loggedIn ? <div>Your user is {usuario}</div> : <div />}
      </div>
    </div>
  )
}

export default Home