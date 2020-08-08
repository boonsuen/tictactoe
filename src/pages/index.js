import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

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
      margin: '40px 0'
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
    <div style={{ display: "inline-block" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>{turn} Turn</div>
        <div>{status === "success" ? `${turn} won!` : null}</div>
        <button 
          style={{
            width: 80,
            height: 32,
            borderRadius: '17px',
            fontSize: 16,
            backgroundColor: '#fff',
            boxShadow: '0 0 4px rgb(47 105 255 / 25%)',
            marginBottom: 12
          }}
          onClick={reset} 
          type="button"
        >
          Restart
        </button>
      </div>
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
};

const Grid = ({ grid, handleClick }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          backgroundColor: "#BFC7E3",
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
    </div>
  );
};

const StyledCell = styled.div`
  width: 100px;
  height: 100px;

  &:first-child button {
    border-top-left-radius: 18px;
  }
  &:nth-child(3) button {
    border-top-right-radius: 18px;
  }
  &:nth-child(7) button {
    border-bottom-left-radius: 18px;
  }
  &:last-child button {
    border-bottom-right-radius: 18px;
  }
`;

const Cell = ({ onClick, value }) => {
  return (
    <StyledCell>
      <button
        style={{ 
          width: "100%", 
          height: "100%",
          background: "#fff"
        }}
        onClick={onClick}
        type="button"
      >
        {value}
      </button>
    </StyledCell>
  );
};