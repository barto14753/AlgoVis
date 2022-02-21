import React, { useContext, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/SubNav.css';
import {WindowContext} from "./App"



const SubNav = () =>
{

    
    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);
    const [active, setActive] = useState('default');


    return(
    <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Nav 
            variant="pills" 
            activeKey={window}
        >
            <Nav.Item >
                <Nav.Link onClick={setSorting}>Sorting</Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <Nav.Link onClick={setPathfinding}>Pathfinding</Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <Nav.Link onClick={setGraphs}>Graphs</Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <Nav.Link onClick={setAbout}>About</Nav.Link>
            </Nav.Item>
        </Nav>

      </Navbar>
    );
};
export default SubNav;