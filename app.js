const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const prefix = config.discord.prefix;

client.on('ready', () => console.log('I am online and ready'));

client.on('message', (msg) => {
    if(msg.author.bot || !msg.guild || !msg.content.includes(prefix)) return;

    if(msg.content.toLowerCase() === `${prefix}ping`) {
        return msg.channel.send('Pong!');
    }

    if(msg.content === `${prefix}rules`) {
        if(!config.discord.owners.includes(msg.author.id)) {
            return msg.channel.send('You are not a owner of this bot.')
        }
        return msg.guild.channels.create(`rules`, 
        {
            type: 'text',
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ['SEND_MESSAGES']
                },
            ]
        }).then(c => msg.channel.send(`I have created <#${c.id}>`));
    }

    if(msg.content === `${prefix}delete`) {
        if(!config.discord.owners.includes(msg.author.id)) {
            return msg.channel.send('You are not a owner of this bot.')
        }
        msg.guild.channels.forEach(c => c.name.toLowerCase().includes('rules') && c.delete())
    }
});

client.login(config.discord.token);