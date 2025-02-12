import React, { Fragment,useEffect,useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import FaceIcon from "@material-ui/icons/Face"
import {useDispatch,useSelector} from "react-redux"
import { login,clearErrors, register } from '../../actions/userAction' 
import {useAlert} from "react-alert"
import Loader from '../layout/loader/Loader'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./LoginSignUp.css"
const LoginSignUp = () => {
 

 
    const dispatch=useDispatch();
    const location=useLocation();
    const history=useNavigate();
    console.log(location.search.split("=")[1])
    const redirect=location.search? location.search.split("=")[1]:"account";
    const alert=useAlert();
    const [loginEmail ,setLoginEmail]=useState("");
    const [loginPassword ,setLoginPassword]=useState("");
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png");
    
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const {name,email,password}=user; 
     const loginTab=useRef(null);
     const registerTab=useRef(null);
     const switcherTab=useRef(null);
      
     const{error,loading,isAuthenticated} =useSelector((state)=>state.user);
   
     useEffect(()=>{
         if(error){
            alert.error(error);
            dispatch(clearErrors());
         }
         if(isAuthenticated){
           history(`/${redirect}`)
          }
          console.log("authenticted");
        },[dispatch,error,alert,history,isAuthenticated,redirect])
        
     const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
        // history("/account")
        
       console.log(" login Form submitted");
     }

     const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        
        if(tab==="register"){
            switcherTab.current.classList.remove("shiftToNeutral")
            switcherTab.current.classList.add("shiftToRight")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
     };
     
     const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        }
        else{
          setUser({...user,[e.target.name]:e.target.value})
        }
     }
     const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm= new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm));
     }
 
  return (
   <Fragment>
     {loading ? <Loader/> : <Fragment>
    <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
            <div>
                <div className="login_signUp_toggle">
                    <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                   <MailOutlineIcon/>
                   <input
                     type='email'
                     placeholder='Email'
                     required
                     value={loginEmail}
                     onChange={(e)=>setLoginEmail(e.target.value)}
                   />
                </div>
                <div className='loginPassword'>
                   <LockOpenIcon/>
                   <input
                     type='password'
                     placeholder='Password'
                     required
                     value={loginPassword}
                     onChange={(e)=>setLoginPassword(e.target.value)}
                   />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type='submit' value="Login" className='LoginBtn'/>
            </form>
           
            <form className='signUpForm' ref={registerTab}  encType="multipart/form-data" onSubmit={registerSubmit} >
                <div className='signUpName'>
                   <FaceIcon/>
                   <input
                     type='text'
                     placeholder='Name'
                     required
                     name='name'
                     value={name}
                     onChange={registerDataChange}
                   />
                </div>
                <div className='signUpEmail'>
                   <MailOutlineIcon/>
                   <input
                     type='email'
                     placeholder='Email'
                     required
                     name="email"
                     value={email}
                     onChange={registerDataChange}
                   />
                </div>
                <div className='signUpPassword'>
                   <LockOpenIcon/>
                   <input
                     type='password'
                     placeholder='Password'
                     required
                     name="password"
                     value={password}
                     onChange={registerDataChange}
                   />
                </div>
                <div id='registerImage'>
                  <img src={avatarPreview} alt="Avatar Preview"/>
                  <input
                  type="file"
                  name="avatar"
                  accept='image/*'
                  onChange={registerDataChange}
                  />
                </div>
                <input type='submit' value="Register" className='signUpBtn' />
            </form>
           
                


        </div>
    </div>
</Fragment>}
   </Fragment>
  )
}

export default LoginSignUp