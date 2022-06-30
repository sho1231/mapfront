import React,{useState,useRef} from 'react'
import RoomIcon from "@material-ui/icons/Room";
import axios from 'axios'
import Cancel from '@material-ui/icons/Cancel';
import './login.css'


export default function Login({setShowLogin,setCurrentUsername,myStorage}) {
    const [error,setError]=useState(false);
    const usernameRef=useRef();
    const passwordRef=useRef();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const User={
            username:usernameRef.current.value,
            pass:passwordRef.current.value,
        };
        try{
           const res= await axios.post("/api/users/login",User);
           setCurrentUsername(res.data.username);
           myStorage.setItem("user",res.data.username);
           setShowLogin(false);
        }
        catch(e){
            setError(true);
        }
    }
  return (
    <div className="loginContainer">
      <div className="logo">
        <RoomIcon className="logoIcon"/>
        <span>Zen Maps</span>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input autofocus placeholder="Enter username" ref={usernameRef}/>
        
        <input type="password" placeholder="Enter password" ref={passwordRef}/>
        <button className="loginBtn" type="submit">Login</button>
        
        {error&&(
            <span className="failure">Something went wrong</span>
        )}
        <Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
      </form>
    </div>
  )
}
