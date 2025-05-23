 import React, {useEffect, useState } from 'react';
import Blog from '../Blog/Blog';
 
 const Blogs = ({handleBookMark,handleMarkAsRead}) => {
    const [blogs,setBlogs]=useState([])
    useEffect(()=>{
        fetch('blogs.json')
        .then(res=>res.json())
        .then(data=>setBlogs(data))
    },[])
    // console.log(blogs)
    return (
        <div className='p-4'>
            <h1 className='text-3xl m-2'>Total : {blogs.length}</h1>
            <div className="all-blogs grid grid-cols-2">
                {
                    blogs.map(blog=><Blog handleBookMark={handleBookMark}handleMarkAsRead={handleMarkAsRead} key={blog.id} blog={blog}></Blog>)
                }
            </div>
        </div>
    );
 };
 
 export default Blogs;