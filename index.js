const express = require('express')
const expressConfing = require('./config/express');
const databaseConfing = require('./config/database');
const routesConfig = require('./config/routes')

start();

async function start(){
  const app = express()

  expressConfing(app);
  await databaseConfing(app);
  routesConfig(app);
   
  app.listen(3000, () => console.log('Server listening on port 3000'));

};