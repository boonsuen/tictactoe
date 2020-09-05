import React from 'react';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  from {
    transform: scale(0, 0);
    transform-origin: center center;
  }

  to {
    transform: scale(1, 1);
    transform-origin: center center;
  }
`;

const StyledPath = styled.path`
  animation: ${scale} 0.1s ease-out 1 forwards;
  transform: scale(0, 0);
`;

export default function IconX() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <StyledPath d="M.64,14.16,14.16.64A1.77,1.77,0,0,1,16.62.4a1.77,1.77,0,0,1-.24,2.46L2.86,16.37a1.77,1.77,0,0,1-2.46.24A1.77,1.77,0,0,1,.64,14.16Z" style={{ fill: "#003b94" }} />
      <StyledPath d="M14.16,16.37.64,2.86A1.77,1.77,0,0,1,.4.4,1.77,1.77,0,0,1,2.86.64L16.37,14.16a1.77,1.77,0,0,1,.24,2.46A1.77,1.77,0,0,1,14.16,16.37Z" style={{ fill: "#003b94" }} />
    </svg>
  );
}
