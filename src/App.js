import { useState, useEffect} from 'react';
import './App.css';

function App() {
  // Declaring the state variable that will store the layout of the 20x20 maze
  let arr = [[]];
  let arr1 = new Array(20);
    arr1.fill(0);
  for (let i = 0; i < 20; i++) {
    arr[i] = arr1;
  }
  const [grid, setGrid] = useState(arr);
  const [mode, setMode] = useState("obstacle");

  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    let rowID = "row" + i;
    let cell =[];
    for (let idx = 0; idx < grid.length; idx++) {
      let cellID = "cell" + i + "-" + idx;
      cell.push(<td onClick={() => editHandler(i, idx)} style={{backgroundColor: grid[i][idx] == 0 ? "gray" : grid[i][idx] == 's' ? "green" : grid[i][idx] == "g" ? "red" : "black"}} className="cell" key={cellID} id={cellID}></td>)
    }

    rows.push(<tr key={i} id={rowID}>{cell}</tr>)
  }

  function editHandler(y, x) {
    switch(mode) {
      case "obstacle":
        let copy = grid.slice();
        copy[y][x] = 1;
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
        <button className="buttons">Start</button>
        <button className="buttons">Goal</button>
        <button className="buttons" onClick={() => setMode("obstacles")}>Obstacles</button>
        <button className="buttons">Randomize</button>
        <button className="buttons">Delete</button>
        <button className="buttons">Clear</button>
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
