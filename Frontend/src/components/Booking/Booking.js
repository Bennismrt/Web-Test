import React,{useState,useEffect} from 'react';
import Navbar from '../Navbar';
import PrettyRating from "pretty-rating-react";
import AxiosAuth from '../Controller/AxiosAuth';
import Moment from 'moment';
import Loading from '../Auth/Loading';
import {
    faStar,
    faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import DatePicker from 'sassy-datepicker';

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

const Booking = () => {
    const [product, setProduct] = useState("listProduct");
    const [barber, setBarber] = useState("listBarber");
    const [barberMan, setBarberMan] = useState([]);
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState();
    const [idBarber, setIdBarber] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState("");
    const [payment, setPayment] = useState();
    const [price, setPrice] = useState();
    const [msg, setMsg] = useState();
    const [popupMsg, setPopupMsg] = useState("message");
    const [loading, setLoading] = useState (false);

    const axiosPrivate = AxiosAuth ();
    
    const CreateBooking = async(e) => {
        e.preventDefault();
        if(!idProduct){
            setPopupMsg("messageActive");
            setMsg("*please select product");
        }else if(!idBarber){
            setPopupMsg("messageActive");
            setMsg("*please select barber man");
        }else if(!date){
            setPopupMsg("messageActive");
            setMsg("*please select date");
        }else if(!time){
            setPopupMsg("messageActive");
            setMsg("*please select time");
        }else if(!payment && payment === null || payment === undefined){
            setPopupMsg("messageActive");
            setMsg("*please select payment");
        }else{
            try {
                const res = await axiosPrivate.post ('/booking/create-booking', {
                    product: [idProduct],
                    barber: [idBarber],
                    date: date,
                    time: time,
                    payment: payment,
                    totalPrice: price
                    
                });
                setLoading(true)
                if (res.data && res.status === 200) {
                    setPopupMsg("messageActive");
                    setMsg ('Successfully Created');
                    setInterval(() => {
                        window.location.replace("/home");
                        setLoading (false);
                    }, 2000);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    }   
    

    const Date = (date) => {
        const formatDate = Moment(date).format('YYYY-MM-DD');
        setDate(formatDate);
    };
    const Time = (e) => {
        setTime(e.target.value);
    };
    const Payment = (e) => {
        setPayment(e.target.value);
    };
    const SelectProduct = async(e) => {
        const id = e.target.value
        setIdProduct(id);
        try {
            const response = await axiosPrivate.get (`/product/get-product-by-id/${id}`);
            setPrice(response.data.price);
        } catch (error) {
            console.log(error.data);
        }
        
    };
    const SelectBarber = (e) => {
        setIdBarber(e.target.value);
    };

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

    // const Submit = (e) => {
    //     e.preventDefault();
    // }
    useEffect (
        () => {
            getBarber();
            getProduct();
        },
        []
    );
    const getBarber = async () => {
        try {
          const response = await axiosPrivate.get (
            `/barber/all`);
          setBarberMan (response.data);
        } catch (error) {
            console.log(error.data);
        }
      };

    const getProduct = async () => {
        try {
          const response = await axiosPrivate.get (
            `/products/all`);
          setProducts (response.data);
        } catch (error) {
            console.log(error.data);
        }
      };
    return (
        <div>
            <Navbar/>
            <form onSubmit={CreateBooking}>
                <div className='w-full max-w-screen-xl m-auto px-12 relative'>
                    <div className={popupMsg}>
                        <p className='font-bold italic text-white'>{msg}</p>
                    </div>
                    <h1 className='text-xl font-bold pt-4'>Product</h1>
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 mt-4' onClick={Product}>
                        <div className='flex flex-row w-11/12 justify-between px-8 items-center'>
                            <div className='flex flex-col'>
                                <h1 className='text-lg font-semibold'> Our Product</h1>
                                <p className='italic'>Select your product</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <form className={product} onChange={SelectProduct}>
                        {products.map(item => (
                            <div className='flex flex-row items-center mt-4 hover:bg-slate-200'>
                            <div className='flex flex-row w-11/12 justify-between px-8 items-center'>
                                <div className='flex flex-col'>
                                    <h1 className='text-lg font-semibold'>{item.name}</h1>
                                    <p className='italic'>{item.duration}</p>
                                </div>
                                <p className='p-2 bg-yellow-400 rounded-lg'>Rp. {item.price}</p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input type="radio" name='product' value={item._id} className='w-6 h-6' required/>
                            </div>
                        </div>
                        ))}
                    </form>
                </div>
                <div className='w-full max-w-screen-xl m-auto px-12 mt-8'>
                    <h1 className='text-xl font-bold pt-4'>Barber Man</h1>
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-20 before:bg-cyan-500 mt-4' onClick={Barber}>
                        <div className='flex flex-row w-11/12 px-8 items-center'>
                            <img src='https://www.man-es.com/images/default-source/energy-and-storage/man_chp_header_home.jpg?sfvrsn=3245e90b_0' className='w-12 h-12 rounded-full object-cover'/>
                            <div className='flex flex-col ml-4'>
                                <h1 className='text-lg font-semibold'> Our Barber man </h1>
                                <p className='italic'>Select your Barber Man</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <form className={barber} onChange={SelectBarber}>
                        {barberMan.map(item => (
                            <div className='flex flex-row items-center mt-4 hover:bg-slate-200' key={item}>
                            <div className='flex flex-row w-11/12 px-8 items-center'>
                                <img src={item.profilePicture} className='w-12 h-12 object-cover rounded-full'/>
                                <div className='flex flex-col ml-4'>
                                    <h1 className='text-lg font-semibold'>{item.name}</h1>
                                    <PrettyRating value={item.rating} icons={icons.star} colors={colors.star} />
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input type="radio" name='barber' value={item._id} className='w-6 h-6'/>
                            </div>
                        </div>
                        ))}
                    </form>
                </div> 
                <div className='w-full max-w-screen-xl m-auto px-12 mt-8'>
                    <h1 className='text-xl font-bold pt-4'>Date and Time</h1>
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-96 before:bg-cyan-500 mt-4' >
                        <div className='w-full'>
                            <DatePicker style={datePicker} onChange={Date}/>
                        </div>
                    </div>
                    <h1 className='font-bold mt-8 mb-2'>Select Time</h1>
                    <form onChange={Time} className='flex flex-row justify-between' required>
                        <div className='flex flex-row items-center p-2 border-2 rounded border-cyan-500'>
                            <h1>10:00 AM</h1>
                            <input type='radio' name='time' value='10:00' className='ml-2 display-none'/>
                        </div>
                        <div className='flex flex-row items-center p-2 border-2 rounded border-cyan-500'>
                            <h1>11:30 AM</h1>
                            <input type='radio' name='time' value='11:30' className='ml-2 display-none'/>
                        </div>
                        <div className='flex flex-row items-center p-2 border-2 rounded border-cyan-500'>
                            <h1>14:00 PM</h1>
                            <input type='radio' name='time' value='14:00' className='ml-2 display-none'/>
                        </div>
                        <div className='flex flex-row items-center p-2 border-2 rounded border-cyan-500'>
                            <h1>15:30 PM</h1>
                            <input type='radio' name='time' value='15:30' className='ml-2 display-none'/>
                        </div>
                        <div className='flex flex-row items-center p-2 border-2 rounded border-cyan-500'>
                            <h1>17:30 PM</h1>
                            <input type='radio' name='time' value='17:30' className='ml-2 display-none'/>
                        </div>
                    </form>
                </div>
                <div className='w-full max-w-screen-xl m-auto px-12 mt-8'>
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-24 before:bg-cyan-500 mt-4' >
                    <label className='mx-4 font-bold'>Choose your payment method :</label>
                    <select onChange={Payment} className='outline-none p-2 border-2 rounded-lg'>
                        <option value="Gopay" disabled selected hidden>None</option>
                        <option value="Gopay" disabled>Gopay (Coming Soon)</option>
                        <option value="OVO">OVO</option>
                        <option value="Shopeepay">Shopee pay</option>
                        <option value="Tunai">Tunai</option>
                    </select>
                    </div>
                </div>
                <div className='w-full max-w-screen-xl m-auto px-12 my-8'>
                    <div className='flex flex-row items-center shadow-xl before:w-2 before:h-24 before:bg-cyan-500 mt-4 w-full' >
                        <h1 className='w-2/4 text-center font-bold text-cyan-500 text-xl'>Total Price: Rp.{price}</h1>
                        <button className='px-6 py-2 bg-cyan-500 rounded-lg text-white flex flex-row items-center justify-center mx-auto'>{loading && <Loading/>} Order Now</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Booking

const datePicker = {
    width:"95%",
    margin: "1.5rem auto"
}