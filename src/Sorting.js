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

const Normal = React.createContext("lightgreen");
const Marked = React.createContext("blue");

const Node = (props) => {
  const value = props.is_marked ? "blue" : "lightgreen";
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
    const [elements, setElements] = useState(10);
    const [stepTime, setStepTime] = useState(0);
    const [nodes, setNodes] = useState(new Array(elements));
    const [marked, setMarked] = useState(new Array(-1, -1));
    const [trigger, setTrigger] = useState(0);


    const widthRef = React.createRef();

    const setEl = (count) => {
        let newNodes = new Array(count);
        let j = 0;
        for (let i=0; i<nodes.length; i++)
        {
            if (nodes[i] <= count)
            {
                newNodes[j] = nodes[i];
                j++;
            }
        }
        
        for (let i=nodes.length; i<count; i++)
        {
            newNodes[i] = i;
        }
        setElements(count);
        setNodes(newNodes);
    }


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

    if (!nodes[0]) for(let i=0; i<elements; i++) nodes[i] = i+1;

    const move = (index1, index2) => {
        let n = nodes;
        let tmp = n[index1];
        n[index1] = nodes[index2];
        n[index2] = tmp;
        setNodes(n);
    }

    const bubblesort = () => _bubblesort(0, 0, false);
    const _bubblesort = (round, i, swap) => {
        let index1 = i;
        let index2 = i+1;
        setMarked(new Array(index1, index2));
        setTrigger(stepTime-1);

        setTimeout(() => {

            if (nodes[index1] > nodes[index2])
            {
                swap = true;
                move(index1, index2);
                setTrigger(stepTime-1);
            }

            setTimeout(() => {
                setMarked(new Array(-1,-1));
                setTrigger(stepTime+1);
                i = (i+1)%(elements-1);
                if (i == 0) 
                {
                    if (!swap) return;
                    round += 1;
                    swap = false;
                    
                }

                if (round < elements || i < elements-1) setTimeout(() => {_bubblesort(round, i, swap)}, stepTime/3);
                
            }, stepTime/3)
            
        }, stepTime/3);
    }


    const shuffle = () => _shuffle(elements/2);
    const _shuffle = (el) => {
        let index1 = getRandomInt(0, elements-1);
        let index2 = getRandomInt(0, elements-1);
        setMarked(new Array(index1, index2));
        setTrigger(stepTime-1);

        setTimeout(() => {
            move(index1, index2);
            setTrigger(stepTime-1);
            setTimeout(() => {
                setMarked(new Array(-1,-1));
                if (el > 0) setTimeout(() => {_shuffle(el-1)}, stepTime/3);
                setTrigger(stepTime+1);
                
            }, stepTime/3)
            
        }, stepTime/3);

    }

    let Nodes = () => {
        let n = nodes;
        return n.map((item, index) => {
            return <Node 
                x={(canvasWidth*1)*((index)/elements) + 1} 
                y={(canvasHeight*1)*(1-item/elements)} 
                width={(canvasWidth*0.9)/(elements*2)} 
                height={(canvasHeight*1)*(item/elements)}
                is_marked={marked.includes(index)}
            />
        });
        

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
    <Container className="sorting_container">
        <Row>
            <Col sm={4}>
                <SortingContext.Provider
                    value={{elements, stepTime, setEl, setStepTime, shuffle, bubblesort}}>
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