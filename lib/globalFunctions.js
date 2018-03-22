exports.log = (message, colour = "white") => {
    var moment = require('moment');
    var chalk = require('chalk');
    if (colour == "GREEN") {
        console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${chalk.bgGreen.black(message)}`);
    }
    else if (colour == "RED") {
        console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${chalk.bgRed.black(message)}`);
    }
    else {
        console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
    }
};