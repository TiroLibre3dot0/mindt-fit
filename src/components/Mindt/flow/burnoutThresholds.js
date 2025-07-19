export const burnoutThresholds = {
  EE: {
    short: {
      high: { min: 6 },
      medium: { min: 3, max: 5 },
      low: { max: 2 },
    },
    full: {
      high: { min: 27 },
      medium: { min: 17, max: 26 },
      low: { max: 16 },
    },
  },
  DP: {
    short: {
      high: { min: 6 },
      medium: { min: 3, max: 5 },
      low: { max: 2 },
    },
    full: {
      high: { min: 13 },
      medium: { min: 7, max: 12 },
      low: { max: 6 },
    },
  },
  RP: {
    short: {
      high: { max: 2 },
      medium: { min: 3, max: 5 },
      low: { min: 6 },
    },
    full: {
      high: { max: 31 },
      medium: { min: 32, max: 38 },
      low: { min: 39 },
    },
  },
};
