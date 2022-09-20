module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    rootDir: '.',
    setupFiles: ['<rootDir>/jest-setup.js','jest-canvas-mock'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        resources: 'usable',
        runScripts: 'dangerously',
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
};