import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ListItem from './components/ListItem';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
  
    <Router>
      <ListItem/>
    <Routes>
    
     <Route path ='/' element = {<Home/>}/>
     <Route path = '/category/:categoryId' element ={<CategoryPage/>}/>
     <Route path = '/login' element ={<Login/>}/>
     <Route path = '/register' element ={<Register/>}/>


     </Routes>
    </Router>
    
  );
  // console.log(blogs)
}

export default App;
