//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf

//Requiring discord.js
const Discord = require('discord.js');

//Creating new Client with discord.js
const bot = new Discord.Client();


//Message Event
bot.on('message', message =>{
	
	//Declaring arguments
	const args = message.content.slice(prefix.length).split(' ');
    

    //Checking if the message is "!8ball"
    if(message.content === "!hug"){

        //if user has tagged anyone
        if(args[0]){
            let user = message.mentions.members.first();
            //if user wants to hug himself
            if(user.id === message.author.id)
            {
                message.channel.send(`${message.author.username} wants a hug`);
            //if user has tagged someone
            }else{
                message.channel.send(`${message.author.username} hugs ${bot.users.cache.get(user.id).username}`);
            }
        //If user hasnt tag anyone
        } else{
            message.channel.send(`${bot.user.username} hugs ${message.author.username}`);
        }
    }
 
})

bot.login("YOUR TOKEN HERE")
