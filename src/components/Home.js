import React from 'react';
import image from '../image/earth.jpg';
import '../css/Home.css';
import Navbar from './base/Navbar';
import { Link } from 'react-router-dom';


function Home() {

  const token = localStorage.getItem('token');

  return (
    <>
        <Navbar />
        <div className="Body">
            <div className="TopContainer">
                <img className="EarthImage" alt="HomeEarth" src={image} 
                />
            {token ? <Link className="Ptagtoken" to="/inputs" >寄付記録を作成する</Link> : <Link className="Ptag" to="/start" >START</Link>}    
            </div>
        </div>
    </>
  );
}

export default Home;