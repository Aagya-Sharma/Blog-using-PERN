import ListItem from "../components/ListItem";
import MainSection from "../components/MainSection"
import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { getAllBlogs } from '../features/blogs/blogSlice'
import type { RootState, AppDispatch } from '../app/store';


function Home (){

  //to get all the blogs
    const {  blogs,isLoading, isSuccess } = useAppSelector(
      (state:RootState) => state.blogs
    )
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllBlogs())
      }, [dispatch])
    
    console.log(blogs)
    return (
        <>
         <ListItem/>
       {blogs.map((article:any):any=> (
          <MainSection {...article}/>
        ))}
        </>
    )

}
 
export default Home;