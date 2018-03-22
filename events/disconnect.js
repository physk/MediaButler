const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
module.exports = client => { // eslint-disable-line no-unused-vars
    functions.log(`You have been disconnected at ${new Date()}`, "RED");
};
