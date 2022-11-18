import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div.attrs(props => ({
    style: {
        left: `${props.cellSize * props.x + .5}px`,
        top: `${props.cellSize * props.y + .5}px`,
        width: `${props.cellSize - .5}px`,
        height: `${props.cellSize - .5}px`,
    }
}))`
    position: absolute;
    background-color: #000000;`;

const Cell = (props) => {
    return (
        <StyledCell {...props} />
    )
}

export default Cell;
