const fs = require('fs');
const appDir = process.cwd();
const coreSettings = require(`${appDir}/settings.json`);
const saveDb = require('./saveDb');
const functions = require(`${appDir}/lib/globalFunctions.js`);
const uuid = require('uuid-v4');
module.exports = (client) =>  {
  client.guilds.forEach(guild => {
    fs.readFile(`${coreSettings['path']}/${guild.id}.json`, (err, data) => {  
      if (err) {
          fs.readFile(`${coreSettings['path']}/default.json`, (err, data2) => {
              if (data2 == undefined) {
                  functions.log('config/default.json missing, Quitting..', "RED");
                  process.exit(1);
              }
          guild.settings = JSON.parse(data2);
          guild.settings.uuidv4 = uuid();
          saveDb(client);
          functions.log(`Loaded default settings for ${guild.id}`, "GREEN");
          return;      
        });
      } else {
        guild.settings = JSON.parse(data);
        functions.log(`Loaded settings for ${guild.id}`, "GREEN");
      }
    });
  });
};