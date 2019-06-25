import React from 'react';

const Slider = ({ min = 0, max, onChange }) => (
  <div>
    <input type="range" min={min} max={max} value="0" onChange={onChange} />
  </div>
);

export default Slider;
