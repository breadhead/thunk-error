module.exports = {
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['json', 'js', 'ts'],
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)',
  ],
}
