import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { register,reset } from "../features/auth/authSlice";
import type { RootState, AppDispatch } from '../app/store';
import "../css/Login.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 


function Register (){
   const {  user,isLoading, isSuccess,isError,message } = useAppSelector(
      (state:RootState) => state.auth
    )
    const [formData, setFormData] = useState({
      username: '',
      useremail: '',
      password: '',
      cpassword: '',
    })
  
    const { username, useremail, password, cpassword } = formData

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (isError) {
      toast.error(message)
      }
      if(isSuccess){
        navigate('/login')
      }
      dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])
   
    const onChange = (e:any) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
    const onSubmit = (e:any) => {
      e.preventDefault()
  
      if (password !== cpassword) {
        toast('Passwords do not match')
        console.log('password do not match')
      } else {
        const userData = {
          username,
          useremail,
          password,
          cpassword
        }
  
        dispatch(register(userData))
      }
    }
   return(
      <form onSubmit={onSubmit}>
         <div className="main">
            <div className="material-button alt-2"><span className="shape"></span></div>
            <div className="sign">REGISTER</div>
                  <input type="text" name="username" id="username" className="un" value={username} placeholder="username"onChange={onChange}/>
                  <input type="text" name="useremail" id="useremail" value={useremail} className="un" placeholder="useremail"onChange={onChange}/>
                  <input type="password" name="password" id="password"value={password} className="pass" placeholder="password" onChange={onChange}/>
                  <input type="password" name="cpassword" id="cpassword"value={cpassword} className='pass' placeholder='confirm password' onChange={onChange}/>
                  <button className='submit'><span>NEXT</span></button>
            </div>
      </form>
    )}
export default Register;