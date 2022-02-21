import React, { useContext } from "react";
import {Nav, Navbar, Button, Form, Col, Row} from "react-bootstrap";
import './SortingSidebar.css'
import path from "./assets/path.png";
import tree_structure from "./assets/tree-structure.png";
import star from "./assets/falling-star.png";
import wall from "./assets/wall.png";
import start from "./assets/start.png";
import finish from "./assets/finish.png";
import { PathfindingContext } from "./Pathfinding";

import RangeSlider from 'react-bootstrap-range-slider';



const PathfindingSidebar = props => {
    const {elements, stepTime, setEl, setStepTime, setStartMode, setFinishMode, setWallMode, removeWall, reset, bfs, a_star} = useContext(PathfindingContext);

    return (
        <>
            <Nav className="col-md-15 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky"></div>
                <Navbar.Brand className="section_brand" href="#">
                    <img
                    alt=""
                    src={path}
                    width="50"
                    height="50"
                    className="d-inline-block align-top brand"
                    />{' '}
                <strong>Pathfinding</strong>
                </Navbar.Brand>
                <Nav.Item className="first_el" >
                    <Button variant="success" onClick={a_star}>
                        <img src={star} className="sidebar_img"></img>
                        A-star
                    </Button>
                </Nav.Item>
                
                <Nav.Item>
                    <Button variant="success" onClick={bfs}>
                        <img src={tree_structure} className="sidebar_img"></img>
                        BFS
                    </Button>
                </Nav.Item>


                <Nav.Item>
                    <Button variant="primary" onClick={setWallMode}>
                        <img src={wall} className="sidebar_img"></img>
                        Set Wall
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="primary" onClick={setStartMode}>
                        <img src={start} className="sidebar_img"></img>
                        Set Start
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="primary" onClick={setFinishMode}>
                        <img src={finish} className="sidebar_img"></img>
                        Set Finish
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="danger" onClick={removeWall}>
                        Remove Wall
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="danger" onClick={reset}>
                        Reset
                    </Button>
                </Nav.Item>


                <Nav.Item>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label>
                            Elements
                        </Form.Label>
                        <Col xs="6">
                        <RangeSlider
                            min={5}
                            max={25}
                            value={elements}
                            onChange={e => setEl(e.target.value)}
                        />
                        </Col>
                        <Col xs="5">
                        <Form.Control value={elements}/>
                        </Col>
                        
                    </Form.Group>
                </Form>
                </Nav.Item>

               
            </Nav>
          
        </>
        );
  };
  export default PathfindingSidebar;