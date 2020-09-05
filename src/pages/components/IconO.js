import React from 'react';
import styled from 'styled-components';

const StyledPath = styled.path`
  stroke: #1E0094; 
  stroke-dasharray: 50; 
  stroke-dashoffset: 50; 
  stroke-width: 3; 
  fill: transparent;
`;

export default function IconO() {
  return (
    <svg width="20" height="20">
      <StyledPath d="M10,10 m0,-7.875 a 7.875,7.875 0 0,1 0,15.75 a 7.875,7.875 0 0,1 0,-15.875">
        <animate attributeName="stroke-dashoffset" dur="0.19s" to="-0" repeatCount="1" fill="freeze"/>
      </StyledPath>
    </svg>
  );
}
