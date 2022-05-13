import React,{useState, useEffect} from 'react'
import PrettyRating from "pretty-rating-react";
import AxiosAuth from './Controller/AxiosAuth';
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";

const icons = {
    star: {
        complete: faStar,
        half: faStarHalfAlt,
        empty: farStar,
    }
};  

const colors = {
    star: ['#d9ad26', '#d9ad26', '#434b4d']
}; 

const Body = () => {
    const [product, setProduct] = useState("listProduct");
    const [barber, setBarber] = useState("listBarber");
    const [barberMan, setBarberMan] = useState([]);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const axiosPrivate = AxiosAuth ();

    useEffect (
        () => {
            getBarber();
            getProduct();
            getBooking();
        },
        []
      );

    const Book = () => {
        window.location.replace("/booking")
    }

    const Product = () => {
        if (product === "listProduct"){
            setProduct("listProductActive");
        }else setProduct("listProduct");
    }
    const Barber = () => {
        if (barber === "listBarber"){
            setBarber("listBarberActive");
        }else setBarber("listBarber");
    }

    const getBarber = async () => {
        try {
          const response = await axiosPrivate.get(
            `/barber/all`);
          setBarberMan (response.data);
        } catch (error) {
            console.log(error.data);
        }
      };
    const getProduct = async () => {
        try {
          const response = await axiosPrivate.get(
            `/products/all`);
          setProducts (response.data);
        } catch (error) {
            console.log(error.data);
        }
      };
    
    const getBooking = async() => {
        try {
            const response = await axiosPrivate.get(
            `booking/get-booking`);
            setData(response.data);

        } catch (error) {
            console.log(error.data);
        }
    };
    const FormatDate = (time) => {
        const date = new Date(time)
        return date.toDateString('T')
    }
    
    return (
        <div className='w-full h-4/6 max-w-screen-xl m-auto'>
            <div className='bg-home h-128 object-cover w-2/3bg-no-repeat mx-12 flex flex-col items-center justify-center relative rounded-b-lg'>
                <div className='opacity-50 bg-cyan-500 w-3/4 h-32 rounded-xl blur-2xl'></div>
                <h1 className='md:text-5xl text-3xl absolute top-52 font-bold text-center text-white'>Let's make something</h1>
                <button onClick={Book} className='absolute bottom-56 md:bottom-52 px-4 py-1 text-white bg-orange-600 rounded-lg font-bold'>Booking Now</button>
            </div>
            <div className='px-12 mt-4'>
                <h1 className='text-xl font-bold pt-4'>Current Booking</h1>
                    {data.length ? (
                    data.map((item) => {
                            return(
                                <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 after:inset-0 mt-2 bg-slate-200 space-x-12' key={item.id}>
                                <div className='flex flex-row w-11/12 justify-between px-8 items-center'>
                                    <div className='flex flex-col space-y-2'>
                                        <h1 className='text-lg font-semibold'>Ordered ID: {item.product}</h1>
                                        <p className='italic text-xs'>Ordered at {FormatDate(item.createdAt)} </p>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <p className='text-center border-2 p-2 rounded-lg border-cyan-500 mr-8 w-36 font-semibold'>Payment: {item.payment}</p>
                                </div>
                            </div>
                            )
                    })) : 
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 after:inset-0 mt-2 bg-slate-200 space-x-12'>
                        <p className='mx-8 font-semibold'>No Transaction</p>    
                    </div>}       
            </div>
            <div className='w-full max-w-screen-xl m-auto px-12 mt-6'>
                <h1 className='text-xl font-bold pt-4'>Our Products and Services</h1>
                <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 mt-2' onClick={Product}>
                    <div className='flex flex-row w-11/12 justify-between px-8 items-center'>
                        <div className='flex flex-col'>
                            <h1 className='text-lg font-semibold'> Services</h1>
                            <p className='italic'>Select your product</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                    <button className='ml-auto border-2 p-2 rounded-lg border-cyan-500 mr-8'>Details</button>
                    </div>
                </div>
                <div className={product}>
                    {products.map(item => (
                        <div className='flex flex-row items-center mt-4 hover:bg-slate-200 justify-between px-10' key={item.id}>
                        <div className='flex flex-col'>
                            <h1 className='text-lg font-semibold'>{item.name}</h1>
                            <p className='italic'>{item.duration}</p>
                        </div>
                        <p className='p-2 bg-yellow-400 rounded-lg'>Rp. {item.price}</p>
                </div>
                    ))}
                </div>
            </div>
            <div className='w-full max-w-screen-xl mx-auto px-12 mb-32 mt-6'>
                <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 mt-2' onClick={Barber}>
                    <div className='flex flex-row w-11/12 px-8 items-center'>
                        <img src='https://www.man-es.com/images/default-source/energy-and-storage/man_chp_header_home.jpg?sfvrsn=3245e90b_0' className='w-12 h-12 rounded-full object-cover'/>
                        <div className='flex flex-col ml-4'>
                            <h1 className='text-lg font-semibold'> Our Barber man </h1>
                            <p className='italic'>Details</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='ml-auto border-2 p-2 rounded-lg border-cyan-500 mr-8'>Details</button>
                    </div>
                </div>
                {barberMan.map(item => (
                    <div className={barber} key={item.id}>
                        <div className='flex flex-row items-center mt-4 hover:bg-slate-200 px-10'>
                            <img src={item.profilePicture} className='w-12 h-12 rounded-full object-cover'/>
                            <div className='flex flex-col ml-4'>
                                <h1 className='text-lg font-semibold'>{item.name}</h1>
                                <PrettyRating value={item.rating} icons={icons.star} colors={colors.star} />
                            </div>
                        </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Body