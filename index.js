const Discord = require('discord.js');
const read = require('fs-readdir-recursive');

const { prefix, token } = require("./json/config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const files = read('./commands/');
files.forEach(file => {
    let cmd = file.replace('.js', '.js');
    let props = require(`./commands/${cmd}`);

    console.log(`|${cmd}| ✔ |`)
    bot.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    })
})


bot.on('message', message =>{
    
    if (!message.content.startsWith(prefix)) return;
    if(message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if(commandfile) commandfile.run(bot, message, args);

    if(bot.commands.has(cmd))
    {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)){
        command = bot.commands.get(bot.aliases.get(cmd));    
    }
    try{
        command.run(bot, message, args);
    } catch (e){
        return;
    }
})


bot.login(token);