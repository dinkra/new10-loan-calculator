import React from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  flex-flow: ${(p) => (p.direction === 'horisontal' ? 'row nowrap' : 'column nowrap')};
  align-items: ${(p) => (p.direction === 'horisontal' ? 'center' : 'stretch')};
  justify-content: ${(p) => p.alignment};
  > * + * {
    padding: 0em;
    margin: 0 0.25em;
  }
`;

const Box = ({ children, direction, alignment }) => (
  <StyledBox direction={direction} alignment={alignment}>
    {children}
  </StyledBox>
);

Box.defaultProps = {
  direction: 'vertical',
  alignment: 'flex-start',
};

export default Box;
