import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
    left: ${props => (props.cellSize * props.x + 1) }px;
    top: ${props => (props.cellSize * props.y + 1)}px;
    width: ${props => props.cellSize - 1}px;
    height: ${props => props.cellSize - 1}px;
    position: absolute;
    background-color: #984D6B;
`
const Cell = (props) => {
    return (
        <StyledCell {...props} />
    )
}

export default Cell;