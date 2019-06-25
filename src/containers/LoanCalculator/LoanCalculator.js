import React, { PureComponent } from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Slider from 'components/Slider';

const products = {
  marketing: 'Marketing',
  equipment: 'Equipment',
};

const legalForms = {
  bv: 'BV',
  eenmanszak: 'Eenmanszak',
};

const loans = [250000, 250000, 250000, 500000];
const months = [36, 36, 60, 60];

const getMaximum = (product, legalForm) => {
  if (product === products.marketing && legalForm === legalForms.bv) {
    return [loans[0], months[0]];
  }
  if (product === products.marketing && legalForm === legalForms.eenmanszak) {
    return [loans[1], months[1]];
  }
  if (product === products.equipment && legalForm === legalForms.bv) {
    return [loans[2], months[2]];
  }
  if (product === products.equipment && legalForm === legalForms.eenmanszak) {
    return [loans[3], months[3]];
  }
};

const getPercentageRange = (loan) => {
  if (loan < 50000) {
    return [6, 8];
  }
  if (loan < 150000) {
    return [5, 7];
  }
  if (loan < 500000) {
    return [4, 6];
  }
};

const calcInterestRate = (product, legalForm, loan, period) => {
  const range = getPercentageRange(loan);
  const maxPeriod = getMaximum(product, legalForm)[1];
  const percentage = (period * 100) / maxPeriod;
  return range[0] + ((range[1] - range[0]) * percentage) / 100;
};

class LoanCalculator extends PureComponent {
  state = {
    activeProduct: products.marketing,
    activeLegalForm: legalForms.bv,
    loan: 0,
    period: 0,
  };

  onProductChange = (value) => {
    this.setState({
      activeProduct: value,
    });
  };

  onLegalFormChange = (value) => {
    this.setState({
      activeLegalForm: value,
    });
  };

  onLoanChange = (e) => {
    this.setState({
      loan: e.target.value,
    });
  };

  onPeriodChange = (e) => {
    this.setState({
      period: e.target.value,
    });
  };

  render() {
    const { activeProduct, activeLegalForm, loan, period } = this.state;
    const maxLoan = getMaximum(activeProduct, activeLegalForm)[0];
    const maxPeriod = getMaximum(activeProduct, activeLegalForm)[1];
    const rate = calcInterestRate(activeProduct, activeLegalForm, loan, period);

    return (
      <Box>
        <p>Please choose your product:</p>
        <Button
          active={activeProduct === products.marketing}
          onClick={() => this.onProductChange(products.marketing)}
        >
          {products.marketing}
        </Button>
        <Button
          active={activeProduct === products.equipment}
          onClick={() => this.onProductChange(products.equipment)}
        >
          {products.equipment}
        </Button>
        <p>Please choose your legal form:</p>
        <Button
          active={activeLegalForm === legalForms.bv}
          onClick={() => this.onLegalFormChange(legalForms.bv)}
        >
          {legalForms.bv}
        </Button>
        <Button
          active={activeLegalForm === legalForms.eenmanszak}
          onClick={() => this.onLegalFormChange(legalForms.eenmanszak)}
        >
          {legalForms.eenmanszak}
        </Button>
        <p>How much do you want to borrow?</p>
        <span>0</span>
        <Slider max={maxLoan} value={loan} onChange={this.onLoanChange} />
        <span>EUR {maxLoan}</span>
        <p>Your loan: EUR {loan}</p>
        <p>For how long?</p>
        <span>0</span>
        <Slider max={maxPeriod} value={period} onChange={this.onPeriodChange} />
        <span>{maxPeriod} months</span>
        <p>Your period: {period} months</p>
        <p>Your interest rate is: {rate}</p>
      </Box>
    );
  }
}

export default LoanCalculator;
