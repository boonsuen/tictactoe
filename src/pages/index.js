import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ModeToggleSwitch from './components/ModeToggleSwitch';
import RestartButton from './components/RestartButton';
import Grid from './components/Grid';
import Counters from './components/Counters';

const Title = styled.h1`
  margin-top: 15px;
  font-size: 36px;
  font-weight: 800;
  z-index: 1;
  position: relative;
  display: block;

  &::before {
    content: "ticTacToe";
    position: absolute;
    display: block;
    width: 100%;
    text-align: center;
    background-image: linear-gradient(90deg, #007cf0 0%,#00dfd8 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  span {
    background-image: linear-gradient(90deg, #7928ca 0%,#ff0080 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    z-index: 1;
    opacity: ${props => props.isRobotMode ? "1" : "0"};
    transition: opacity 0.3s ease-in;
  }
`;

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

  const winTrio = [
    {
      valueArr: [nw, n, ne],
      indexArr: [0, 1, 2]
    },
    {
      valueArr: [w, c, e],
      indexArr: [3, 4, 5]
    },
    {
      valueArr: [sw, s, se],
      indexArr: [6, 7, 8]
    },
    {
      valueArr: [nw, w, sw],
      indexArr: [0, 3, 6]
    },
    {
      valueArr: [n, c, s],
      indexArr: [1, 4, 7]
    },
    {
      valueArr: [ne, e, se],
      indexArr: [2, 5, 8]
    },
    {
      valueArr: [nw, c, se],
      indexArr: [0, 4, 8]
    },
    {
      valueArr: [ne, c, sw],
      indexArr: [2, 4, 6]
    }
  ];

  return winTrio.map(({ valueArr: pair, indexArr }) => {
    if (checkThree(...pair)) {
      return indexArr;
    } else {
      return false;
    }
  }).find(Boolean);
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

const getInitialState = (lastScores) => ({
  grid: newTicTacToeGrid(),
  status: "inProgress",
  turn: "X",
  successGrid: newTicTacToeGrid().reduce((acc, row, rowIdx) => {
    row.forEach((value, colIdx) => {
      acc[`${rowIdx}-${colIdx}`] = false;  
    });
    return acc;
  }, {}),
  scores: lastScores || {
    X: 0,
    O: 0,
    tie: 0
  },
  isRobotMode: true
});

const reducer = (state, action) => {
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }
  switch (action.type) {
    case "RESET":
      return getInitialState(state.scores);
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
        const successIndexArr = checkForWin(flatGrid);
        nextState.status = "success";
        Object.keys(nextState.successGrid).forEach((key, idx) => {
          if (successIndexArr.some(el => el === idx)) {
            nextState.successGrid[key] = true            
          }
        });

        nextState.scores[nextState.turn] += 1;
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        nextState.scores.tie += 1;
        return getInitialState(nextState.scores);
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }
    case "TOGGLE_ROBOT_MODE": {
      const nextState = clone(state);
      nextState.isRobotMode = !nextState.isRobotMode;
      return nextState;
    }

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const { grid, status, turn, successGrid, scores, isRobotMode } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const toggleRobotMode = () => {
    dispatch({ type: "TOGGLE_ROBOT_MODE" });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '25px 0'
    }}>
      <Helmet>
        <title>ticTacToe</title>
      </Helmet>
      <div style={{width: 302, display: 'flex', justifyContent: 'flex-end'}}>
        <ModeToggleSwitch
          isRobotMode={isRobotMode}
          toggleRobotMode={toggleRobotMode}
        />
      </div>
      <Title isRobotMode={isRobotMode}><span>ticTacToe</span></Title>
      <div style={{ display: "inline-block", maxWidth: 302 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><span style={{ fontWeight: 800 }}>{turn}</span> Turn</div>        
          <RestartButton reset={reset} />
        </div>
        <Grid
          {...{
            grid,
            status,
            turn,
            successGrid,
            handleClick,
            reset
          }}
        />
        <Counters scores={scores} />
      </div>
    </div>
  );
}