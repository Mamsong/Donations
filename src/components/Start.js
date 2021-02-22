import React from 'react';
import "../css/Start.css";
import mike from '../image/mikehand.png';
import brown from '../image/brohand.png';
import Navbar from './base/Navbar';
import { Link } from 'react-router-dom';

export default function Start() {
    return (
        <div>
        <div className="AllOf">
            <Navbar />
            <div className="Balloons">
            </div>
            <div className="Hands">
            <div className="GroupGuide">
                <div className="balloon3">
                新規登録こちら
                </div>
                <Link to="/signup">
                <img className="MikeImage" alt="MikeHand" src={mike} 
                />
                </Link>
            </div>
            <div className="GroupGuide">
                <div className="balloon1">
                Loginこちら
                </div>
                <Link to="/login">
                <img className="BroImage" alt="BrownHand" src={brown} 
                    />
                </Link>
            </div>
            
        </div>
        </div>
        </div>
    )
}


