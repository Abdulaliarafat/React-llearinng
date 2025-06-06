import React, { useEffect, useState } from 'react';
import Header from '../Header';
import RightAside from '../HomeLayout/RightAside';
import NewsDetailsCard from './NewsDetailsCard';
import { useLoaderData, useParams } from 'react-router';

const NewsDetails = () => {
    const data=useLoaderData()
    const {id} =useParams() 
    const [news,setNews]=useState({})
    // console.log(data,id,news)  
    useEffect(()=>{
        const newsDetails=data.find(singleNew=>singleNew.id==id)
        setNews(newsDetails)
    },[data,id])
    
    return (
        <div>
            <header className='py-2'>
                <Header></Header>
            </header>
            <main className='w-11/12 mx-auto grid grid-cols-12 gap-5 py-10'>
                <section className='col-span-9'>
                    <NewsDetailsCard news={news}></NewsDetailsCard>
                </section>
                <aside className='col-span-3 '>
                    <RightAside></RightAside>
                </aside>
            </main>
        </div>
    );
};

export default NewsDetails;