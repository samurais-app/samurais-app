module.exports = {
    // roots: [
    //     '<rootDir>/src',
    //     '<rootDir>/__tests__'
    // ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
        runScripts: 'dangerously',
    },
    collectCoverage: true,
    coveragePathIgnorePatterns: ['/node_modules/', '/build/','__tests__'],
    verbose: true
};