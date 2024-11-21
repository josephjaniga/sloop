// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    // Run tests in serial
    maxWorkers: 1,
    // Increase timeout for slow S3 operations
    testTimeout: 30000,
    coverageDirectory: './reports',
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'Test Report',
            outputPath: './reports/test-report.html',
            includeFailureMsg: true,
            includeSuiteFailure: true
        }]
    ],
    // Ensure the reports directory exists
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
  };