const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    usuario: "pushingit",
    password: "123456!"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes configurar eventos adicionales para Node si es necesario
    },
    baseUrl: "https://pushing-it.vercel.app", // Configura baseUrl dentro de e2e
    defaultCommandTimeout: 10000
  }
});

