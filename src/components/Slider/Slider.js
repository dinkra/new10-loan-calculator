import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 28px;
  background: ${(p) => p.theme.grey05};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    background: ${(p) => p.theme.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: ${(p) => p.theme.primary};
    cursor: pointer;
  }
`;

const Slider = ({ min = 0, max = 100, value = 0, step, onChange = () => {} }) => (
  <Wrapper>
    <StyledSlider type="range" min={min} max={max} value={value} onChange={onChange} step={step} />
  </Wrapper>
);

export default Slider;
