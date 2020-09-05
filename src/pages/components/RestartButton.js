import React from 'react';
import styled from 'styled-components';

const StyledRestartButton = styled.button`
  width: 80px;
  height: 32px;
  margin-bottom: 12px;
  border-radius: 17px;
  font-size: 14px;
  background-color: #fff;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 22.4%,
      rgba(228, 234, 255, 0.38) 100%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(240, 242, 255, 0.78) 0%,
      #ffffff 100%
    );
  box-shadow: 0px 0px 4px rgba(168, 208, 255, 0.33);
  border-radius: 20px;
`;

const RestartButton = ({ reset }) => (
  <StyledRestartButton
    onClick={reset} 
    type="button"
  >
    RESTART
  </StyledRestartButton>
);

export default RestartButton;