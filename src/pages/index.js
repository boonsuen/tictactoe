import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import RestartButton from './components/RestartButton';
import Cell from './components/Cell';

const Title = styled.h1`
  background: linear-gradient(90deg, #7928ca 0%,#ff0080 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
`;

export default function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 0'
    }}>
      <Helmet>
        <title>ticTacToe</title>
      </Helmet>
      <Title>ticTacToe</Title>
      <Game />
    </div>
  );
}

const clone = (x) => JSON.parse(JSON.stringify(x));

const generateGrid = (rows, columns, mapper) => {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper));
};

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

const checkThree = (a, b, c) => {
  if (!a || !b || !c) return false;
  return a === b && b === c;
};

const checkForWin = flatGrid => {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  );
};

const checkForDraw = flatGrid => {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  );
};

const NEXT_TURN = {
  O: "X",
  X: "O"
};

const getInitialState = () => ({
  grid: newTicTacToeGrid(),
  status: "inProgress",
  turn: "X"
});

const reducer = (state, action) => {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }
  switch (action.type) {
    case "RESET":
      return getInitialState();
    case "CLICK": {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }

      const nextState = clone(state);

      nextState.grid[y][x] = turn;

      const flatGrid = nextState.grid.flat(1);

      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }

    default:
      return state;
  }
};

const Game = () => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div style={{ display: "inline-block", maxWidth: 302 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div><span style={{ fontWeight: 800 }}>{turn}</span> Turn</div>
        <div>{status === "success" ? `${turn} won!` : null}</div>
        <RestartButton reset={reset} />
      </div>
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
};

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

const Grid = ({ grid, handleClick }) => {
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
            />
          ))
        )}
      </div>
    </GridContainer>
  );
};