import axios from "axios";

const API_URL = "http://localhost:5000/api/blog";

// Get all the blogs
const getAllBlogs = async () => {
  const response = await axios.get(API_URL + "/getAll");
  return response.data;
};



const blogService = {
  getAllBlogs,

};

export default blogService;