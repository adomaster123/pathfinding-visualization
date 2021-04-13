import {useState} from 'react';
import './App.css';
import {depthFirstSearch, breadthFirstSearch, randomizeMaze, copyArray} from './Algos.js';

function App() {
  // State variables for width and height of maze
  const [startCoords, setStartCoords] = useState([]);
  const [goalCoords, setGoalCoords] = useState([]);

  const [algorithm, setAlgorithm] = useState("Depth First Search");
  // Declaring the state variable that will store the layout of the maze
  let arr = [[]];
  let arr1 = new Array(21);
    arr1.fill(0);
  for (let i = 0; i < 21; i++) {
    arr[i] = arr1;
  }
  const [grid, setGrid] = useState(arr);

  // This state variable will determine what happens when the user clicks on a cell in the maze.
  const [mode, setMode] = useState("start");
  
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    let rowID = "row" + i;
    let cell =[];
    for (let idx = 0; idx < grid.length; idx++) {
      let cellID = "cell" + i + "-" + idx;
      cell[idx] = (<td onClick={() => editHandler(i, idx)} style={{backgroundColor: grid[i][idx] === 0 ? "gray" : grid[i][idx] === 's' ? "green" : grid[i][idx] === "g" ? "red" : grid[i][idx] === "x" ? "yellow" : grid[i][idx] === "p" ? "blue" : "black"}} className="cell" key={cellID} id={cellID}></td>)
    }

    rows[i] = (<tr key={i} id={rowID}>{cell}</tr>)
  }

  function editHandler(y, x) {
    stop();
    let copy = [];
    switch(mode) {
      case "obstacle":
        copy = copyArray(grid);
        copy[y][x] = 1;
        setGrid(copy);
        break;
      case "start":
        if (grid.some(row => row.includes('s'))) {
          alert("Maze already contains start.");
        } else {
        copy = copyArray(grid);
        copy[y][x] = 's';
        setGrid(copy);
        setMode("goal");
        setStartCoords([x,y]);
        }
        break;
      case "goal":
        if (grid.some(row => row.includes('g'))) {
          alert("Maze already contains goal.");
        } else {
        copy = copyArray(grid);
        copy[y][x] = 'g';
        setGrid(copy);
        setMode("obstacle");
        setGoalCoords([x,y]);
        }
        break;
        case "delete":
          copy = copyArray(grid);
          copy[y][x] = 0;
          setGrid(copy);
          break;
      default:
        break;
    }
  }

  function selectionHandler() {
    selectiveClear();
    if (!grid.some((row) => row.includes('g')) || !grid.some((row) => row.includes('s'))) {
      alert("Please choose a start and a goal.");
      return;
    }
    if (grid.some((row) => row.includes('x') || row.includes('p'))) return;
    switch(algorithm) {
      case "Depth First Search":
        let res = depthFirstSearch(copyArray(grid), startCoords);

        animate(res[0], 200);
        break;
      case "Breadth First Search" :
        let res1 = breadthFirstSearch(copyArray(grid), startCoords, goalCoords);

        animate(res1[0], 200);
        break;
      default:
        break;
    }
  }

  function clear() {
    stop();
    let arr = [[]];
    let arr1 = new Array(21);
    arr1.fill(0);
    for (let i = 0; i < 21; i++) {
      arr[i] = arr1;
    }
    setGrid(arr);
  }

  function handleRandomize() {
    clear();
    setGrid(arr);
    let frames = randomizeMaze(grid.length, grid[0].length);
    animate(frames, 50);
  }

  function selectiveClear() {
    stop();
    let array = copyArray(grid);

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] !== 0 && array[i][j] !== 1 && array[i][j] !== 's' && array[i][j] !== 'g') {
          array[i][j] = 0;
        }
      }
    }

    setGrid(array);
  }

  async function animate(frames, delay) {
    stop();
    let i = 0;
    let timer = setInterval(() => {
      setGrid(frames[i]);
      if (i >= frames.length - 1) {
        clearInterval(timer);
      }
      i++;
    }, delay);
    setGrid(frames[i]);
  }

  function stop() {
    for (let i = 0; i < 1000; i++) {
      window.clearInterval(i);
    }
  }

  return (
    <div className="App">
      <h1>Pathfinding Algorithm Visualization Tool</h1>
      <div className="button-container">
        <button className="buttons" onClick={() => setMode("start")}>Start</button>
        <button className="buttons" onClick={() => setMode("goal")}>Goal</button>
        <button className="buttons" onClick={() => setMode("obstacle")}>Obstacles</button>
        <button className="buttons" onClick={() => handleRandomize()}>Randomize</button>
        <button className="buttons" onClick={() => setMode("delete")}>Delete</button>
        <button className="buttons" onClick={() => clear()}>Clear</button>
      </div>
      <div className="grid-container">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <select className="buttons" onChange={(e) => {setAlgorithm(e.target.value)}}>
          <option>Depth First Search</option>
          <option>Breadth First Search</option>
          {/* <option>A*</option> */}
        </select>
        <button className="buttons" onClick={() => {selectionHandler()}}> Find Path</button>
      </div>
    </div>
  );
}

export default App;
