import clsx from 'clsx';

export const RestartButton = ({ reset }: { reset: () => void }) => {
  return (
    <button
      className={clsx(
        'w-20 h-8 mb-3 rounded-[20px] text-sm bg-white',
        'shadow-[0px_0px_4px_rgba(168,208,255,0.33)]'
      )}
      style={{
        background: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.1) 22.4%,
              rgba(228, 234, 255, 0.38) 100%
            ),
            radial-gradient(
              50% 50% at 50% 50%,
              rgba(240, 242, 255, 0.78) 0%,
              #ffffff 100%
            )`,
      }}
      onClick={reset}
      type="button"
    >
      RESTART
    </button>
  );
};
