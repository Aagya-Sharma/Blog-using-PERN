import ListItem from "../components/ListItem";
import MainSection from "../components/MainSection"
import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { getAllCategories,getBlogsWithCategory } from '../features/category/categorySlice'
import { useParams, useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../app/store';


function CategoryPage (){
  const params = useParams()
  const { categoryId } = useParams()
  
  //to get all the blogs belonging to the category
    const { articles,isLoading, isSuccess } = useAppSelector(
      (state:RootState) => state.categories
    )
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBlogsWithCategory(categoryId))
      }, [dispatch])
    console.log(articles)
    return (
        <>
        <ListItem/>
        {articles.map((article:any):any=> (
          <MainSection {...article}/>
        ))}
        </>
    )

}
 
export default CategoryPage;