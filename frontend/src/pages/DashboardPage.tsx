import ListItem from "../components/ListItem";
import MainSection from "../components/MainSection"
import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { getAllBlogs,getBlogs } from '../features/blogs/blogSlice'
import type { RootState, AppDispatch } from '../app/store';


function DashboardPage (){

  //to get all the blogs of the user
    const {  blogs,isLoading, isSuccess } = useAppSelector(
      (state:RootState) => state.blogs
    )
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
      console.log(blogs)
    
    return (
        <> 
        {blogs.map((article:any):any=> (
            <MainSection {...article}/>
          ))}
        </>
    )
}
 
export default DashboardPage;