//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf


//Requiring discord.js so we can use embeds
const Discord = require('discord.js');

//Requiring mongoose
const mongoose = require('mongoose'); 

//Require botconfig in which i have mongaPass
const botconfig = require(".././/json/botconfig.json")

//connecting to mongoose database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//requiring Data which i have in models folder
const Data = require("../../models/data.js");

module.exports.run = async(bot,message,args) =>{

        //Finding a data
        Data.findOne({
            userID: message.author.id,
            serverID: message.guild.id,
        }, (err, data) =>{
            //if error then log the error
            if(err) console.log(err); 
            //if user has no data create one   
            if(!data){
                const newData = new Data({
                    name: message.author.username,
                    userID: message.author.id,
                    serverID: message.guild.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                //save that data and if any errors then log them
                newData.save().catch(err => console.log(err));

                //return message that they dont have any money
                return message.reply("You don't have enough beris. Try using !daily command");
            
            //Else if user has data
            }else{
                
                //We now know that user has data
                //So we can grab user's money by doing (data.money)
                // and then doing .toLocaleString so the number is "1,000" instead of 1000
                //it just looks better that way 
                
                //checking if user doesnt have enough money
                if(data.money <= 0 || data.money < bet) return message.reply(`You don't have enough money. Your current balance is ${data.money.toLocaleString()}`)

                //Checking first argument
                if(!args[0]) return message.reply("Write an amount");

                //if first argument = "all" we set the amount as all of user's money
                if(args[0] === "all") args[0] = data.money;

                if(args[1] && args[0] === "all") return message.reply("You can't use 'all' when using multiplier");


                /*Checking if user is using second argument and right multiplier
                Also if you are asking "If we are checking second argument then why its "args[1}""
                Well because in arrays we start counting from zero not from one
                so
                var arrays = ["first", "second" , "third"] 
                                 0   ,    1     ,    2

                I hope you get it also sorry im bad at explaining LULW
                */

                //Now we check if user is using second argument in his message and if yes then we check if it is '3x', '5x' or '10x'
                //and if not then we return message
                if(args[1] && args[1] !== "3x" && args[1] !== "5x" && args[1] !== "10x") return message.reply("You can only use '3x', '5x' or '10x'")

                //try and catch for checking if amount does not have decimal number in it
                try{
                    //now we declared a bet too
                    //so bet = 3 for example
                    var bet = parseInt(args[0]);
                }catch{
                    //and if bet (amount) has decimal we return
                    return message.reply("you can add only whole numbers")
                }
                
                //If bet is bigger than user balance we return message
                if(bet > data.money) return message.reply("You don't have that many beries.");

                //Checking if the bet is actuall number
                if(bet != Math.floor(bet)) return message.reply("You can add only numbers");
                
                //YOU CAN DELETE THIS LINE OF CODE//
                //we are just checking if bet is less than 10 and if yes we return message
                if(bet < 10) return message.reply("You can't bet less than 10 beris.")
                
                //Declaring chances
                let chances = ["win", "lose"];

                //Now we calculate the pick with percentage
                var pick = chances[Math.floor(Math.random()* chances.length)] + Math.random * 100;
                

                /*Switch is just IF STATEMENT without the statement.
                The statement is "case 3x" for example
                So the switch we are using below is just
                if(args[1] === 3x)
                and lot easier to debug 
                also i implemented this in case you want to add more multipliers.
                so you dont have a spaghetti code
                */
                //using switch function instead of IF
                switch(args[1]){                
                    case '5x':
                            ///pick has 20 % to be a win
                            if(pick <= 20)
                            {   
                                //we set pick to win
                                pick = "win"   

                                //adding bet * 5 to user balance
                                data.money += bet * 5;
                                //roundint it up
                                data.money = parseInt(data.money)
                                //saving and catching error if any occur
                                data.save().catch(err => console.log(err));
    
                                message.channel.send(`You won 5x! Your new balance is ${data.money.toLocaleString()}`);
                                break;
                            //pick has 80% to be a lose
                            }else{
                                pick = "lose"; 


                                //If user would go into negative im setting his balance to 0
                                if((data.money - (bet + data.money / 5)) < 0)
                                {
                                    data.money = 0
                                    //saving and catching
                                    data.save().catch(err => console.log(err));
                                    message.channel.send(`You lost 5x! Your new balance is 0`);

                                    break;
                                }else{
                                                                
                                    /*now this is a funny part
                                    you can customize this as you want.
                                    you can do for example  "data.money = data.money / bet * 3"
                                    Its really up to you and your fantasy
                                    I will just go with this for now
                                    */
                                    data.money -= bet + data.money / 2;

                                    //rounding it up
                                    data.money = parseInt(data.money)
                                    //saving and catching
                                    data.save().catch(err => console.log(err));

                                    message.channel.send(`You lost 5x! Your new balance is ${data.money.toLocaleString()}`);
                                    break;

                            }
                        }
                    //I have now explained the code pretty much so i wont comment on other things in this switch case
                    case '10x':
                            if(pick <= 10)
                            {
                                pick = "win"

                                data.money += bet * 10;
                                data.money = parseInt(data.money)
                                data.save().catch(err => console.log(err));
    
                                message.channel.send(`You won 10x! Your new balance is ${data.money.toLocaleString()}`);
                                break;
                            }else{
                                pick = "lose";

                                if((data.money - (bet + data.money / 2)) < 0)
                                {
                                    data.money = 0
                                    //saving and catching
                                    data.save().catch(err => console.log(err));
                                    message.channel.send(`You lost 10x! Your new balance is 0`);

                                    break;
                                }else{
                                    data.money -= bet + data.money / 2;
                                    data.money = parseInt(data.money)
                                    data.save().catch(err => console.log(err));
    
                                    message.channel.send(`You lost 10x! Your new balance is ${data.money.toLocaleString()}`);
                                    break;
                                
                                }
                        }
                }

                //Now if we want a normal gamble we will just check if second argument doesnt exist             
                if(!args[1])
                {
                    //We will remake pick variable so it has 50% to be win/lose
                    var pick = chances[Math.floor(Math.random()* chances.length)];

                    //if pick is a lose
                    if(pick === "lose")
                    {
                        //this is pretty self explanatory if you read the comments before so i wont explain this
                        data.money -= bet;
                        data.money = parseInt(data.money)
                        data.save().catch(err => console.log(err));

                        return message.channel.send(`You lost! Your new balance is ${data.money.toLocaleString()}`);
                    
                    //if pick is win
                    }else{
                        data.money += bet;
                        data.money = parseInt(data.money)
                        data.save().catch(err => console.log(err));
                        
                        return message.channel.send(`You won! Your new balance is ${data.money.toLocaleString()}`);

                    }
                }

            }
        })  
}

module.exports.help ={
name: "gamble",
aliases: []
}