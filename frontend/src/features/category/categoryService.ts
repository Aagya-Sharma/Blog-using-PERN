import axios from "axios";

const API_URL = "http://localhost:5000/api/category";

// Get all the categories
const getAllCategories = async () => {
  const response = await axios.get(API_URL + "/getAllCategory");
  return response.data;
};

//get all the blogs of a category
const getBlogsWithCategory = async(categoryId:any)=>{
  const response = await axios.get(API_URL +'/get/' + categoryId)
  return response.data;
}

const categoryService = {
  getAllCategories,
  getBlogsWithCategory,
};

export default categoryService;