import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { login,reset} from "../features/auth/authSlice";
import type { RootState, AppDispatch } from '../app/store';
import "../css/Login.css"
import { useNavigate } from 'react-router-dom'


function Login (){
   const {  user,isLoading, isSuccess,isError,message } = useAppSelector(
      (state:RootState) => state.auth
    )
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [useremail,setUseremail] = useState('')

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const onSubmit =(e:any)=>{
      e.preventDefault()
      dispatch(login({useremail,password}))
   }

   useEffect(() => {
      if (isError) {
      <h1>{message}</h1>
      }
      if(isSuccess){
      navigate('/dashboard')
      }
      dispatch(reset())
       }, [isError, isSuccess, user, message, navigate, dispatch])
   return (
   <>
      <div className="main">
         <div className="box">
            <div className="sign">LOGIN</div>
               <form onSubmit={onSubmit}>
                     <input type="text" className="un" name="useremail" id="useremail" placeholder='userEmail' onChange={(e)=>setUseremail(e.target.value)}/>
                     <input type="password" name="password" className="pass"  placeholder="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                     <button className='submit'><span>Login</span> <i className="fa fa-check"></i></button><br></br>
                     <a href="" className="forgot">Forget your password?</a>
               </form>
            </div>
         </div>
        </>
      )
}
 
export default Login;