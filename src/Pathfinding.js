import React, { useContext, useState, createContext } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {WindowContext} from "./App"
import { Row, Col, Container } from "react-bootstrap";
import PathfindingSidebar from "./PathfindingSidebar";
import Konva from "konva";
import { Stage, Layer, Rect } from "react-konva";

// MODES
const MODE_NONE = 0;
const MODE_WALL = 1;
const MODE_START = 2;
const MODE_FINISH = 3;
const MODE_REMOVE_WALL = 4;

export const PathfindingContext = createContext(null);

const Pathfinding = () =>
{

    const {window, setHome, setSorting, setGraphs, setPathfinding, setAbout} = useContext(WindowContext);
    const [canvasWidth, setCanvasWidth] = useState(1000);
    const [canvasHeight, setCanvasHeight] = useState(600);
    const [elements, setElements] = useState(10);
    const [stepTime, setStepTime] = useState(0);
    const [nodes, setNodes] = useState(new Array(elements*elements));
    const [trigger, setTrigger] = useState(0);
    const [mode, setMode] = useState(MODE_NONE);
    const [start, setStart] = useState(-1);
    const [finish, setFinish] = useState(-1);
    const [used, setUsed] = useState(new Array());
    const [pending, setPending] = useState(new Array());
    const [path, setPath] = useState(new Array());
    const [wall, setWall] = useState(new Array());

    const widthRef = React.createRef();

    const setStartMode = () => setMode(MODE_START);
    const setFinishMode = () => setMode(MODE_FINISH);
    const setWallMode = () => setMode(MODE_WALL);
    const removeWall = () => setMode(MODE_REMOVE_WALL);
    const reset = () => {
        setMode(MODE_NONE);
        setStart(-1);
        setFinish(-1);
        setUsed(new Array());
        setPending(new Array());
        setPath(new Array());
        setWall(new Array());
        
    }

    const get_color = (index) => {
        if (start == index) return "green";
        else if (finish == index) return "red"
        else if (path.includes(index)) return "lightgreen";
        else if (used.includes(index)) return "cyan";
        else if (pending.includes(index)) return "lightblue";
        else if (wall.includes(index)) return "black";
        else return "white";
    }

    const Node = (props) => {
        return (
          <Rect 
            x={props.x} 
            y={props.y} 
            width={props.width} 
            height={props.height} 
            fill={props.color} 
            shadowBlur={1}
            onClick={(e) => {handleClick(props.index)}}
            />
        );
      };

    const handleClick = (index) => {
        let x = Math.floor(index/elements);
        let y = index % elements;
        console.log("Click: ", x, y, mode);

        if (mode == MODE_WALL)
        {
            if (!wall.includes(index)) 
            {
                console.log("ADD WALL");
                let w = wall;
                w.push(index);
                setTrigger(stepTime-1);
                setWall(w);
                setTrigger(stepTime+1);
            }
            
        }
        else if (mode == MODE_REMOVE_WALL)
        {
            console.log("Remove1");
            if (wall.includes(index)) {
                console.log("Remove2");
                setWall(remove_val(wall, index));
                setTrigger(index);
            }
        }
        else if (mode == MODE_START) setStart(index);
        else if (mode == MODE_FINISH) setFinish(index);

    }

    const setEl = (count) => {
        let newNodes = new Array(count*count);
        for (let i=0; i<count*count; i++) newNodes[i] = -1;
        setElements(count*1);
        setNodes(newNodes);
        reset();
    }


    if (!nodes[0] && nodes[0] != -1)
    {
        console.log("RESTART", nodes);
        for(let i=0; i<elements*elements; i++) nodes[i] = -1;
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

    }, 100);


    const remove_val = (arr, val) => {
        for( var i = 0; i < arr.length; i++){ 
    
            if ( arr[i] === val) { 
        
                arr.splice(i, 1); 
            }
        
        }
        return arr;
    }

    const add_val = (arr, val) => {
        arr.push(val);
        return arr;
    }
    

    const border_valid = (index) => index >= 0 && index < elements*elements;
    const can_move_to = (index) => {
        return border_valid(index) && !wall.includes(index) && !used.includes(index) && !pending.includes(index);
    }

    const move_if_poss = (queue, index, parent) => {
        if (can_move_to(index))
        {
            setPending(add_val(pending, index));
            queue.push(index);
            nodes[index] = parent;
            setTrigger(parent);
        }

        return queue;
    }

    const showPath = () => {
        console.log("Show path");
        let index = finish;
        while (index >= 0)
        {
            console.log(index);
            setUsed(remove_val(used, index));
            setPending(remove_val(pending, index));
            setPath(add_val(path, index));
            index = nodes[index];
            setTrigger(index);
        }
    }

    const bfs = () => {
        if (start < 0 || finish < 0) return;
        let q = new Array();
        q.push(start);
        _bfs(q);
    }


    const _bfs = (queue) => {
        let index = queue.shift();
        if (index == finish) 
        {
            showPath();
            return;
        }

        setPending(remove_val(pending, index));
        setUsed(add_val(used, index));
        

        let up = index - elements;
        let down = index + elements;
        let left = index - 1;
        let right = index + 1;

        queue = move_if_poss(queue, up, index);
        queue = move_if_poss(queue, down, index);
        if (index % elements != 0) queue = move_if_poss(queue, left, index);
        if ((index+1) % elements != 0) queue = move_if_poss(queue, right, index);

        setTimeout(() => {
            if (queue.length > 0) _bfs(queue);
            else console.log("empty");
        }, 100);

    }

    const a_star = () => {

    }

    const _a_star = () => {

    }

    let Board = () => {
        let n = nodes;
        let w = wall;
        return n.map((item, index) => {
            return <Node 
                x={Math.min(canvasWidth,canvasHeight) * (index % elements) / elements} 
                y={Math.min(canvasWidth,canvasHeight) * (Math.floor(index / elements)) / elements} 
                width={Math.min(canvasWidth,canvasHeight)/elements} 
                height={Math.min(canvasWidth,canvasHeight)/elements}
                is_marked={true}
                index={index}
                color={get_color(index)}
            />
        });
    }

    const Canvas = () =>
    {
        return (
            <Stage width={canvasWidth} height={canvasHeight}>
                <Layer>
                    <Board />
                </Layer>
            </Stage>
        )
    }

    return(
    <Container className="pathfinding_container">
        <Row>
            <Col sm={4}>
                <PathfindingContext.Provider
                    value={{elements, stepTime, setEl, setStepTime, setStartMode, setFinishMode, setWallMode, removeWall, reset, bfs, a_star}}>
                    <PathfindingSidebar />
                </PathfindingContext.Provider>
            </Col>
            <Col sm={8} id="pathfinding_canvas"
                ref={widthRef}
            >
                <Canvas />
            </Col>
        </Row>
    </Container>

    );
};
export default Pathfinding;