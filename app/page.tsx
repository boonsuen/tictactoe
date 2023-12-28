'use client';

import clsx from 'clsx';
import { ModeToggleSwitch } from '@/components/ModeToggleSwitch';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import { Grid } from '@/components/Grid';
import { RestartButton } from '@/components/RestartButton';
import { Counters } from '@/components/Counters';

export default function HomePage() {
  const {
    grid,
    status,
    turn,
    successGrid,
    scores,
    mode,
    humanClick,
    reset,
    toggleMode,
  } = useTicTacToe();

  return (
    <main>
      <div className="flex flex-col items-center px-0 py-[25px]">
        <div className="flex justify-end w-full max-w-[302px]">
          <ModeToggleSwitch mode={mode} toggleMode={toggleMode} />
        </div>
        <h1
          className={clsx(
            'text-4xl font-extrabold',
            'block relative z-[1] mt-[15px] mb-[1.45rem]',
            'before:content-["ticTacToe"] before:absolute before:block before:w-full before:text-center',
            'before:bg-[linear-gradient(90deg,#007cf0_0%,#00dfd8_100%)]',
            'before:bg-clip-text before:text-transparent before:top-0 before:bottom-0 before:left-0 before:z-[0]'
          )}
        >
          <span
            className={clsx(
              'relative z-[1] transition-opacity duration-300 ease-in',
              'bg-clip-text text-transparent',
              mode === 'ROBOT' ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              backgroundImage:
                'linear-gradient(90deg, #7928ca 0%,#ff0080 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ticTacToe
          </span>
        </h1>
        <div>
          <div className="flex justify-between">
            <div className="text-lg">
              <span style={{ fontWeight: 800 }}>{turn}</span> Turn
            </div>
            <RestartButton reset={reset} />
          </div>
          <Grid
            {...{
              grid,
              status,
              turn,
              successGrid,
              mode,
              humanClick,
              reset,
            }}
          />
          <Counters scores={scores} />
        </div>
      </div>
    </main>
  );
}
