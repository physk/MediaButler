const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
module.exports = client => { // eslint-disable-line no-unused-vars
  functions.log(`Reconnecting at ${new Date()}`, "GREEN");
};