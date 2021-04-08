import { useState, useEffect} from 'react';
import './App.css';

function App() {
  // State variables for width and height of maze
  const [mazeWidth, setMazeWidth] = useState(20);
  const [mazeHeight, setMazeHeight] = useState(20);
  // Declaring the state variable that will store the layout of the maze
  let arr = [[]];
  let arr1 = new Array(20);
    arr1.fill(0);
  for (let i = 0; i < 20; i++) {
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
      cell[idx] = (<td onClick={() => editHandler(i, idx)} style={{backgroundColor: grid[i][idx] == 0 ? "gray" : grid[i][idx] == 's' ? "green" : grid[i][idx] == "g" ? "red" : "black"}} className="cell" key={cellID} id={cellID}></td>)
    }

    rows[i] = (<tr key={i} id={rowID}>{cell}</tr>)
  }

  function editHandler(y, x) {
    let copy = [];
    switch(mode) {
      case "obstacle":
        for (let i = 0; i < grid.length; i++) {
          copy[i] = grid[i].slice();
        }
        copy[y][x] = 1;
        setGrid(copy);
        break;
      case "start":
        if (grid.some(row => row.includes('s'))) {
          alert("Maze already contains start.");
        } else {
        for (let i = 0; i < grid.length; i++) {
          copy[i] = grid[i].slice();
        }
        copy[y][x] = 's';
        setGrid(copy);
        }
        break;
      case "goal":
        if (grid.some(row => row.includes('g'))) {
          alert("Maze already contains goal.");
        } else {
        for (let i = 0; i < grid.length; i++) {
          copy[i] = grid[i].slice();
        }
        copy[y][x] = 'g';
        setGrid(copy);
        }
        break;
        case "delete":
          for (let i = 0; i < grid.length; i++) {
            copy[i] = grid[i].slice();
          }
          copy[y][x] = 0;
          setGrid(copy);
          break;
      default:
        break;
    }
  }
  return (
    <div className="App">
      <h1>Pathfinding Algorithm Visualization Tool</h1>
      <div className="button-container">
        <button className="buttons" onClick={() => setMode("start")}>Start</button>
        <button className="buttons" onClick={() => setMode("goal")}>Goal</button>
        <button className="buttons" onClick={() => setMode("obstacle")}>Obstacles</button>
        <button className="buttons">Randomize</button>
        <button className="buttons" onClick={() => setMode("delete")}>Delete</button>
        <button className="buttons" onClick={() => setGrid(arr)}>Clear</button>
      </div>
      <div className="grid-container">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <select className="buttons">
          <option>Breadth First Search</option>
          <option>Depth First Search</option>
          <option>A*</option>
        </select>
        <button className="buttons"> Find Path</button>
      </div>
    </div>
  );
}

export default App;
