import React from 'react';
import styled, { keyframes } from 'styled-components';

const fullCircleRotate = () => keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const Wrapper = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.span`
  display: inline-block;
  box-sizing: border-box;
  width: 3em;
  height: 3em;
  border: calc(3em / 10) solid ${(p) => p.theme.primary};
  border-left-color: ${(p) => p.theme.grey06};
  border-radius: 100%;
  animation: ${fullCircleRotate()} 1s linear infinite;
`;

const StyledLoading = styled.div`
  background-color: ${(p) => p.theme.grey06};
  opacity: 0.2;
`;

const Loading = ({ loading, children }) =>
  loading ? (
    <Wrapper>
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
      <StyledLoading>{children}</StyledLoading>
    </Wrapper>
  ) : (
    children
  );

export default Loading;
