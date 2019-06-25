import React, { PureComponent } from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Slider from 'components/Slider';

class LoanCalculator extends PureComponent {
  state = {};

  render() {
    return (
      <Box>
        <p>Please choose your product:</p>
        <Button>Marketing</Button>
        <Button>Equipment</Button>
        <p>Please choose your legal form:</p>
        <Button>BV</Button>
        <Button>Eenmanszak</Button>
        <p>How much do you want to borrow?</p>
        <Slider />
        <p>For how long?</p>
        <Slider />
        <p>Your interest rate is:</p>
      </Box>
    );
  }
}

export default LoanCalculator;
