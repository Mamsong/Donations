import React from 'react';
import image from '../image/earth.jpg';
import '../css/Home.css';
import Navbar from './base/Navbar';


function Home() {
  return (
    <>
        <Navbar />
        <div className="Body">
            <div className="TopContainer">
                <img className="EarthImage" alt="HomeEarth" src={image} 
                />
                <p>START</p>
            </div>
        </div>
    </>
  );
}

export default Home;