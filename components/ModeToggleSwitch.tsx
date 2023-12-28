import React from 'react';

import Image from 'next/image';
import { Mode } from '@/types';

import img_robot from '@/public/images/robot.svg';
import img_human from '@/public/images/human.svg';
import clsx from 'clsx';

export const ModeToggleSwitch = ({
  mode,
  toggleMode,
}: {
  mode: Mode;
  toggleMode: () => void;
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleMode();
  };

  return (
    <div
      className={clsx(
        'relative inline-block w-[68px] h-[30px] align-middle select-none'
      )}
    >
      <input
        className="hidden"
        type="checkbox"
        name="modeToggleSwitch"
        id="modeToggleSwitch"
        checked={mode === 'ROBOT'}
        onChange={onChange}
      />
      <label
        className={clsx(
          'block overflow-hidden cursor-pointer',
          'border-0 border-solid border-[#CCC]',
          'rounded-[5px] m-0'
        )}
        htmlFor="modeToggleSwitch"
      >
        <span
          className={clsx(
            'block w-[200%] [transition:margin_0.3s_ease-in_0s]',
            'before:block before:float-left before:w-[50%] before:h-[30px] before:p-0 before:box-border',
            'after:block after:float-left after:w-[50%] after:h-[30px] after:p-0 after:box-border',
            'before:content-[""] before:pl-[10px] before:bg-[#FFE5E5] before:color-[#FFF]',
            'after:content-[""] after:pr-[10px] after:bg-[#E9EFFF] after:color-[#FFF]',
            mode === 'ROBOT' ? 'ml-0' : 'ml-[-100%]'
          )}
        ></span>
        <span
          className={clsx(
            'grid place-items-center w-[30px] absolute top-0 bottom-0',
            'border-0 border-solid border-[#CCC] rounded-[5px]',
            '[transition:all_0.3s_ease-in_0s]',
            {
              'bg-[#FF8888] shadow-[0px_0px_4px_#FECFFF]': mode === 'ROBOT',
              'bg-[#85A0FF] shadow-[0px_0px_4px_#CFF4FF]': mode === 'HUMAN',
            },
            mode === 'ROBOT' ? 'right-0' : 'right-[40px]'
          )}
        >
          {mode === 'ROBOT' ? (
            <Image src={img_robot} alt="Robot Mode" />
          ) : (
            <Image src={img_human} alt="Human Mode" />
          )}
        </span>
      </label>
    </div>
  );
};
