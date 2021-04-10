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
        for (let i = path.length - 1; i >= 1; i--) {
            grid[path[i][1]][path[i][0]] = 'p';
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

export function breadthFirstSearch(grid, startCoords, goalCoords) {
    foundGoal = false;
    let frames = [];

    let cost = [[]];
    let cost1 = new Array(grid.length);
    cost1.fill(-1);
    for (let i = 0; i < grid[0].length; i++) {
        cost[i] = cost1.slice();
    }
    cost[startCoords[1]][startCoords[0]] = 0;
    let depth = 0;

    let unvisited = [];
    unvisited.unshift(startCoords);

    while (unvisited.length !== 0) {
        let currentCoords = unvisited.pop().slice();

        if (currentCoords[1] - 1 >= 0 && (grid[currentCoords[1] - 1][currentCoords[0]] === 0 || grid[currentCoords[1] - 1][currentCoords[0]] === 'g')) {
            unvisited.unshift([currentCoords[0], currentCoords[1] - 1]);
            cost[currentCoords[1] - 1][currentCoords[0]] = cost[currentCoords[1]][currentCoords[0]] + 1;
            if (grid[currentCoords[1] - 1][currentCoords[0]] === 'g') {
                foundGoal = true;
                break;
            }
            grid[currentCoords[1] - 1][currentCoords[0]] = 'x';
            if (depth !== cost[currentCoords[1] - 1][currentCoords[0]]) {
                frames.push(copyArray(grid));
                depth = cost[currentCoords[1] - 1][currentCoords[0]];
            }
        }

        if (currentCoords[0] + 1 < grid[0].length && (grid[currentCoords[1]][currentCoords[0] + 1] === 0 || grid[currentCoords[1]][currentCoords[0] + 1] === 'g')) {
            unvisited.unshift([currentCoords[0] + 1, currentCoords[1]]);
            cost[currentCoords[1]][currentCoords[0] + 1] = cost[currentCoords[1]][currentCoords[0]] + 1;
            if (grid[currentCoords[1]][currentCoords[0] + 1] === 'g') {
                foundGoal = true;
                break;
            }
            grid[currentCoords[1]][currentCoords[0] + 1] = 'x';
            if (depth !== cost[currentCoords[1]][currentCoords[0] + 1]) {
                frames.push(copyArray(grid));
                depth = cost[currentCoords[1]][currentCoords[0] + 1];
            }
        }

        if (currentCoords[1] + 1 < grid.length && (grid[currentCoords[1] + 1][currentCoords[0]] === 0 || grid[currentCoords[1] + 1][currentCoords[0]] === 'g')) {
            unvisited.unshift([currentCoords[0], currentCoords[1] + 1]);
            cost[currentCoords[1] + 1][currentCoords[0]] = cost[currentCoords[1]][currentCoords[0]] + 1;
            if (grid[currentCoords[1] + 1][currentCoords[0]] === 'g') {
                foundGoal = true;
                break;
            }
            grid[currentCoords[1] + 1][currentCoords[0]] = 'x';
            if (depth !== cost[currentCoords[1] + 1][currentCoords[0]]) {
                frames.push(copyArray(grid));
                depth = cost[currentCoords[1] + 1][currentCoords[0]];
            }
        }

        if (currentCoords[0] - 1 >= 0 && (grid[currentCoords[1]][currentCoords[0] - 1] === 0 || grid[currentCoords[1]][currentCoords[0 - 1]] === 'g')) {
            unvisited.unshift([currentCoords[0] - 1, currentCoords[1]]);
            cost[currentCoords[1]][currentCoords[0] - 1] = cost[currentCoords[1]][currentCoords[0]] + 1;
            if (grid[currentCoords[1]][currentCoords[0] - 1] === 'g') {
                foundGoal = true;
                break;
            }
            grid[currentCoords[1]][currentCoords[0] - 1] = 'x';
            if (depth !== cost[currentCoords[1]][currentCoords[0] - 1]) {
                frames.push(copyArray(grid));
                depth = cost[currentCoords[1]][currentCoords[0] - 1];
            }
        }
    }

    let currentCoords = goalCoords.slice();
    
    if (foundGoal) {
    while (cost[currentCoords[1]][currentCoords[0]] !== 0) {
        grid[currentCoords[1]][currentCoords[0]] = 'p';
        frames.push(copyArray(grid));
        let currentCost = cost[currentCoords[1]][currentCoords[0]];

        if (currentCoords[1] - 1 >= 0 && cost[currentCoords[1] - 1][currentCoords[0]] !== -1 && cost[currentCoords[1] - 1][currentCoords[0]] < currentCost) {
            currentCoords[1]--;
            continue;
        }
        if (currentCoords[0] + 1 >= 0 && cost[currentCoords[1]][currentCoords[0] + 1] !== -1 && cost[currentCoords[1]][currentCoords[0] + 1] < currentCost) {
            currentCoords[0]++;
            continue;
        }
        if (currentCoords[1] + 1 < grid.length && cost[currentCoords[1] + 1][currentCoords[0]] !== -1 && cost[currentCoords[1] + 1][currentCoords[0]] < currentCost) {
            currentCoords[1]++;
            continue;
        }
        if (currentCoords[0] - 1 >= 0 && cost[currentCoords[1]][currentCoords[0] - 1] !== -1 && cost[currentCoords[1]][currentCoords[0] - 1] < currentCost) {
            currentCoords[0]--;
            continue;
        }
    }
}
    console.log(cost);
    return [frames, foundGoal];
}

export function copyArray(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++) {
      copy[i] = arr[i].slice();
    }
    return copy;
  }