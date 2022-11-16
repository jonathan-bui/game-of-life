import React from 'react';
import styled from 'styled-components';

const CELL_SIZE = 20;

const StyledCell = styled.div`
    left: ${(props) => (CELL_SIZE * props.x + 1) }px;
    top: ${(props) => (CELL_SIZE * props.y + 1)}px;
    width: ${CELL_SIZE - 1}px;
    height: ${CELL_SIZE - 1}px;
    position: absolute;
    background-color: blue;
`

const Cell = (props) => {
    return (
        <StyledCell {...props} />
    )
}

export default Cell;