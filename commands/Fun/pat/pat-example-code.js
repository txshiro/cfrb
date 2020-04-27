//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf

//Requiring discord.js
const Discord = require('discord.js');

//Creating new client
const bot = new Discord.Client()
    
bot.on('message', message =>{

    const args = message.content.slice(prefix.length).split(' ');

    if(message.content === "!pat")
    {
        //Checking if user has tagged someone
        if(args[0]){
            let user = message.mentions.members.first();
            //if user has tagged himself
            if(user.id === message.author.id)
            {
                message.channel.send(`${message.author.username} wants a pat`);
            //user has tagged someone else
            }else{
                message.channel.send(`${message.author.username} pats ${bot.users.cache.get(user.id).username}`);
            }
        //user hasnt tagged anyone
        } else{
            message.channel.send(`${bot.user.username} pats ${message.author.username}`);
        }
    }
})

bot.login("YOUR TOKEN HERE");
