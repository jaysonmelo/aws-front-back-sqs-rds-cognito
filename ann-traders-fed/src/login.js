import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authenticate } from './authenticate'

const Login = (props) => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [usuarioError, setUsuarioError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginErr,setLoginErr]=useState('');

  const Navigate = useNavigate()

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (usuario === '' && password === '') {
        setUsuarioError("Usuario is Required");
        setPasswordError("Password is required")
        resolve({ email: "Usuario is Required", password: "Password is required" });
      }
      else if (usuario === '') {
        setUsuarioError("Usuario is Required")
        resolve({ usuario: "Usuario is Required", password: "" });
      }
      else if (password === '') {
        setPasswordError("Password is required")
        resolve({ usuario: "", password: "Password is required" });
      }
      else if (password.length < 8) {
        setPasswordError("must be 6 character")
        resolve({ usuario: "", password: "must be 8 character" });
      }
      else {
        resolve({ usuario: "", password: "" });
      }
    });
  }

  const handleClick = () => {
    setUsuarioError("");
    setPasswordError("");
    validation()
      .then((res) => {
        if (res.usuario === '' && res.password === '') {
          authenticate(usuario,password)
          .then((data)=>{
            setLoginErr('');
            Navigate('/');
          },(err)=>{
            console.log(err);
            setLoginErr(err.message)
          })
          .catch(err=>console.log(err))
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div>
        <label>Login</label>
      </div>
      <br />
      
      <div>
        <input 
          value={usuario}
          placeholder="Enter your user here"
          onChange={(ev) => setUsuario(ev.target.value)}
          className={'form-control'}
        />
        <label className="errorLabel">{usuarioError}</label>
      </div>
      <br />
      <div>
        <input 
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'form-control'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div>
        <input className={'btn btn-primary'} type="button" onClick={handleClick} value={'Log in'} />
      </div>
      <Typography variant="body">{loginErr}</Typography>
    </div>
  )
}

export default Login