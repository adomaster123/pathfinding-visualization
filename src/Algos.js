let foundGoal = false;

export function depthFirstSearch(grid, startCoords) {
    let frames = [];
    foundGoal = false;

    depthFirstRecurse(grid, frames, startCoords, []);

    return [frames, foundGoal];
}

export function depthFirstRecurse(grid, frames, currentCoords, path) {
    if (foundGoal) return;
    if (currentCoords[0] < 0 || currentCoords[0] >= grid[0].length) return;
    if (currentCoords[1] < 0 || currentCoords[1] >= grid.length) return;
    if (grid[currentCoords[1]][currentCoords[0]] === 1) return;
    if (grid[currentCoords[1]][currentCoords[0]] === 'x') return;
    if (grid[currentCoords[1]][currentCoords[0]] === 'g') {
        foundGoal = true;
        for (let i = path.length - 1; i >= 0; i--) {
            grid[path[i][1]][path[i][0]] = 's';
            frames.push(copyArray(grid));
        }
        return;
    }

    grid[currentCoords[1]][currentCoords[0]] = 'x';
    if (!foundGoal) {
        frames.push(copyArray(grid));
    }
    path.push(currentCoords.slice());

    depthFirstRecurse(grid, frames, [currentCoords[0], currentCoords[1] - 1], copyArray(path));
    depthFirstRecurse(grid, frames, [currentCoords[0] + 1, currentCoords[1]], copyArray(path));
    depthFirstRecurse(grid, frames, [currentCoords[0] - 1, currentCoords[1]], copyArray(path));
    depthFirstRecurse(grid, frames, [currentCoords[0], currentCoords[1] + 1], copyArray(path));
}

export function copyArray(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++) {
      copy[i] = arr[i].slice();
    }
    return copy;
  }