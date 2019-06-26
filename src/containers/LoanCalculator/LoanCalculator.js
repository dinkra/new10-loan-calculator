import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Box from 'components/Box';
import Loading from 'components/Loading';
import Button from 'components/Button';
import Slider from 'components/Slider';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #013a6b;
  background-image: -webkit-linear-gradient(
    -45deg,
    white 50%,
    ${(p) => p.theme.pageBackground} 50%
  );
`;

const Wrapper = styled.div`
  width: 600px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  // border: 1px solid lightgrey;
`;

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
  if (!product || !legalForm) return [];
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
  if (!product || !legalForm || !loan || !period) return null;
  const range = getPercentageRange(loan);
  const maxPeriod = getMaximum(product, legalForm)[1];
  const percentage = (period * 100) / maxPeriod;
  const rate = range[0] + ((range[1] - range[0]) * percentage) / 100;
  return Math.round(rate * 100) / 100;
};

const formatLoan = (loan) =>
  Number(loan).toLocaleString('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  });

class LoanCalculator extends PureComponent {
  state = {
    // activeProduct: products.marketing,
    // activeLegalForm: legalForms.bv,
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
      <Container>
        <Wrapper>
          <Box>
            <h3>Please select your funding options</h3>
            <p>Loan purpose:</p>
            <Box direction="horisontal">
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
            </Box>
            <p>Type of business:</p>
            <Box direction="horisontal">
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
            </Box>
            <Loading loading={!activeProduct || !activeLegalForm}>
              <p>The size of funding:</p>
              <Box direction="horisontal" alignment="space-between">
                <div>0</div>
                <Slider max={maxLoan} value={loan} step={1000} onChange={this.onLoanChange} />
                <div>EUR {maxLoan}</div>
              </Box>
              <p>Your loan: {formatLoan(loan)}</p>
              <p>Duration:</p>
              <Box direction="horisontal">
                <span>0</span>
                <Slider max={maxPeriod} value={period} step={1} onChange={this.onPeriodChange} />
                <span>{maxPeriod} months</span>
              </Box>
              <p>Your period: {period} months</p>
            </Loading>
            {rate && (
              <p>
                Your interest rate is: <strong>{rate}</strong>
              </p>
            )}
          </Box>
        </Wrapper>
      </Container>
    );
  }
}

export default LoanCalculator;
