import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

function Button({ title, type, onClick, isLoading, disabled }) {
  return (
    <ButtonStyled
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <Spinner /> : title}
    </ButtonStyled>
  );
}

function SelectButton({ children, onChange }) {
  return (
    <SelectStyled type="select" onChange={onChange}>
      {children}
    </SelectStyled>
  );
}

const ButtonStyled = styled.button`
  display: ${(props) => (props.disabled ? "none" : "")};
  border: none;
  height: auto;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  background-color: var(--bg-1);
  color: var(--white);
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    background: var(--primary);
  }
`;
const SelectStyled = styled.select`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  width: 150px;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  background-color: var(--bg-3);
  color: var(--black);
`;

export { SelectButton };
export default Button;
