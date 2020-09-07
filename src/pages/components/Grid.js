import React from 'react';
import styled, { keyframes } from 'styled-components';
import Cell from './Cell';

const GridContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const expandX = keyframes`
  to {
    transform: scaleX(1);
  }
`;

const expandY = keyframes`
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

const moveUp = keyframes`
  to {
    transform: translateY(0px);
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

const Overlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(248, 252, 255, 0.46);
  border-radius: 18px;
  backdrop-filter: blur(2px);
  opacity: 0;
  animation: ${fadeIn} 0.4s ease-out 0s 1 forwards;

  button {
    width: 99px;
    height: 35px;
    margin-top: 7px;
    background: ${props =>
      props.turn === 'X'
        ? "linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 23, 93, 0.78) 0%, #F14C74 100%);"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 100% ), radial-gradient( 50% 50% at 50% 50%, rgba(23, 58, 255, 0.78) 0%, #4c65f1 100% );"}
    border: 1px solid #ffffff;
    box-shadow: 0px 4px 4px rgba(178, 205, 238, 0.25),
      0px 0px 4px rgba(62, 116, 255, 0.33);
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    transform: translateY(5px);
    animation: ${moveUp} 0.3s ease 0s 1 forwards;
  }
`;

const WonMessage = styled.div`
  font-weight: 800;
  line-height: 20px;

  span {
    background: ${props =>
      props.turn === "X"
        ? "linear-gradient(135deg, rgb(255 83 176) 0%,rgb(255 159 194) 100%);"
        : "linear-gradient(135deg, rgb(97 83 255) 0%,rgb(213 159 255) 100%);"}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
  }
`;

const Grid = ({ grid, status, turn, successGrid, handleClick, reset }) => {
  return (
    <GridContainer status={status}>      
      <GridLine />
      <GridLine />
      <GridLine />
      <GridLine />
      {status === 'success'
        ? <Overlay status={status} turn={turn}>
            <div style={{ backdropFilter: 'blur(1px)', textAlign: 'center'}}>
              <WonMessage turn={turn}>
                <span key="WonMessageSpan">{turn}</span> won!
              </WonMessage>         
              <button type="button" onClick={reset}>CONTINUE</button>
            </div>
          </Overlay>
        : null}
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