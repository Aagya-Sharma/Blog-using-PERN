import "../css/Main.css"
import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import type { RootState, AppDispatch } from '../app/store';
import {getAllCategories} from "../features/category/categorySlice"
import {logout,reset} from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function ListItem (){
     //to get all the categories
    const {  categories,isLoading, isSuccess } = useAppSelector(
    (state:RootState) => state.categories
    )
    const dispatch = useAppDispatch();
        useEffect(() => {
            dispatch(getAllCategories())
        }, [dispatch])
    const {user }= useAppSelector((state)=>state.auth)
    const navigate = useNavigate();
    
    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const currentUser:any = localStorage.getItem('user')
    
    return (
    <>
       <nav className="topnav navbar navbar-expand-lg navbar-light bg-white fixed-top">
           {currentUser ? (
               <ul className="navbar-nav mr-auto d-flex align-items-center">
               <li className="nav-item">
               <button className="nav-link" onClick={onLogout}>Logout</button>
               </li>
               </ul>
               ):(
            <div className="container">
	        <Link className="navbar-brand" to={`/`}><strong>Arbyte Blog</strong></Link>
                {categories.map((category:any):any=> (
                <ul className="navbar-nav mr-auto d-flex align-items-center">
                <li className="nav-item">
                <Link to={`/category/${category.id}`} className='btn btn-reverse btn-sm'>
                {category.name}<span className="sr-only">(current)</span>
                </Link>
			</li>
            </ul>
          ))}
        <ul className="navbar-nav mr-auto d-flex align-items-center">
            <li className="nav-item">
			<Link className="nav-link" to ={`/login`}>Login</Link>
			</li>
            <li className="nav-item">
			<Link className="nav-link" to ={`/register`}>Register</Link>
		    </li>
        </ul>
        </div>
        )}
    </nav>
</>
    )}
 
export default ListItem;