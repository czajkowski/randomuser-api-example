module.exports = {
    setupFiles: ['./jest.setup.js'],
    resolver: 'jest-webpack-resolver',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tools/jestFileMock.js',
        '\\.(s?css)$': 'identity-obj-proxy',
    },
    coveragePathIgnorePatterns: ['/node_modules/', 'jest.*', '*.story.*'],
    testURL: 'http://localhost',
    globals: {
        __webpack_public_path__: '',
    },
    snapshotSerializers: ["enzyme-to-json/serializer"]
};
