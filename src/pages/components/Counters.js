import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-top: 36px;
`;

const StyledCounter = styled.div`
  position: relative;
  background: ${props => props.player === 'X'
    ? '#FFE4E4'
    : '#E4F5FF'};
  width: 139px;
  height: 36px;
  padding: 0 0 0 14px;
  border-radius: 4px;
  font-weight: 800;
  font-size: 14px;
  line-height: 36px;
`;

const Score = styled.span`
  position: absolute;
  font-weight: 300;
  font-size: 24px;
  right: 10px;
  top: -17px;
`;

const Counter = ({ player, score }) => (
  <StyledCounter player={player}>
    <span>Player {player === 'X' ? 'X' : 'O'}</span>
    <Score>{score}</Score>
  </StyledCounter>
);

const Tie = styled.div`
  width: 95px;
  margin-top: 16px;
  padding: 0 0 0 14px;
  border-left: 3px solid #EBFFFA;
  font-weight: 800;
  font-size: 14px;
`;

export default function Counters({ scores }) {
  return (
    <CounterContainer>
      <Counter player="X" score={scores.X} />
      <Counter player="O" score={scores.O} />
      <Tie>Tie - {scores.tie}</Tie>
    </CounterContainer>
  );
}