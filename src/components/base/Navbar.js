import React ,{ Component,useState } from 'react';
import { Menu, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';

function Navbar(){

    const colorsA = ['red', 'orange', 'yellow', 'olive', 'green', 'teal']
    const [activeA, setColor] = useState(colorsA[0]);
    // state = { activeA: colorsA[0], activeB: colorsB[0] }


    // handleAClick = (e, { name }) => this.setState({ activeA: name })
    // const { activeA} = this.state
    // value={email} onChange={e => setEmail(e.target.value)}
    return (
        <>
        <Menu style={{ width: "100vw", display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1px" ,background:"black"}}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "80vw"}}>
            <Link to="/" style={{ color:"orange", fontWeight:"bold"}} >Home</Link>
            <Link to="/" style={{ color:"orange", fontWeight:"bold"}} >Login</Link>
            <Link to="/" style={{ color:"orange", fontWeight:"bold"}} >Sign up</Link>
        </div>
        </Menu>
        {/* <Menu inverted>
          {colorsA.map((c) => (
            <Menu.Item
              key={c}
              name={c}
              active={activeA === c}
              color={c}
            //   onClick={handleAClick}
            // value={activeA}
            onClick={(name) => setColor(name)}
            />
          ))}
        </Menu> */}
        </>
    )
}

export default withRouter(Navbar)
