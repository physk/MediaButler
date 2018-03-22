const functions = require(`${process.cwd()}/lib/globalFunctions.js`);
exports.run = (client, message, args, perms) => {
    functions.log(`Ping?`);
    message.channel.send('Ping?')
        .then(msg => {
            functions.log('Pong!');
            msg.edit(`I'm still working! (It took me ${msg.createdTimestamp - message.createdTimestamp}ms to respond)`);
        });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'ping',
    description: 'Ping/Pong command. I wonder what this does? /sarcasm',
    usage: 'bot ping'
};