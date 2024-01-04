import React, { useState, useEffect, useContext } from 'react';
import HomePost from '../components/HomePost';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { URL } from '../url';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const {user} = useContext(UserContext);
  console.log(user);

  const fetchPost = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + '/api/posts/' + search);
      // console.log(URL + '/api/posts/' + search);
      setPosts(res.data);
      setNoResult(res.data.length === 0);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 px-8 md:px-[200px]'>
        {loader ? (<div className='h-[40vh] flex justify-center items-center'> <Loader /> </div> ) : !noResult ? (posts.map((post) =>
        <>
        <Link to={user?`/posts/post/${post._id}` : '/login'}>
         <HomePost key={post._id} post={post} />
         </Link>
        </>
         
         
         )) : (
          <h3 className='text-center font-bold mt-16'>No Post Available</h3>
        )}
      </div>
      <Footer className='flex-shrink-0' />
    </div>
  );
};

export default Home;
