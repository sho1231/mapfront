import React,{useState,useRef} from 'react'
import RoomIcon from "@material-ui/icons/Room";
import axios from 'axios';
import Cancel from '@material-ui/icons/Cancel';
import "./register.css"


export default function Register({setShowRegister}) {
    const [wait, setWait] = useState(false);
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
        setSuccess(false);
        setError(false);
        setWait(true);
        try{
            await axios.post("https://pinplace.onrender.com/api/users/register",User);
            setError(false);
            setSuccess(true);
            
        }
        catch(e){
          setSuccess(false);
          setError(true);
        }
        finally{
          setWait(false);
        }
    }
  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon className="logoIcon"/>
        <span>Zen Maps</span>
      </div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Username:</label>
        <input autoFocus style={{marginBottom:"15px"}} placeholder="Enter username" ref={usernameRef}/>
        <label>Email:</label>
        <input type="email" style={{marginBottom:"15px"}} placeholder="Enter email" ref={emailRef}/>
        <label>Password:</label>
        <input type="password" style={{marginBottom:"15px"}} placeholder="Enter password" ref={passwordRef}/>
        
        <button className="registerBtn" type="submit">Register</button>
        {wait&&<span>
          Please wait....
        </span>}
        {success&&(
            <span className="success">Success</span>
        )}
        {error&&(
            <span className="failure text-danger">Something went wrong</span>
        )}
        <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}/>
      </form>
    </div>
  )
}
