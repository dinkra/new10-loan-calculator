import React from 'react';
import styled, { css } from 'styled-components';

const cssPrimary = css`
  color: ${(p) => p.theme.white};
  background-color: ${(p) => p.theme.primary};
  border-color: ${(p) => p.theme.primary};

  &:hover,
  [data-whatintent='keyboard'] &:focus {
    background-color: ${(p) => p.theme.primaryActive};
    border-color: ${(p) => p.theme.primaryActive};
  }
`;

const cssSecondary = css`
  color: ${(p) => p.theme.primary};
  background-color: ${(p) => p.theme.white};
  border-color: ${(p) => p.theme.primary};

  &:hover,
  [data-whatintent='keyboard'] &:focus {
    color: ${(p) => p.theme.primaryActive};
    border-color: ${(p) => p.theme.primaryActive};
  }
`;

const StyledButton = styled.button`
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;

  ${(p) => p.appearance === 'primary' && cssPrimary};
  ${(p) => p.appearance === 'secondary' && cssSecondary};
`;

const Button = ({ active, onClick, children }) => (
  <StyledButton appearance={active ? 'primary' : 'secondary'} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
