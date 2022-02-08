import React, { useContext, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Sorting.css';
import {WindowContext} from "./App"
import { Row, Col, Container } from "react-bootstrap";
import SortingSidebar from "./SortingSidebar";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";

const ThemeContext = React.createContext("lightgreen");

const ThemedRect = (props) => {
  const value = React.useContext(ThemeContext);
  return (
    <Rect x={0} y={props.y} width={200} height={20} fill={value} shadowBlur={10} />
  );
};


const Sorting = () =>
{

    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);

    return(
    <Container>
        <Row>
            <Col sm={4}>
                <SortingSidebar />
            </Col>
            <Col sm={8} id="canvas">
                <Stage width="1000" height="500">
                    <Layer>

                    </Layer>
                </Stage>
            </Col>
        </Row>
    </Container>

    );
};
export default Sorting;