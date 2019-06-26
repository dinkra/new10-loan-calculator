import { loanTypes, businessTypes } from 'constants/loan';

export const getMaxLoan = (loanType, businessType) => {
  if (loanType === loanTypes.marketing && businessType === businessTypes.bv) {
    return { amount: 250000, term: 36 };
  }
  if (loanType === loanTypes.marketing && businessType === businessTypes.eenmanszak) {
    return { amount: 250000, term: 36 };
  }
  if (loanType === loanTypes.equipment && businessType === businessTypes.bv) {
    return { amount: 500000, term: 60 };
  }
  if (loanType === loanTypes.equipment && businessType === businessTypes.eenmanszak) {
    return { amount: 250000, term: 60 };
  }
  return {};
};

export const getPercentageRange = (amount) => {
  if (amount < 50000) {
    return { min: 6, max: 8 };
  }
  if (amount < 150000) {
    return { min: 5, max: 7 };
  }
  if (amount < 500000) {
    return { min: 4, max: 6 };
  }
  return { min: 0, max: 0 };
};

export const calcInterestRate = (product, legalForm, amount, term) => {
  if (!product || !legalForm || !amount || !term) return null;
  const range = getPercentageRange(amount);
  const maxTerm = getMaxLoan(product, legalForm).term;
  const percentage = (term * 100) / maxTerm;
  const rate = range.min + ((range.max - range.min) * percentage) / 100;
  return Math.round(rate * 100) / 100;
};

export const formatAmount = (amount) =>
  Number(amount).toLocaleString('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    minimumFractionDigits: 0,
  });
