const loadDb = require('../util/db/loadDb');
const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
module.exports = client => { // eslint-disable-line no-unused-vars
  functions.log('Connected to discord - Bot should now be online', "GREEN");
  client.user.setPresence({game: {name: 'MediaButler v0.4', type: 0}});
  loadDb(client);
};