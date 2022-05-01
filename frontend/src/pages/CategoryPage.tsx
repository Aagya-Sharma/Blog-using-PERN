import ListItem from "../components/ListItem";
import MainSection from "../components/MainSection"
import { useEffect } from 'react'
import { useAppDispatch,useAppSelector } from "../app/hooks";
import { getBlogsWithCategory,reset } from '../features/category/categorySlice'
import { useParams } from 'react-router-dom'
import type { RootState } from '../app/store';

//for displaying the blogs of a particular category
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
        console.log(articles)
      }, [dispatch,categoryId])

      useEffect(() => {
        return () => {
          if (isSuccess) {
            dispatch(reset())
          }
        }
      }, [dispatch, isSuccess])
    
    return (
        <>
          {articles.map((article:any):any=> (
            <MainSection {...article}/>
          ))}
        </>
    )
}
 
export default CategoryPage;