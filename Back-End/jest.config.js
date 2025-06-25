// Back-End/jest.config.js
export default {
 
  transform: {
    '^.+\\.[tj]s$': ['babel-jest', { configFile: './babel.config.js' }], 
  },

 
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

 
  detectOpenHandles: true,
};