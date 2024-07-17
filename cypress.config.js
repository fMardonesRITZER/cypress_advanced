const { defineConfig } = require("cypress");
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async connectDB(query) {
          const client = new Client({
            user: "pushingit",
            password: "Qh2m8Mgc9f309bnieoUTZbgYsIL6rC6d",
            host: "dpg-cq61ngbv2p9s73ce6jt0-a.oregon-postgres.render.com",
            database: "pushingit_plmm",
            ssl: true,
            port: 5432,
          });
          await client.connect();
          const res = await client.query(query);
          await client.end();
          return res.rows;
        }
      });
    },
    baseUrl: "https://pushing-it.vercel.app",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    responseTimeout: 60000,
    requestTimeout: 12000,
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
