import React from 'react';

const Slider = ({ min = 0, max = 100, value = 0, onChange = () => {} }) => (
  <div>
    <input type="range" min={min} max={max} value={value} onChange={onChange} />
  </div>
);

export default Slider;
