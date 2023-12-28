import { Mark } from '@/types';
import { MarkO } from './MarkO';
import { MarkX } from './MarkX';
import clsx from 'clsx';

export const Cell = ({
  onClick,
  value,
  isSuccess,
  position,
}: {
  onClick: () => void;
  value: Mark;
  isSuccess: boolean;
  position: number;
}) => {
  return (
    <div className="w-[100px] h-[100px]">
      <button
        style={{
          width: '100%',
          height: '100%',
          background: isSuccess ? '#EBFFFA' : '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className={clsx(
          position === 0 && 'rounded-tl-[18px]',
          position === 2 && 'rounded-tr-[18px]',
          position === 6 && 'rounded-bl-[18px]',
          position === 8 && 'rounded-br-[18px]'
        )}
        onClick={onClick}
        type="button"
      >
        {value && (value === 'X' ? <MarkX /> : <MarkO />)}
      </button>
    </div>
  );
};
