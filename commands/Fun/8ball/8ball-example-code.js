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
	if (message.content === '!8ball') {

		//Checking first argument
		if(!args[0]) return message.reply("You need to ask something");
		if(message.mentions.members.first()) return message.reply("Tagging people is strictly prohibited in this command.")

		//You can add more answers here
		let answers = ["No, I don't think so.", 'Maybe.','Yes.', '100%.','Totally yes.',"I don't know.",'What is that question ?','Leave me alone.','Ask your parents .'];

		//Picking random asnwer
		const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

		//sending it
		message.reply(randomAnswer);
    }

})

bot.login("Your token here")

