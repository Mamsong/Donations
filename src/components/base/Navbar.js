import React ,{ Component,useState } from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import MediaQuery from "react-responsive";

function Navbar(){

    return (
        <>
        <MediaQuery query="(min-width: 767px)">
            <Menu style={{ width: "100vw", display: "flex", flexDirection: "row",justifyContent: "space-around",alignItems: "center", marginBottom: "-1px" ,background:"black"}}>
            <div style={{ fontSize:"0.9em",display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
                <Link to="/" style={{ color:"#FDDF02", fontWeight:"bold"}}>Home</Link>
                <Link to="/login" style={{ color:"#FDDF02", fontWeight:"bold"}} >Login</Link>
                <Link to="/signup" style={{ color:"#FDDF02", fontWeight:"bold"}} >Sign up</Link>
                <Link to="/inputs" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録作成</Link>
                <Link to="/donation_list" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録</Link>
            </div>
            </Menu>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
            <Menu style={{ width: "100vw", display: "flex",flexDirection: "row",justifyContent: "space-around",alignItems: "center",background:"black", marginBottom:"0.7em"}}>
            <div style={{ fontSize:"0.8em",display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
                <Link to="/" style={{ color:"#FDDF02", fontWeight:"bold"}}>Home</Link>
                <Link to="/login" style={{ color:"#FDDF02", fontWeight:"bold"}} >Login</Link>
                <Link to="/signup" style={{ color:"#FDDF02", fontWeight:"bold"}} >Sign up</Link>
                <Link to="/inputs" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録作成</Link>
                <Link to="/donation_list" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録</Link>
            </div>
            </Menu>
        </MediaQuery>
        </>
    )
}

export default withRouter(Navbar)
