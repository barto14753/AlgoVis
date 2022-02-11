import React, { useContext, useState, createContext } from "react";
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

const Node = (props) => {
  const value = React.useContext(ThemeContext);
  return (
    <Rect x={props.x} y={props.y} width={props.width} height={props.height} fill={value} shadowBlur={5} />
  );
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


export const SortingContext = createContext(null);


const Sorting = () =>
{

    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);
    const [canvasWidth, setCanvasWidth] = useState(1000);
    const [canvasHeight, setCanvasHeight] = useState(600);
    const [elements, setElements] = useState(50);
    const [stepTime, setStepTime] = useState(10);
    const [nodes, setNodes] = useState(new Array(elements));


    const widthRef = React.createRef();


    setInterval(() => {
        if (widthRef.current != null)
        {
            let bounds = widthRef.current.getBoundingClientRect()
            if (bounds != null)
            {
                setCanvasWidth(bounds.width);
                setCanvasHeight(bounds.height);
            }
        }

    }, 1000);

    for (let i=0; i<elements; i++) nodes[i] = i/elements;

    const move = (index1, index2) => {
        let n = nodes;
        n[index1] = 0;
        n[index2] = 0;
        setNodes(n);
    }

    const shuffle = () => {
        for (let i=0; i<10; i++)
        {
            console.log("Shuffle")
            move(getRandomInt(0, elements-1), getRandomInt(0, elements-1));
            setCanvasWidth(canvasWidth+0.01);
        }
    }

    const Nodes = () => {
        let q = nodes.map((item, index) => {
            return <Node x={canvasWidth*((index+1)/elements)} y={canvasHeight*(1-item)} width={canvasWidth/(elements*2)} height={canvasHeight*item}/>
        });
        console.log(nodes);
        return q;

    }

    const Canvas = () =>
    {
        return (
            <Stage width={canvasWidth} height={canvasHeight} id="sorting_stage">
                <Layer>
                    <Nodes />
                </Layer>
            </Stage>
        )
    }

    return(
    <Container>
        <Row>
            <Col sm={4}>
                <SortingContext.Provider
                    value={{elements, stepTime, setElements, setStepTime, shuffle}}>
                        {canvasHeight}
                    <SortingSidebar />
                </SortingContext.Provider>
            </Col>
            <Col sm={8} id="sorting_canvas"
                ref={widthRef}
            >
                <Canvas />
            </Col>
        </Row>
    </Container>

    );
};
export default Sorting;