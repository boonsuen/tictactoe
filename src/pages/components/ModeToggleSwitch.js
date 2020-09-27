import React from 'react';
import styled from 'styled-components';

import img_robot from '../../assets/img/robot.svg';
import img_human from '../../assets/img/human.svg';

const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => props.small ? "40px" : "68px"};
  height: 30px;
  vertical-align: middle;
  user-select: none;

  @media screen and (max-width: 991px) {
    transform: scale(0.9);
  }
  @media screen and (max-width: 767px) {
    transform: scale(0.825);
  }
  @media screen and (max-width: 575px) {
    transform: scale(0.75);
  }
`;

const Label = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 0 solid #ccc;
  border-radius: 5px;
  margin: 0;
`;

const Inner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;

  &::before, &::after {
    display: block;
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    box-sizing: border-box;
    ${props => props.small && `
    height: 20px;
    line-height: 20px;
    `}
  }

  &::before {
    content: "";
    padding-left: 10px;
    background-color: #FFE5E5;
    color: #fff;
  }

  &::after {
    content: "";
    padding-right: 10px;
    background-color: #E9EFFF;
    color: #fff;
  }
`;

const Switch = styled.span`
  display: grid;
  place-items: center;
  width: 30px;
  background: ${props => props.isRobotMode ? "#FF8888" : "#85A0FF"};
  box-shadow: ${props =>
    props.isRobotMode ? "0px 0px 4px #FECFFF" : "0px 0px 4px #CFF4FF"};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  border: 0 solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease-in 0s;
  ${props => props.small && `
  width: 16px;
  right: 20px;
  margin: 2px;
  `}
`;

const Checkbox = styled.input`
  display: none;

  &:checked + ${Label} ${Inner} {
    margin-left: 0;
  }
  &:checked + ${Label} ${Switch} {
    right: 0px;
  }
`;

export default function ModeToggleSwitch(props) {
  const { isRobotMode, toggleRobotMode } = props;

  const onChange = (e) => {
    toggleRobotMode();
    if (typeof props.onChange === 'function') {
      props.onChange();
    }
  };

  return (
    <ToggleSwitch small={props.small}>
      <Checkbox
        type="checkbox"
        name="ModeToggleSwitch"
        id="ModeToggleSwitch"
        checked={isRobotMode}
        onChange={onChange}
      />
      <Label htmlFor="ModeToggleSwitch">
        <Inner small={props.small} />
        <Switch small={props.small} isRobotMode={isRobotMode}>
          {isRobotMode ? (
            <img src={img_robot} alt="Robot Mode" />
          ) : (
            <img src={img_human} alt="Human Mode" />
          )}
        </Switch>
      </Label>
    </ToggleSwitch>
  );
}
