const fs = require('fs');
const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
const loadDb = require('../../util/db/loadDb');
exports.run = (client, msg, args = []) => {
    functions.log(`Reload requested by ${msg.author.username}`);
    msg.channel.startTyping();
    let sendMessage = '```asciidoc\n';
    fs.readdir(`${process.cwd()}/commands/`, (err, files) => {
        if (err) msg.channel.send(err);
        sendMessage += `Reloading a total of ${files.length} commands\n\n`;
        functions.log(`  Reloading a total of ${files.length} commands`);
        msg.channel.send(`${sendMessage}\`\`\``)
            .then((m) => {
                files.forEach(f => {
                    const props = require(`${process.cwd()}/commands/${f}`);
                    if (props.conf.enabled) {
                        functions.log(`  Loading command: ${props.help.name}.`);
                        m.edit(`${sendMessage}\nLoading Command: ${props.help.name}.\n\`\`\``);
                        client.reload(props.help.name)
                            .then(() => {
                                functions.log(`    Sucessfully reloaded: ${props.help.name}.`);
                                sendMessage += `Sucessfully reloaded: ${props.help.name}\n`;
                                m.edit(`${sendMessage}\`\`\``);
                            })
                            .catch(e => {
                                functions.log(`  ${props.help.name}: Command reload failed: ${e.stack}`);
                                sendMessage += `\n\nCommand reload failed: ${props.help.name}\n\`\`\`${e.stack}\`\`\``;
                                m.edit(`${sendMessage}\`\`\``);
                            });
                    } else {
                        functions.log(`  ${props.help.name}: Command disabled, Skipping..`);
                        m.edit(`${sendMessage}\nSkipping Command: ${props.help.name}.\n\`\`\``);
                    }
                });
            });
    });
    msg.channel.send('Reloaded all settings');
    loadDb(client);
    msg.channel.stopTyping();
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: 4
};
exports.help = {
    name: 'reload',
    description: 'Reloads bot code',
    usage: 'bot reload'
};