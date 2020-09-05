import React from 'react';
import styled from 'styled-components';
import IconX from './IconX';
import IconO from './IconO';

const StyledCell = styled.div`
  width: 100px;
  height: 100px;

  &:first-child button {
    border-top-left-radius: 18px;
  }
  &:nth-child(3) button {
    border-top-right-radius: 18px;
  }
  &:nth-child(7) button {
    border-bottom-left-radius: 18px;
  }
  &:last-child button {
    border-bottom-right-radius: 18px;
  }
`;

const Cell = ({ onClick, value }) => {
  if (value) {
    if (value === 'X') {
      value = (<IconX />)
    } else {
      value = (<IconO />)
    }
  }

  return (
    <StyledCell>
      <button
        style={{ 
          width: "100%", 
          height: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={onClick}
        type="button"
      >
        {value}
      </button>
    </StyledCell>
  );
};

export default Cell;