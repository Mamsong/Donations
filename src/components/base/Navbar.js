import React ,{ Component,useState } from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import MediaQuery from "react-responsive";
import { Alert } from 'rsuite';

function Navbar({ history }){

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/');
        Alert.success('ログアウトしました。');
    }

    const token = localStorage.getItem('token');

    return (
        <>
        <MediaQuery query="(min-width: 767px)">
            <Menu style={{ width: "100vw", display: "flex", flexDirection: "row",justifyContent: "space-around",alignItems: "center", marginBottom: "-1px" ,background:"black"}}>
            <div style={{ fontSize:"0.9em",display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
            {token ? <Link to="/" style={{ color:"#FDDF02", fontWeight:"bold"}}>Home</Link> : null}    
                {/* <Link to="/signup" style={{ color:"#FDDF02", fontWeight:"bold"}} >Sign up</Link> */}
            {token ? <Link to="/inputs" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録作成</Link> : null}    
            {token ? <Link to="/donation_list" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録</Link> : null }    
            </div>
            {token ? null :<Link to="/" style={{ color:"#FDDF02", fontWeight:"bold",marginRight:"2%"}}>Home</Link> }
            { token ? null : <Button style={{padding:" 8px 0px ",width:"6%",marginRight:"1%"}} color='orange' size="small" onClick={() => history.push('/signup')}>Sign up</Button>}
            { token ? <Button style={{padding:" 8px 0px ",width:"6%",marginRight:"2%"}} size="small" color='orange' onClick={handleLogout}>Logout</Button> : <Button style={{padding:" 8px 0px ",width:"6%",marginRight:"2%"}} size="small" color='orange' onClick={() => history.push('/login')}>Login</Button>}
            </Menu>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
            <Menu style={{ width: "100vw", display: "flex",flexDirection: "row",justifyContent: "space-around",alignItems: "center",background:"black", marginBottom:"0.7em"}}>
            <div style={{ fontSize:"0.8em",display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "100vw"}}>
                <Link to="/" style={{ color:"#FDDF02", fontWeight:"bold"}}>Home</Link>
                <Link to="/signup" style={{ color:"#FDDF02", fontWeight:"bold"}} >Sign up</Link>
                <Link to="/inputs" style={{ color:"#FDDF02", fontWeight:"bold"}} >寄付記録作成</Link>
                <Link to="/donation_list" style={{ color:"#FDDF02", fontWeight:"bold"}} >My寄付記録</Link>
            </div>
            { token ? <Button inverted color='orange' onClick={handleLogout}>ログアウト</Button> : <Link to="/login" style={{ color:"#FDDF02", fontWeight:"bold"}} >Login</Link>}
            </Menu>
        </MediaQuery>
        </>
    )
}

export default withRouter(Navbar)
