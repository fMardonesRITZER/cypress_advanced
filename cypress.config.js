const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    baseUrl: "https://pushing-it.vercel.app",
    defaultCommandTimeout: 10000,
  },
  env: {
    "usuario": "pushingit",
    "password": "123456!"
  }
});
