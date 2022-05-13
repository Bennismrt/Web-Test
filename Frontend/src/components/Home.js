import React from 'react';
import Body from './Body';
import Navbar from './Navbar';

const Home = () => {
    const Booking = () => {
        window.location.replace("/booking");
    }
    return (
        <div>
            <Navbar Booking={Booking}/>
            <Body/>
        </div>
    )
}

export default Home