const appDir = process.cwd();
const functions = require(appDir + '/lib/globalFunctions.js');
const settings = require(appDir + '/settings.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.mbVersion = '0.4';
const fs = require('fs');
require(appDir + '/util/eventLoader.js')(client);

functions.log('------------------------------------------------------');
functions.log(`    Starting MediaButler Discord Bot ${client.mbVersion}`);
functions.log('------------------------------------------------------');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) {
        // Can't find ./commands/ folder. Log to console and quit
        functions.log(err, "RED"); //log error to console
        process.exit(1); //exit app
    }
    functions.log(`Found total of ${files.length} commands to load`);
    if (files.length >= 1) {
        //Run through each command folder and load into memory
        files.forEach(f => {
            const props = require(`./commands/${f}`);
            if (props.conf.enabled) {
                functions.log(`  Loading command: ${props.help.name}.`);
                if (props.start) props.start(client);
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                })
            }
            else {
                functions.log(`  ${props.help.name}: Command disabled, Skipping..`);
            }
        });
        functions.log('  Finished loading commands, loading sub commands..');
    }
    else {
        // No Commands found. Log to console and quit
        functions.log('No commands to load, quitting out', "RED"); // Log error to console
        process.exit(1); // exit app
    }
});

client.reload = (command) => {
    const p = new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`${appDir}/commands/${comamnd}`)];
            const cmd = require(`${appDir}/commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
    return p;
};

client.elevation = (message) => {
    let permlvl = 0;
    if (message.member.hasPermission('MANAGE_MESSAGES')) permlvl = 2;
    if (message.member.hasPermission('ADMINISTRATOR')) permlvl = 3;
    if (message.author.id == message.guild.ownerID) permlvl = 4;
    return permlvl;
}

functions.log('Connecting to discord...');
client.login(settings.token);