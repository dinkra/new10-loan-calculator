import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const StyledLoading = styled.div`
  background-color: ${(p) => p.theme.grey06};
  opacity: 0.2;
`;

const Loading = ({ loading, children }) =>
  loading ? (
    <Wrapper>
      <StyledLoading>{children}</StyledLoading>
    </Wrapper>
  ) : (
    children
  );

export default Loading;
