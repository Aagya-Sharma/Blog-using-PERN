import axios from "axios";

const API_URL = "http://localhost:5000/api/blog";

// Get all the blogs
const getAllBlogs = async () => {
  const response = await axios.get(API_URL + "/getAll");
  return response.data;
};

// Get all user blogs
const getBlogs = async (token:any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/get",config);
  return response.data;
};


const blogService = {
  getAllBlogs,
  getBlogs
};

export default blogService;