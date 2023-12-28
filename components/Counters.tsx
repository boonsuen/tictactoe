import { Scores } from '@/types';
import clsx from 'clsx';

const Counter = ({ player, score }: { player: 'X' | 'O'; score: number }) => {
  return (
    <div
      className={clsx(
        'relative h-[36pxx] p-[0_0_0_14px] rounded-[4px]',
        'font-extrabold text-sm leading-[36px]',
        player === 'X' ? 'bg-[#FFE4E4]' : 'bg-[#E4F5FF]'
      )}
    >
      <span>Player {player}</span>
      <span className="absolute font-light text-2xl right-[10px] top-[-17px]">
        {score}
      </span>
    </div>
  );
};

export const Counters = ({ scores }: { scores: Scores }) => {
  return (
    <div className="grid gap-x-6 grid-cols-2 mt-9">
      <Counter player="X" score={scores.X} />
      <Counter player="O" score={scores.O} />
      <div className="w-[95px] mt-4 p-[0_0_0_14px] border-l-[3px] border-[#EBFFFA] font-extrabold text-sm">
        Tie - {scores.tie}
      </div>
    </div>
  );
};
