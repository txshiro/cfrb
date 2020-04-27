//IF YOU NEED ANY HELP OR YOU WANT TO ADD WINS 3X OR 5X JOINS MY DISCORD https://discord.gg/9Rp6JkV

//Requing discord.js
const Discord = require('discord.js');

//Requiring mongoose & botconfig so we have mongoPass
const mongoose = require('mongoose');
const botconfig = require("../../../json/botconfig.json")

//connecting to the databse
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Requiring models
const Data = require("../../../models/data.js");

module.exports.run = async(bot, message, args) => {

    //If user didnt specified amount and he didnt type 'all' or 'half' return message
    if(!args[0] && args[0] != 'all' && args[0] != "half") return message.reply("Write an amount");

    //if user is trying to put decimal numbers into his bet
    try{
        var bet = parseFloat(args[0]);
    //we catch that and return with a message
    } catch {
        return message.reply("You can write only whole number");
    }

    //checking if number
    if(typeof args[0] != "number" && args[0] != parseInt(args[0])&& args[0] != "all" && args[0] != "half") return message.reply("Please use only numbers")
    
    //Limiting bet
    if(parseInt(args[0]) > 100000) return message.reply("You can't bet more than 10k beris");


    
    
    //declaring the slots "emojis"
    //These emotes are from my own server
    //You can get yours emoji id by doing
    //\:NameOfEmoji:
    //And then just copy-paste it here
    let slots = ["<:KC:703217046703439903>", 
    "<:SF:703216082172772394>", 
    "<:GE:703215876337565696>", 
    "<:CD:703267824898146480>", 
    "<:KQ:703215109337514052>", 
    "<:SP:703267804882665492>",
    "<:BS:703274106811842614>" 
    ,"<:GER:703274540511526912>"
    ];

    //picking random results from the "slots" above
    let result1 = slots[Math.floor(Math.random() * slots.length)];
    let result2 = slots[Math.floor(Math.random() * slots.length)];
    let result3 = slots[Math.floor(Math.random() * slots.length)];

    //Finding Data
    Data.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, data) =>{
        if(err) console.log(err);   
        //creating new data if user doesnt have data 
        if(!data){
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                serverID: message.guild.id,
                lb: "all",
                money: 0,
                daily: 0,
            })

            //saving the new data
            newData.save().catch(err => console.log(err));
            //returning wiith a message
            return message.reply("You don't have enough beris, try using !daily command");
        //if user has data
        }else{
            //checking if user has enough money or if the bet is bigger than his bal
            if(data.money < bet || data.money <= 0 || bet > data.money){
                embed.setColor("0xFF2D00")
                embed.setDescription(`You don't have enough beris. Your current balance: ${data.money.toLocaleString()} beris`)
                return message.reply(embed)
            }
            
            //If user wants to gamble all/half we simplify things for him
            if(args[0] == "all") bet = data.money;
            if(args[0] == "half") bet = data.money / 2;


            /*If the results are like this
            -------------------------------
            Results: X X Y - User Wins
            or
            Results : Y X X - User Wins
            -----------------------------

            if you want user to win even if results are like this:
            ---------------
            Results : x Y X
            ---------------
            then add "results1 === results3" into the if statement
            */
            if(result1 === result2 || result2 === result3) {
                    
                    //Giving user his bet
                    data.money += bet;
                    //Saving and catching error if some occurs
                    data.save().catch(err => console.log(err));

                    //Creating embed is editing him
                    let Win = new Discord.MessageEmbed()
                    Win.setTitle('**You Won 1x!**')
                    Win.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()}** beris`)
                    Win.setColor("0x0acf3f")
                    message.channel.send(Win);
                //If user lost
                }else{
                    //Taking the bet fro user
                    data.money -= bet;
                    //Saving and catching errors if any occrus
                    data.save().catch(err => console.log(err));


                    //Creating embed and editing him
                    let Lose = new Discord.MessageEmbed()
                    Lose.setTitle('**You Lost!**')
                    Lose.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()} beris**`)
                    Lose.setColor("0xFF2D00")
                    message.channel.send(Lose)
                }
        }
    })
}

module.exports.help = {
      name: 'slots',
      aliases: ['slot', 'sl']
}