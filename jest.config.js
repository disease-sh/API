// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  coverageDirectory: 'tests/coverage/',
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'json'],
  reporters: ['default', ['jest-junit', {
    outputDirectory: 'tests/reports/jest/',
    outputName: 'results.xml',
  }]],
  testEnvironment: 'node',
  testRegex: '.*(test|spec)\\.js$',
}
