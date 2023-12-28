export const MarkO = () => {
  return (
    <svg width="20" height="20">
      <path
        style={{
          stroke: '#1e0094',
          strokeDasharray: 50,
          strokeDashoffset: 50,
          strokeWidth: 3,
          fill: 'transparent',
        }}
        d="M10,10 m0,-7.875 a 7.875,7.875 0 0,1 0,15.75 a 7.875,7.875 0 0,1 0,-15.875"
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="0.19s"
          to="-0"
          repeatCount="1"
          fill="freeze"
        />
      </path>
    </svg>
  );
};
