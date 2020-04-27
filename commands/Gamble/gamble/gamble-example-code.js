//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf

//Requiring discord.js
const Discord = require('discord.js');

//Creating new Client with discord.js
const bot = new Discord.Client();


//Message Event
bot.on('message', message =>{
	
	//Declaring arguments
	const args = message.content.slice(prefix.length).split(' ');
	
	//Checking if the message is "!gamble"
	if (message.content === '!gamble') {	

            //Checking if user is using good multiplier
            if(args[0] && args[0] !== "3x" && args[0] !== "5x" && args[0] !== "10x") return message.reply("You can only use '3x', '5x' or '10x'")

            //Checking if the bet is whole numver
            
            //Declaring chances 
            let chances = ["win", "lose"];
	    //Randomizing the chances with a percentage rate
            var pick = chances[Math.floor(Math.random()* chances.length)] + Math.random * 100;
            
            //using switch function instead of IF
            switch(args[0]){
                //declaring cases. It's the same as "args[0] === '3x'" in an if statement.
                case '3x':
                    //ping has 33% to be a win
                    if(pick <= 33)
                        {
                            pick = "win"
                            message.reply("You won 3x");
                        //ping has 77% to be a lost
                        }else{
                            pick = "lose";
                            message.reply("You lost 3x");
                        }
                    break;
                case '5x':
                    //pick has 20% chance to be a win
                    if(pick <= 20)
                    {
                        pick = "win"
                        message.reply("You win 5x");
                    //pick has 80% chance to be a lost   
                    }else{
                        pick = "lose";
                        message.reply("You lost 5x");
                    }
                    break;
                case '10x':
                    //pick has 10% chance to be a win
                    if(pick <= 10)
                    {
                        pick = "win"
                        message.reply("You win 10x");
                    //pick has 90% chance to be a lost   
                    }else{
                        pick = "lose";
                        message.reply("You lost 10x");
                    }
                    break;
            }

            //Now if we want a normal gamble we will just check if second argument doesnt exist             
            if(!args[0])
            {
                //We will remake pick variable so it has 50% to be win/lose
                var pick = chances[Math.floor(Math.random()* chances.length)];

                if(pick === "lose")
                {
                    message.reply("You won.")
                }else{
                    message.reply("You lost")
                }
            }
    }
})

bot.login("Your token here")