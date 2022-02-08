import React from "react";
import {Nav, Navbar, Button, Form, Col, Row} from "react-bootstrap";
import './SortingSidebar.css'
import connectivity from "./assets/connectivity.png";
import data_flow from "./assets/data-flow.png";
import data_flow1 from "./assets/data-flow1.png";
import tree_structure from "./assets/tree-structure.png";
import process from "./assets/process.png";
import repeat from "./assets/repeat.png";

import RangeSlider from 'react-bootstrap-range-slider';



const GraphsSidebar = props => {
    const [ elements, setElements ] = React.useState(20);
    const [ step, setStep ] = React.useState(20);

    return (
        <>
            <Nav className="col-md-15 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky"></div>
                <Navbar.Brand className="section_brand" href="#">
                    <img
                    alt=""
                    src={connectivity}
                    width="50"
                    height="50"
                    className="d-inline-block align-top brand"
                    />{' '}
                <strong>Graphs</strong>
                </Navbar.Brand>
                <Nav.Item className="first_el" >
                    <Button variant="success">
                        <img src={data_flow} className="sidebar_img"></img>
                        DFS
                    </Button>
                </Nav.Item>
                
                <Nav.Item>
                    <Button variant="success">
                        <img src={tree_structure} className="sidebar_img"></img>
                        BFS
                    </Button>
                </Nav.Item>


                <Nav.Item>
                    <Button variant="primary">
                        <img src={data_flow1} className="sidebar_img"></img>
                        Set Root
                    </Button>
                </Nav.Item>


                <Nav.Item>
                    <Button variant="primary">
                        <img src={process} className="sidebar_img"></img>
                        Add Vertice
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="primary">
                        <img src={data_flow} className="sidebar_img"></img>
                        Add Edge
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="danger">
                        Reset
                    </Button>
                </Nav.Item>


                <Nav.Item>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label>
                            Step time
                        </Form.Label>
                        <Col xs="6">
                        <RangeSlider
                            value={step}
                            onChange={e => setStep(e.target.value)}
                        />
                        </Col>
                        <Col xs="5">
                        <Form.Control value={step}/>
                        </Col>
                        
                    </Form.Group>
                </Form>
                </Nav.Item>
            </Nav>
          
        </>
        );
  };
  export default GraphsSidebar