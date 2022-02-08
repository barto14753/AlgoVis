import React, { useContext, createContext, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import neural from "./assets/neural.png";
import '../src/MyNavbar.css';
import {WindowContext} from "./App"



const MyNavbar = () =>
{
    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);

    const f = () => {return;}
    return(
        <Navbar bg="primary" variant="dark" className="justify-content-center">
          <Navbar.Brand href="#" onClick={setHome} id="brand">
            <img
              alt=""
              src={neural}
              width="30"
              height="30"
              maring-left="10"
              className="d-inline-block align-top brand"
            />{' '}
          <strong>AlgoVis</strong>
          </Navbar.Brand>

      </Navbar>
    );
};
export default MyNavbar;