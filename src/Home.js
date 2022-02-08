import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Home.css';
import {WindowContext} from "./App"
import algorithm from "./assets/algorithm.png"
import Button from 'react-bootstrap/Button';
import graph from "./assets/connectivity.png";
import path from "./assets/path.png";
import sort from "./assets/sort.png";



const Home = () =>
{

    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);

    return(
    <div>
        <div className="header">
            <div class="header_about">
                <strong>AlgoVis</strong> is visualization tool for sorting, graph and pathfinding algorithms. 
                Tool is fully interactive, enable changing parameters of visualization such as number of elements 
                to sort or setting walls for pathfinding algorithms. You can read more in About section
                <br></br>
                <br></br>
                <Button onClick={setAbout} variant="success">About</Button>{' '}
            </div>
            <img className="header_img" src={algorithm}></img>
        </div>
        <div className="modes d-flex justify-content-around">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={sort}></img>
                        <h4>Sorting Algorithms</h4>
                    </div>
                    <div className="flip-card-back">
                        <Button onClick={setSorting} variant="success">Check</Button>{' '}
                    </div>
                </div>
            </div>

            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={graph}></img>
                        <h4>Graph Algorithms</h4>
                    </div>
                    <div className="flip-card-back">
                        <Button onClick={setGraphs} variant="success">Check</Button>{' '}
                    </div>
                </div>
            </div>

            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={path}></img>
                        <h4>Pathfinding Algorithms</h4>
                    </div>
                    <div className="flip-card-back">
                        <Button onClick={setPathfinding} variant="success">Check</Button>{' '}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
export default Home;