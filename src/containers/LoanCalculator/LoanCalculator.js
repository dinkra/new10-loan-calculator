import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { loanTypes, businessTypes } from 'constants/loan';
import { getMaxLoan, calcInterestRate, formatAmount } from 'domain/loan';
import Card from 'components/Card';
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
`;

const Header = styled.h3`
  text-align: center;
`;

class LoanCalculator extends PureComponent {
  state = {
    amount: 0,
    term: 0,
  };

  onLoanTypeChange = (value) => {
    this.setState({
      activeLoanType: value,
    });
  };

  onBusinessTypeChange = (value) => {
    this.setState({
      activeBusinessType: value,
    });
  };

  onAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  onTermChange = (e) => {
    this.setState({
      term: e.target.value,
    });
  };

  render() {
    const { activeLoanType, activeBusinessType, amount, term } = this.state;
    const maxLoan = getMaxLoan(activeLoanType, activeBusinessType);
    const rate = calcInterestRate(activeLoanType, activeBusinessType, amount, term);

    return (
      <Container>
        <Wrapper>
          <Header>Loan Calculator</Header>
          <Card>
            <p>Loan Type</p>
            <Box direction="horisontal">
              {Object.values(loanTypes).map((type, index) => (
                <Button
                  key={type}
                  active={activeLoanType === type}
                  onClick={() => this.onLoanTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </Box>
            <p>Business Type</p>
            <Box direction="horisontal">
              {Object.values(businessTypes).map((type, index) => (
                <Button
                  key={type}
                  active={activeBusinessType === type}
                  onClick={() => this.onBusinessTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </Box>
          </Card>
          <Card>
            <Loading loading={!activeLoanType || !activeBusinessType}>
              <p>Loan Amount</p>
              <Box direction="horisontal" alignment="space-between">
                <div>0</div>
                <Slider
                  max={maxLoan.amount}
                  value={amount}
                  step={1000}
                  onChange={this.onAmountChange}
                />
                <div>EUR {maxLoan.amount}</div>
              </Box>
              <p>
                <strong>{formatAmount(amount)}</strong>
              </p>
            </Loading>
          </Card>
          <Card>
            <Loading loading={!activeLoanType || !activeBusinessType}>
              <p>Loan Term</p>
              <Box direction="horisontal">
                <div>0</div>
                <Slider max={maxLoan.term} value={term} step={1} onChange={this.onTermChange} />
                <div>{maxLoan.term} months</div>
              </Box>
              <p>
                <strong>{term} months</strong>
              </p>
            </Loading>
          </Card>
          <Card dark>
            <h3>
              Interest Amount <strong>{rate}%</strong>
            </h3>
          </Card>
        </Wrapper>
      </Container>
    );
  }
}

export default LoanCalculator;
