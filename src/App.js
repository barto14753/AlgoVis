import logo from './logo.svg';
import './App.css';
import MyNavbar from "./MyNavbar";
import SubNav from "./SubNav";
import Footer from "./Footer";
import Home from "./Home"
import Sorting from "./Sorting"
import Graphs from "./Graphs"
import Pathfinding from './Pathfinding';
import About from './About';
import { Button } from 'react-bootstrap';
import React, { useContext, createContext, useState } from "react";


export const WindowContext = createContext(null);



function App() {
  const [window, setWindow] = useState("home");

  function setHome()
  {
    setWindow("home");
  }

  function setSorting()
  {
    setWindow("sorting");
  }

  function setGraphs()
  {
    setWindow("graphs");
  }

  function setPathfinding()
  {
    setWindow("pathfinding");
  }

  function setAbout()
  {
    setWindow("about");
  }


  const home = <Home/>
  const sorting = <Sorting/>
  const graphs = <Graphs/>
  const pathfinding = <Pathfinding/>
  const about = <About/>

  return (
    <WindowContext.Provider
      value={{window, setHome, setSorting, setGraphs, setPathfinding, setAbout}}>
        <MyNavbar />
        <SubNav />
        {
          window == "home" ? home : <></>
        }
        {
          window == "sorting" ? sorting : <></>
        }
        {
          window == "graphs" ? graphs : <></>
        }
        {
          window == "pathfinding" ? pathfinding : <></>
        }
        {
          window == "about" ? about : <></>
        }
        <Footer />
    </WindowContext.Provider>
  );
}

export default App;
