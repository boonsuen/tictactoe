import { Mark, Mode, Player, Scores, Status } from '@/types';
import { clone } from '@/utils';
import { useReducer } from 'react';

const generateGrid = (
  rows: number,
  columns: number,
  mapper: (value: any, index: number, array: any[]) => Mark
) => {
  return Array.from({
    length: rows,
  }).map(() =>
    Array.from({
      length: columns,
    }).map(mapper)
  );
};

const newTicTacToeGrid = (): Mark[][] => generateGrid(3, 3, () => null);

const checkThree = (a: Mark, b: Mark, c: Mark) => {
  if (!a || !b || !c) return false;
  return a === b && b === c;
};

const checkForWin = (flatGrid: Mark[]) => {
  const [nw, n, ne, w, c, e, sw, s, se] = flatGrid;

  const winTrio: {
    valueArr: [Mark, Mark, Mark];
    indexArr: [number, number, number];
  }[] = [
    {
      valueArr: [nw, n, ne],
      indexArr: [0, 1, 2],
    },
    {
      valueArr: [w, c, e],
      indexArr: [3, 4, 5],
    },
    {
      valueArr: [sw, s, se],
      indexArr: [6, 7, 8],
    },
    {
      valueArr: [nw, w, sw],
      indexArr: [0, 3, 6],
    },
    {
      valueArr: [n, c, s],
      indexArr: [1, 4, 7],
    },
    {
      valueArr: [ne, e, se],
      indexArr: [2, 5, 8],
    },
    {
      valueArr: [nw, c, se],
      indexArr: [0, 4, 8],
    },
    {
      valueArr: [ne, c, sw],
      indexArr: [2, 4, 6],
    },
  ];

  return winTrio
    .map(({ valueArr: pair, indexArr }) => {
      if (checkThree(...pair)) {
        return indexArr;
      } else {
        return false;
      }
    })
    .find(Boolean);
};

const checkForDraw = (flatGrid: Mark[]) => {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  );
};

const NEXT_TURN: {
  [key in Player]: Player;
} = {
  O: 'X',
  X: 'O',
};

type State = {
  grid: Mark[][];
  status: Status;
  turn: Player;
  mode: Mode;
  successGrid: {
    [key: string]: boolean;
  };
  scores: Scores;
};

enum ActionType {
  RESET = 'RESET',
  HUMAN_CLICK = 'HUMAN_CLICK',
  ROBOT_CLICK = 'ROBOT_CLICK',
  TOGGLE_MODE = 'TOGGLE_MODE',
}

type Action =
  | {
      type: ActionType.HUMAN_CLICK;
      payload: {
        x: number;
        y: number;
      };
    }
  | {
      type: ActionType.ROBOT_CLICK;
    }
  | {
      type: ActionType.RESET;
    }
  | {
      type: ActionType.TOGGLE_MODE;
    };

const getInitialState = (lastScores?: Scores, mode?: Mode): State => ({
  grid: newTicTacToeGrid(),
  status: 'inProgress',
  turn: 'X',
  mode: mode || 'ROBOT',
  successGrid: newTicTacToeGrid().reduce(
    (
      acc: {
        [key: string]: boolean;
      },
      row,
      rowIdx
    ) => {
      row.forEach((value, colIdx) => {
        acc[`${rowIdx}-${colIdx}`] = false;
      });
      return acc;
    },
    {}
  ),
  scores: lastScores || {
    X: 0,
    O: 0,
    tie: 0,
  },
});

const reducer = (state: State, action: Action): State => {
  if (state.status === 'success' && action.type !== 'RESET') {
    return state;
  }
  switch (action.type) {
    case 'RESET':
      return getInitialState(state.scores, state.mode);
    case 'HUMAN_CLICK': {
      const { x, y } = action.payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }

      const nextState = clone(state);

      nextState.grid[y][x] = turn;

      const flatGrid = nextState.grid.flat(1);

      const successIndexArr = checkForWin(flatGrid);
      if (successIndexArr) {
        nextState.status = 'success';
        Object.keys(nextState.successGrid).forEach((key, idx) => {
          if (successIndexArr.some((el) => el === idx)) {
            nextState.successGrid[key] = true;
          }
        });

        nextState.scores[nextState.turn] += 1;
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        nextState.scores.tie += 1;
        return getInitialState(nextState.scores, nextState.mode);
      }

      nextState.turn = NEXT_TURN[turn];

      if (nextState.mode === 'ROBOT') {
        return reducer(nextState, { type: ActionType.ROBOT_CLICK });
      }

      return nextState;
    }
    case 'ROBOT_CLICK': {
      const { grid, turn } = state;

      const nextState = clone(state);

      const bestMove = getBestMove(grid.flat(1));
      const bestMoveX = bestMove % 3;
      const bestMoveY = Math.floor(bestMove / 3);
      nextState.grid[bestMoveY][bestMoveX] = turn;

      const flatGrid = nextState.grid.flat(1);

      const successIndexArr = checkForWin(flatGrid);
      if (successIndexArr) {
        nextState.status = 'success';
        Object.keys(nextState.successGrid).forEach((key, idx) => {
          if (successIndexArr.some((el) => el === idx)) {
            nextState.successGrid[key] = true;
          }
        });

        nextState.scores[nextState.turn] += 1;
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        nextState.scores.tie += 1;
        return getInitialState(nextState.scores, nextState.mode);
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }
    case 'TOGGLE_MODE': {
      return getInitialState(
        state.scores,
        state.mode === 'ROBOT' ? 'HUMAN' : 'ROBOT'
      );
    }

    default:
      return state;
  }
};

export const useTicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const { grid, status, turn, successGrid, scores, mode } = state;

  const humanClick = (x: number, y: number) => {
    dispatch({ type: ActionType.HUMAN_CLICK, payload: { x, y } });
  };

  const reset = () => {
    dispatch({ type: ActionType.RESET });
  };

  const toggleMode = () => {
    dispatch({ type: ActionType.TOGGLE_MODE });
  };

  return {
    grid,
    status,
    turn,
    successGrid,
    scores,
    mode,
    humanClick,
    reset,
    toggleMode,
  };
};

const USER_TURN: Player = 'X';
const ROBOT_TURN: Player = 'O';
const scoreMap = new Map([
  [USER_TURN, -1],
  [ROBOT_TURN, 1],
  ['TIE', 0],
]);

// -- Recursive minimax algorithm to calculate the move with the maximum score
const minimax = (
  grid: Mark[],
  depth: number,
  isMaximizing: boolean
): number => {
  const successIndexArr = checkForWin(grid);
  if (successIndexArr) {
    const winner = grid[successIndexArr[0]];
    return scoreMap.get(winner as Player)!;
  }

  if (checkForDraw(grid)) {
    return scoreMap.get('TIE')!;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < grid.length; i++) {
    // Is the spot available?
    if (grid[i] === null) {
      grid[i] = isMaximizing ? ROBOT_TURN : USER_TURN;
      const score = minimax(grid, depth + 1, !isMaximizing);
      grid[i] = null;
      // Compare between score and bestScore, and then
      // assign the larger/lower score to the bestScore
      bestScore = isMaximizing
        ? Math.max(score, bestScore)
        : Math.min(score, bestScore);
    }
  }
  return bestScore;
};

// -- Obtain the best move for robot
function getBestMove(grid: Mark[]): number {
  // AI to make its turn
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < grid.length; i++) {
    // Is the spot available?
    if (grid[i] === null) {
      grid[i] = ROBOT_TURN;
      // Get the score of this position
      const score = minimax(grid, 0, false);
      grid[i] = null;
      // Check if the score is the highest
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}
