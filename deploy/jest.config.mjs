import nextJs from 'next/jest.js';

const createJestConfig = nextJs({
    dir: './',
});

const config = {
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src'],
    collectCoverage:true,
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/*.d.ts',
        '!**/coverage/**',
        '!**/.next/**',
        '!**/jest.config.mjs',
        '!**/next.config.js',
        '!**/types/**',
        '!**/views/**',
        '!**/pages/api/**',
    ],
}

export default createJestConfig(config);



