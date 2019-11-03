module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/__typescript__/tsconfig.test.json',
    },
  },
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  reporters: [
    'default'
  ],
  rootDir: '.',
  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': '<rootDir>/node_modules/ts-jest',
  },
  verbose: true,
};
