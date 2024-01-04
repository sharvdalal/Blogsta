import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'
import MyBlogs from './pages/MyBlogs'


const App = () => {
  const navigate = useNavigate();
  return (
    <UserContextProvider>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/posts/post/:id' element={<PostDetails />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/myblogs/:id' element={<MyBlogs />} />
        <Route exact path='*' element={<div className='flex justify-center flex-col'><h1 className=''>Not Found</h1> <h1 className=' cursor-pointer' onClick={()=>navigate('/')}>Go to home Page</h1></div>} />

      </Routes>
    
    </UserContextProvider>
  )
}

export default App