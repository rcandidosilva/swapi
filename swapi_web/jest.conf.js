const tsconfig = require('./tsconfig.test.json')

module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
        compiler: 'typescript',
        diagnostics: false,
      },
    ],
  },
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  cacheDirectory: '<rootDir>/build/jest-cache',
  coverageDirectory: '<rootDir>/build/test-results/',
  testMatch: ['<rootDir>/src/main/webapp/app/**/@(*.)@(spec.ts?(x))'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['<rootDir>/src/test/javascript/'],
  moduleNameMapper: mapTypescriptAliasToJestAlias({
    '\\.(css|scss)$': 'identity-obj-proxy',
    sinon: require.resolve('sinon/pkg/sinon.js'),
  }),
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './build/test-results/', outputName: 'TESTS-results-jest.xml' }],
    ['jest-sonar', { outputDirectory: './build/test-results/jest', outputName: 'TESTS-results-sonar.xml' }],
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/src/main/webapp/app/setup-tests.ts'],
  globals: {
    I18N_HASH: 'generated_hash',
    ...require('./webpack/environment'),
    DEVELOPMENT: false,
  },
}

function mapTypescriptAliasToJestAlias(alias = {}) {
  const jestAliases = { ...alias }
  if (!tsconfig.compilerOptions.paths) {
    return jestAliases
  }
  Object.entries(tsconfig.compilerOptions.paths)
    .filter(([_key, value]) => {
      // use Typescript alias in Jest only if this has value
      return !!value.length
    })
    .map(([key, value]) => {
      // if Typescript alias ends with /* then in Jest:
      // - alias key must end with /(.*)
      // - alias value must end with /$1
      const regexToReplace = /(.*)\/\*$/
      const aliasKey = key.replace(regexToReplace, '$1/(.*)')
      const aliasValue = value[0].replace(regexToReplace, '$1/$$1')
      return [aliasKey, `<rootDir>/${aliasValue}`]
    })
    .reduce((aliases, [key, value]) => {
      aliases[key] = value
      return aliases
    }, jestAliases)
  return jestAliases
}
