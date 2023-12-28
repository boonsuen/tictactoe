import { Mark, Mode, Player, Status } from '@/types';
import { Cell } from './Cell';
import clsx from 'clsx';

const GridLine = ({ className }: { className?: string }) => (
  <div className={clsx('absolute bg-[#BFC7E3]', className)}></div>
);

interface GridProps {
  grid: Mark[][];
  status: Status;
  turn: Player;
  successGrid: {
    [key: string]: boolean;
  };
  humanClick: (x: number, y: number) => void;
  reset: () => void;
}

export const Grid = ({
  grid,
  status,
  turn,
  successGrid,
  humanClick,
  reset,
}: GridProps) => {
  return (
    <div className="relative inline-block">
      <GridLine className="top-[100px] w-full h-[1px] scale-x-0 animate-[expandX_0.5s_ease-out_0.2s_1_forwards,fadeIn_0.5s_ease-out_0.2s_1_forwards]" />
      <GridLine className="bottom-[100px] w-full h-[1px] scale-x-0 animate-[expandX_0.5s_ease-out_0.2s_1_forwards,fadeIn_0.5s_ease-out_0.2s_1_forwards]" />
      <GridLine className="left-[100px] w-[1px] h-full scale-y-0 animate-[expandY_0.5s_ease-out_0.2s_1_forwards,fadeIn_0.5s_ease-out_0.2s_1_forwards]" />
      <GridLine className="right-[100px] w-[1px] h-full scale-y-0 animate-[expandY_0.5s_ease-out_0.2s_1_forwards,fadeIn_0.5s_ease-out_0.2s_1_forwards]" />
      {status === 'success' && (
        <div
          className={clsx(
            'content-[""] absolute top-0 right-0 bottom-0 left-0',
            'flex flex-col items-center justify-center bg-[rgba(248,252,255,0.46)]',
            'rounded-[18px] backdrop-blur-[2px] opacity-0 animate-[fadeIn_0.4s_ease-out_0s_1_forwards]'
          )}
        >
          <div style={{ backdropFilter: 'blur(1px)', textAlign: 'center' }}>
            <div className="font-extrabold text-lg leading-[20px]">
              <span
                key="WonMessageSpan"
                className="font-extrabold"
                style={{
                  background:
                    turn === 'X'
                      ? 'linear-gradient(135deg, rgb(255 83 176) 0%,rgb(255 159 194) 100%)'
                      : 'linear-gradient(135deg, rgb(97 83 255) 0%,rgb(213 159 255) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {turn}
              </span>{' '}
              won!
            </div>
            <button
              className={clsx(
                'w-[99px] h-[35px] mt-[7px] border border-white',
                'text-white rounded-[20px] text-sm translate-y-[5px]',
                'animate-[moveUp_0.3s_ease_0s_1_forwards]'
              )}
              style={{
                background:
                  turn === 'X'
                    ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 100%), radial-gradient(50% 50% at 50% 50%, rgba(255, 23, 93, 0.78) 0%, #F14C74 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 100% ), radial-gradient( 50% 50% at 50% 50%, rgba(23, 58, 255, 0.78) 0%, #4c65f1 100%)',
                boxShadow: `0px 4px 4px rgba(178, 205, 238, 0.25),
                            0px 0px 4px rgba(62, 116, 255, 0.33)`,
              }}
              type="button"
              onClick={reset}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
      <div
        style={{
          backgroundColor: 'transparent',
          display: 'grid',
          gridTemplateRows: `repeat(${grid.length}), 1fr`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 1,
          borderRadius: '18px',
          boxShadow:
            '0 4px 20px rgb(54 195 255 / 8%)' +
            ', 0 4px 10px rgb(189 172 255 / 25%)',
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              onClick={() => {
                humanClick(colIdx, rowIdx);
              }}
              value={value}
              isSuccess={successGrid[`${rowIdx}-${colIdx}`]}
              position={rowIdx * 3 + colIdx}
            />
          ))
        )}
      </div>
    </div>
  );
};
