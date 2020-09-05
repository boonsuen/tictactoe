import React from 'react';
import styled, { keyframes } from 'styled-components';
import Cell from './Cell';

const GridContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const expandX = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

const expandY = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const GridLine = styled.div`
  position: absolute;
  background-color: #BFC7E3;

  &:first-child {
    top: 100px;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    animation: ${expandX} 0.5s ease-out 0.2s 1 forwards,
      ${fadeIn} 0.5s ease-out 0.2s 1 forwards;  }

  &:nth-child(2) {
    bottom: 100px;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    animation: ${expandX} 0.5s ease-out 0.2s 1 forwards,
      ${fadeIn} 0.5s ease-out 0.2s 1 forwards;  }

  &:nth-child(3) {
    left: 100px;
    width: 1px;
    height: 100%;
    transform: scaleY(0);
    animation: ${expandY} 0.5s ease-out 0.2s 1 forwards,
      ${fadeIn} 0.5s ease-out 0.2s 1 forwards;  }

  &:nth-child(4) {
    right: 100px;
    width: 1px;
    height: 100%;
    transform: scaleY(0);
    animation: ${expandY} 0.5s ease-out 0.2s 1 forwards,
      ${fadeIn} 0.5s ease-out 0.2s 1 forwards;  }
`;

const Grid = ({ grid, successGrid, handleClick }) => {
  return (
    <GridContainer>
      <GridLine />
      <GridLine />
      <GridLine />
      <GridLine />
      <div
        style={{
          backgroundColor: "transparent",
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}), 1fr`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 1,
          borderRadius: "18px",
          boxShadow: "0 4px 20px rgb(54 195 255 / 8%)"
           + ", 0 4px 10px rgb(189 172 255 / 25%)"
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              onClick={() => {
                handleClick(colIdx, rowIdx);
              }}
              value={value}
              isSuccess={successGrid[`${rowIdx}-${colIdx}`]}
            />
          ))
        )}
      </div>
    </GridContainer>
  );
};

export default Grid;