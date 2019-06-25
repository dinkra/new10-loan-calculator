import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  background-color: white;
  color: ${(props) => props.theme.primary};
  border: 2px solid ${(props) => props.theme.primary};

  &:hover,
  [data-whatintent='keyboard'] &:focus {
    color: ${(p) => p.theme.primaryActive};
    border-color: ${(p) => p.theme.primaryActive};
  }
`;

const Button = ({ children, onClick }) => <StyledButton onClick={onClick}>{children}</StyledButton>;

export default Button;
