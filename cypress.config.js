const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'n2kn98',
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    fixturesFolder: 'cypress/e2e/',
    env: {
      admin: {
        username: 'pushingit',
        password: '123456!',
      },
      so: {
        username: 'pushingit',
        password: 'pushingit2'
      },
      baseUrlAPI: 'https://pushing-it.onrender.com/api',
      token: ''
    },
  },
});