import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const rows = HEIGHT / CELL_SIZE;
const cols = WIDTH / CELL_SIZE;

const StyledGrid = styled.div`
    position: relative;
    margin: 0 auto;
    background-color: #000;
    background-image:
        linear-gradient(#333 1px, transparent 1px),
        linear-gradient(90deg, #333 1px, transparent 1px);
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background-size: ${CELL_SIZE}px ${CELL_SIZE}px;
`
const Grid = (props) => {
    const gridRef = useRef(null);
    const [cells, setCells] = useState([]);

    const createEmptyGrid = () => {
        let grid = [];
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                grid[y][x] = false;
            }
        }

        return grid;
    }

    const [grid, setGrid] = useState(createEmptyGrid());

    const populateCells = () => {
        let cells = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x]) {
                    cells.push({x , y});
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

        const x = Math.floor((e.clientX - offSet.x) / CELL_SIZE);
        const y = Math.floor((e.clientY - offSet.y) / CELL_SIZE);

        if (x >= 0 && x <= cols && y>=0 && y <= rows) {
            let copy = [...grid];
            copy[y][x] = !copy[y][x];
            setGrid(copy);
        }

        setCells(populateCells());

        console.log(x, y);
        console.log(grid);
    }

    return (
        <div>
            <StyledGrid ref={gridRef} onClick={handleClick}>
                { cells.map((cell) => (
                    <Cell x={cell.x} y={cell.y}/>
                ))}
            </StyledGrid>
        </div>
    )
}

export default Grid;