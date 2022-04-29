import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { register,reset } from "../features/auth/authSlice";
import type { RootState, AppDispatch } from '../app/store';
import "../css/Login.css"
import { useNavigate } from 'react-router-dom'

function Register (){
   const {  user,isLoading, isSuccess,isError,message } = useAppSelector(
      (state:RootState) => state.auth
    )
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [useremail,setUseremail] = useState('')
    const [cpassword,setCpassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (isError) {
        <h1>{message}</h1>
      }
      dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])
   
    const onSubmit =(e:any)=>{
      e.preventDefault()
      dispatch(register({useremail,password,username,cpassword}))
      console.log(user)

  }
   return(
      <form onSubmit={onSubmit}>
         <div className="main">
            <div className="material-button alt-2"><span className="shape"></span></div>
            <div className="sign">REGISTER</div>
                  <input type="text" name="username" id="username" className="un" placeholder="username"onChange={(e)=>setUsername(e.target.value)}/>
                  <input type="text" name="useremail" id="useremail"  className="un" placeholder="useremail"onChange={(e)=>setUseremail(e.target.value)}/>
                  <input type="password" name="password" id="password" className="pass" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                  <input type="password" name="cpassword" id="cpassword" className='pass' placeholder='confirm password' onChange={(e)=>setCpassword(e.target.value)}/>
                  <button className='submit'><span>NEXT</span></button>
            </div>
      </form>
    )}
export default Register;