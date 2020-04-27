//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf

//Requiring discord.js
const Discord = require('discord.js');

//Creating new Client
const bot = new Discord.Client()


bot.on("message", message =>{

    const args = message.content.slice(prefix.length).split(' ');

    if(message.content === "!hit")
    {
    
        //Checking first argument
        if(args[0]){
            //declaring user
            let user = message.mentions.members.first();
            //if user wants to hit himself
            if(user.id === message.author.id)
            {
                message.channel.send(`${message.author.username} hits himself`);
            //if user has tagged someone
            }else{
                message.channel.send(`${message.author.username} hits ${bot.users.cache.get(user.id).username}`);
            }
        //if user didnt tag someone
        } else{
            message.channel.send(`${bot.user.username} hits ${message.author.username}`);
        }    
    
    }

})

bot.login("YOUR TOKEN HERE")