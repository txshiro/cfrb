//Requiring discord.js
const Discord = require('discord.js')

//Creating Client
const bot = new Discord.Client()

bot.on('message', message =>{

    const args = message.content.slice(prefix.length).split(' ');

    if(message.content === "!clear"){
        //Checking if user has enough permission
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You don't have enough permissions to use this command.`);
        
        //Checking if first argument is a number
        if(typeof args[0] != "number" && args[0] != parseInt(args[0])) return message.reply("Please use only numbers")

        //Checking first argument
        if(!args[0]) return message.reply('You need to specify a number.')

        //If user wants to remove more than 100 messages then return message
        if(parseInt(args[0]) > 99) return message.reply("You can't delete more than 100 messages");

        //Otherwise we delete the specific amount
        message.channel.bulkDelete(parseInt(args[0]) + 1)
    }
})


bot.login("YOUR TOKEN HERE")