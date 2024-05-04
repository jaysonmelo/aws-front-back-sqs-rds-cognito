import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
    const [ usuario ] = useState('')
    const { loggedIn } = props
    const navigate = useNavigate()
  
    const handleSearch = () => {
          navigate("/productsList")
    }

    return (
      <div className="mainContainer">
        <div className={'titleContainer'}>
          <div>Products!</div>
        </div>
        <div>Search your products.</div>
        <div className={'inputContainer'}>
        <input 
          className={'inputBox'}
          type = "search" 
          placeholder = "Search Products" 
        />
        </div>
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={handleSearch} value={'Search'} />
        </div>
      </div>
    )
  }
  
  export default Dashboard