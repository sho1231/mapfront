import React,{useState,useRef} from 'react'
import RoomIcon from "@material-ui/icons/Room";
import axios from 'axios';
import Cancel from '@material-ui/icons/Cancel';
import "./register.css"


export default function Register({setShowRegister}) {
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const usernameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const User={
            username:usernameRef.current.value,
            email:emailRef.current.value,
            pass:passwordRef.current.value,
        };
        try{
            await axios.post("/api/users/register",User);
            setError(false);
            setSuccess(true);
        }
        catch(e){
            setError(true);
        }
    }
  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon className="logoIcon"/>
        <span>Zen Maps</span>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input autofocus placeholder="Enter username" ref={usernameRef}/>
        <input type="email" placeholder="Enter email" ref={emailRef}/>
        <input type="password" placeholder="Enter password" ref={passwordRef}/>
        <button className="registerBtn" type="submit">Register</button>
        {success&&(
            <span className="success">Success</span>
        )}
        {error&&(
            <span className="failure">Something went wrong</span>
        )}
        <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>
      </form>
    </div>
  )
}
