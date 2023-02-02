function easyPlay(tiles) {
    //easy level - random play
    const openSpots = tiles.filter(el => el.play === null);
    const randomId = Math.floor(Math.random() * openSpots.length);

    return openSpots[randomId].id;
}

function tilesToGrid(tiles) {
    //re-arrange the gameboard into a 2D grid
    let grid = [];
    let id = 0;

    for (let row = 0; row < 3; row++) {
        let line = [];

        for (let col = 0; col < 3; col++) {
            let tile = tiles.filter(tile => tile.id === id);
            line.push(tile[0]);
            id++
        }
        grid.push(line);
    }
    return grid;
}

function gridToMasterGrid(grid) {
    let masterGrid = [];

    //horizontal lines
    masterGrid.push(...grid);

    //vertical lines
    let verticalGrid = [];
    for (let col = 0; col < 3; col ++) {
        let line = [];

        for (let row = 0; row < 3; row ++) {
            line.push(grid[row][col]);
        }

        verticalGrid.push(line);
    }

    masterGrid.push(...verticalGrid);

    //diagonal lines
    let diagonalGrid = [];
    let diag1 = [];
    let diag2 = [];

    for (let row = 0; row < 3; row ++) {
        diag1.push(grid[row][row]);
    }
    diagonalGrid.push(diag1);

    let col = 2;
    for (let row = 0; row < 3; row ++) {
        diag2.push(grid[row][col]);
        col--;
    }
    diagonalGrid.push(diag2);

    masterGrid.push(...diagonalGrid);

    return masterGrid;
}

function getPotentialWins(masterGrid, turn) {
    let locations = [];

    masterGrid.forEach(line => {
        let playedSpots = line.filter(tile => tile.play !== null);

        if (playedSpots.length === 2) {
            let play0 = playedSpots[0].play;
            let play1 = playedSpots[1].play;

            if (play0 === play1 && play0 === turn) {
                let openSpot = line.filter(tile => tile.play === null);
                locations.push(...openSpot);
            }
        }
    })
    return locations;
}

function mediumPlay(tiles, cpuTurn, playerTurn) {
    //medium level - random play + blocks&easy wins
    const grid = tilesToGrid(tiles);
    const masterGrid = gridToMasterGrid(grid);

    //easy win
    let potentialWins = getPotentialWins(masterGrid, cpuTurn);

    if (potentialWins.length > 0) {
        let move = potentialWins[0];
        return move.id;
    }

    //block moves
    let potentialLoss = getPotentialWins(masterGrid, playerTurn);

    if (potentialLoss.length > 0) {
        let move = potentialLoss[0];
        return move.id;
    }
}

function hardPlay(tiles, cpuTurn, playerTurn) {
    //unbeatable level
    //must return id of selected tile

    //must block or take easy wins
    let smartMove = mediumPlay(tiles, cpuTurn, playerTurn);

    if (smartMove !== undefined) {
        return smartMove;
    }

    //GRID:
    /*  0 | 1 | 2
     *  3 | 4 | 5
     *  6 | 7 | 8
     *
     * sides: 1, 3, 5, 7 (all odd)
     * corners: 0, 2, 6, 8 (all even, except 4)
     * middle: 4.
     */

    let corners = tiles.filter(tile => tile.id % 2 === 0 && tile.id !== 4); //(all even, except 4)
    let sides = tiles.filter(tile => tile.id % 2 !== 0); //(all odd)
    let middle = tiles[4];

    let openSpots = tiles.filter(tile => tile.play === null);
    let openCorners = corners.filter(tile => tile.play === null);
    let openSides = sides.filter(tile => tile.play === null);


    //identify which turn number
    let cpuMoves = tiles.filter(tile => tile.play === cpuTurn);
    let playerMoves = tiles.filter(tile => tile.play === playerTurn);

    let round = 9 - openSpots.length;

    //starts First: rounds, 0, 2, 4
    //Fill out later

    //starts second: rounds 1 & 3
    if (round === 1 && middle.play === null) {
        return middle.id;
    } else if (round === 1) {
        let randomPlay = Math.floor(Math.random() * openCorners.length);
        return openCorners[randomPlay].id;
    }

    if (round === 3 && openSides.length === 4) {
        //if middle taken by opponent, pick corner
        if (middle.play === playerTurn) {
            let randomPlay = Math.floor(Math.random() * openCorners.length);
            return openCorners[randomPlay].id;
        }

        //find previous corner move (if any)
        let filtered = corners.filter(tile => tile.play === cpuTurn);

        //if none, pick any side
        if (filtered.length === 0) {
            let randomPlay = Math.floor(Math.random() * openSides.length);
            return openSides[randomPlay].id;
        }

        //otherwise pick side next to already placed move
        let firstCorner = corners[0];

        if (firstCorner.id === 0) {
            if (tiles[1].play === null) {
                return tiles[1].id;
            } else {
                return tiles[3].id;
            }
        } else if (firstCorner.id === 2) {
            if (tiles[1].play === null) {
                return tiles[1].id;
            } else {
                return tiles[5].id;
            }
        } else if (firstCorner.id === 6) {
            if (tiles[3].play === null) {
                return tiles[3].id;
            } else {
                return tiles[7].id;
            }
        } else if (firstCorner.id === 8) {
            if (tiles[7].play === null) {
                return tiles[7].id;
            } else {
                return tiles[5].id;
            }
        }

    } else if (round === 3) {
        //place move between 2 empty sides
        if (openCorners.length === 4) {
            let takenSides = sides.filter(tile => tile.play === playerTurn);

            if (takenSides[0].id === 1){
                if (tiles[5].play === null) {
                    return tiles[8].id;
                }
                return tiles[0].id;
            } else if (takenSides[0].id === 5){
                if (tiles[7].play === null) {
                    return tiles[6].id;
                }
                return tiles[2].id;
            } else if (takenSides[0].id === 7){
                if (tiles[3].play === null) {
                    return tiles[0].id;
                }
                return tiles[8].id;
            } else if (takenSides[0].id === 3){
                if (tiles[1].play === null) {
                    return tiles[2].id;
                }
                return tiles[6].id;
            }
        }

        //find corner with empty sides
        let takenCorners = corners.filter(tile => tile.play === playerTurn);

        if (takenCorners[0].id === 0){
            if (tiles[1].play === null && tiles[2].play === null && tiles[5].play === null) {
                return tiles[2].id;
            }
            return tiles[7].id;
        } else if (takenCorners[0].id === 2){
            if (tiles[5].play === null && tiles[8].play === null && tiles[7].play === null) {
                return tiles[8].id;
            }
            return tiles[0].id;
        } else if (takenCorners[0].id === 8){
            if (tiles[7].play === null && tiles[6].play === null && tiles[3].play === null) {
                return tiles[6].id;
            }
            return tiles[2].id;
        } else if (takenCorners[0].id === 6){
            if (tiles[3].play === null && tiles[0].play === null && tiles[1].play === null) {
                return tiles[0].id;
            }
            return tiles[8].id;
        }

    }
}


export default function computerPlay(tiles, level) {
    const cpuTurn = 1;
    const playerTurn = 0;
    let play;

    if (level === '1') {
        play = mediumPlay(tiles, cpuTurn, playerTurn);
    }

    if (level === '2') {
        play = hardPlay(tiles, cpuTurn, playerTurn);
    }

    return play === undefined ? easyPlay(tiles) : play;
}
