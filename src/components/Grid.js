import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import stepIcon from '../icons/play-next-button.png';
import trashIcon from '../icons/rubbish-bin-delete-button.png';
import playIcon from '../icons/play-arrow.png';
import randomIcon from '../icons/magic-wand-auto-fix-button.png';
import pauseIcon from '../icons/pause-button.png';

const StyledGrid = styled.div.attrs(props => ({
    style: {
      width: props.width,
      height: props.height,
      backgroundSize: `${props.cellSize}px ${props.cellSize}px`
    },
  }))`
    position: absolute;
    margin: 0 auto;
    background-color: #ffffff;
    background-image:
        linear-gradient(#000000 1px, transparent 1px),
        linear-gradient(90deg, #000000 1px, transparent 1px);`

const StyledControls = styled.div`
    display: inline-flex;
    justify-content: space-between;
    position: fixed;
    transform: translate(-50%, 0);
    left: 50%;
    border-radius: 1px;
    background-color: white;
    border: 1px solid #000000;
    width: 30rem;
    height: 5rem;
    right: 1%;
    bottom: 1%;
`
const StyledButton = styled.button`
    //display: inline-block;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 1px solid #000000;
`
const Grid = (props) => {
    const { cellSize, rows, cols } = props;

    const gridRef = useRef(null);
    const intervalRef = useRef();

    const [cells, setCells] = useState([]);
    const [grid, setGrid] = useState(createEmptyGrid());
    const [running, setRunning] = useState(false);
    const [intervalCount, setIntervalCount] = useState(0);

    useEffect(() => {
        setCells(populateCells());
    }, [grid])

    useEffect(() => {
        if (intervalCount > 0) {
            nextGeneration();
        }
    }, [intervalCount])

    function createEmptyGrid(random) {
        let grid = [];
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                if (random && Math.random() > .8) {
                    grid[y][x] = true;
                } else {
                    grid[y][x] = false;
                }
            }
        }

        return grid;
    }

    const getNeighborsCount = (grid, x, y) => {
        let neighbors = 0;

        let directions = [
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [0, -1]
        ]

        for (let i = 0; i < directions.length; i++) {
            let direction = directions[i];
            let neighborX = x + direction[1];
            let neighborY = y + direction[0];

            if (neighborX >= 0 && neighborX < cols && neighborY >= 0 && neighborY < rows && grid[neighborY][neighborX]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    const nextGeneration = () => {
        let newGrid = createEmptyGrid();

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                let neighbors = getNeighborsCount(grid, x, y);
                if (grid[y][x]) {
                    if (neighbors == 2 || neighbors == 3) {
                        newGrid[y][x] = true;
                    } else {
                        newGrid[y][x] = false;
                    }
                } else {
                    if (neighbors == 3) {
                        newGrid[y][x] = true;
                    }
                }
            }
        }

        setGrid(newGrid);

        intervalRef.current = setTimeout(() => {
            setIntervalCount(intervalCount => intervalCount + 1);
        }, 100)
    }

    const run = () => {
        setRunning(true);
        nextGeneration();
    }

    const stop = () => {
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
            intervalRef.current = null;
        }
        setRunning(false);
    }

    const step = () => {
        nextGeneration();
        clearInterval(intervalRef.current);
    }

    const random = () => {
        let grid = createEmptyGrid(true);

        setGrid(grid);
        setCells(populateCells());
    }

    const clear = () => {
        setGrid(createEmptyGrid());
        setCells(populateCells());
    }

    function populateCells() {
        let cells = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    const getElementOffset = () => {
        const rect = gridRef.current.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    const handleClick = (e) => {
        const offSet = getElementOffset();

        let scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        const x = Math.floor((e.clientX - offSet.x + scrollLeft) / cellSize);
        const y = Math.floor((e.clientY - offSet.y + scrollTop) / cellSize);

        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            let copy = [...grid];
            copy[y][x] = !copy[y][x];
            setGrid(copy);
        }
    }

    return (
        <div>
            <StyledGrid ref={gridRef} onClick={handleClick} {...props}>
                {cells.map((cell) => (
                    <Cell cellSize={cellSize} x={cell.x} y={cell.y} key={[cell.x, cell.y]} />
                ))}
            </StyledGrid>
            <StyledControls>
                { running ?
                    <StyledButton onClick={stop}>
                        <img src={pauseIcon} width={'100%'} height={'100%'} />
                    </StyledButton>:
                    <StyledButton onClick={run}>
                    <img src={playIcon} width={'100%'} height={'100%'} />
                    </StyledButton>}
                <StyledButton onClick={step}>
                    <img src={stepIcon} width={'100%'} height={'100%'} />
                </StyledButton>
                <StyledButton onClick={clear}>
                    <img src={trashIcon} width={'100%'} height={'100%'} />                    
                </StyledButton>
                <StyledButton onClick={random}>
                    <img src={randomIcon} width={'100%'} height={'100%'} />
                </StyledButton>
            </StyledControls>
        </div>
    )
}

export default Grid;
