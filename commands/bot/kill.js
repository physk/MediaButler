const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
exports.run = (client, msg, args = []) => {
    functions.log(`Kill requested by ${msg.author.username}`);
    msg.channel.send(`Kill requested by ${msg.author.username}`)
        .then(() => {
            client.destroy();
            process.exit(0);
        });
    
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kl'],
    permLevel: 4
};
exports.help = {
    name: 'kill',
    description: 'Kills bot',
    usage: 'bot kill'
};