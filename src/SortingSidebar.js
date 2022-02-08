import React from "react";
import {Nav, Navbar, Button, Form, Col, Row} from "react-bootstrap";
import './SortingSidebar.css'
import sort from "./assets/sort.png";
import bubble from "./assets/bubbles.png";
import quick from "./assets/quick.png";
import merge from "./assets/merge.png";
import shuffle from "./assets/shuffle.png";
import RangeSlider from 'react-bootstrap-range-slider';



const SortingSidebar = props => {
    const [ elements, setElements ] = React.useState(20);
    const [ step, setStep ] = React.useState(20);

    return (
        <>
            <Nav className="col-md-15 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky"></div>
                <Navbar.Brand className="section_brand" href="#">
                    <img
                    alt=""
                    src={sort}
                    width="50"
                    height="50"
                    className="d-inline-block align-top brand"
                    />{' '}
                <strong>Sorting</strong>
                </Navbar.Brand>
                <Nav.Item className="first_el" >
                    <Button variant="success">
                        <img src={bubble} className="sidebar_img"></img>
                        Bubblesort
                    </Button>
                </Nav.Item>
                
                <Nav.Item>
                    <Button variant="success">
                        <img src={merge} className="sidebar_img"></img>
                        Mergesort
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="success">
                        <img src={quick} className="sidebar_img"></img>
                        Quicksort
                    </Button>
                </Nav.Item>

                <Nav.Item>
                    <Button variant="primary">
                        <img src={shuffle} className="sidebar_img"></img>
                        Shuffle
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
                            value={elements}
                            onChange={e => setElements(e.target.value)}
                        />
                        </Col>
                        <Col xs="5">
                        <Form.Control value={elements}/>
                        </Col>
                        
                    </Form.Group>
                </Form>
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
  export default SortingSidebar