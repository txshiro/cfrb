//IF YOU NEED ANY HELP OR YOU WANT TO ADD WINS 3X OR 5X JOINS MY DISCORD https://discord.gg/9Rp6JkV

//Requing discord.js
const Discord = require('discord.js');

//Creating new Client
const bot = new Discord.Client();

bot.on('message', message => {

    //Declaring arguments
    const args = message.content.slice(prefix.length).split(' ');

    //Checking if the message is "!slots"
    if (message.content === '!slots') {

        //If user didnt specified amount and he didnt type 'all' or 'half' return message
        if (!args[0] && args[0] != 'all' && args[0] != "half") return message.reply("Write an amount");

        //if user is trying to put decimal numbers into his bet
        try {
            var bet = parseFloat(args[0]);
            //we catch that and return with a message
        } catch {
            return message.reply("You can write only whole number");
        }

        //checking if number
        if (typeof args[0] != "number" && args[0] != parseInt(args[0]) && args[0] != "all" && args[0] != "half") return message.reply("Please use only numbers")

        //Limiting bet
        if (parseInt(args[0]) > 100000) return message.reply("You can't bet more than 10k beris");




        //declaring the slots "emojis"
        //You can get yours emoji id by doing
        //\:NameOfEmoji:
        //And then just copy-paste it here
        //And yes the emojis will work on any server as long as the bot is 
        //on server where these emojis are
        let slots = ["PUT YOUR EMOJI IDS HERE",
            "PUT YOUR EMOJI IDS HERE",
            "PUT YOUR EMOJI IDS HERE",
            "PUT YOUR EMOJI IDS HERE",
            "PUT YOUR EMOJI IDS HERE",
            "PUT YOUR EMOJI IDS HERE",
        ];

        //picking random results from the "slots" above
        let result1 = slots[Math.floor(Math.random() * slots.length)];
        let result2 = slots[Math.floor(Math.random() * slots.length)];
        let result3 = slots[Math.floor(Math.random() * slots.length)];

        //checking if user has enough money or if the bet is bigger than his bal
        if (data.money < bet || data.money <= 0 || bet > data.money) {
            embed.setColor("0xFF2D00")
            embed.setDescription(`You don't have enough beris. Your current balance: ${data.money.toLocaleString()} beris`)
            return message.reply(embed)
        }

        //If user wants to gamble all/half we simplify things for him
        if (args[0] == "all") bet = data.money;
        if (args[0] == "half") bet = data.money / 2;


        /*If the results are like this
        -------------------------------
        Results: X X Y - User Wins
        or
        Results : Y X X - User Wins
        -----------------------------
    
        if you want user to win even if results are like this:
        ---------------
        Results : X Y X
        ---------------
        then add "results1 === results3" into the if statement
        */
        if (result1 === result2 || result2 === result3) {

            //Creating embed is editing him
            let Win = new Discord.MessageEmbed()
            Win.setTitle('**You Won 1x!**')
            Win.setDescription(`${result1} ${result2}  ${result3}`)
            Win.setColor("0x0acf3f")
            //Sending embed
            message.channel.send(Win);
            //If user lost
        } else {

            //Creating embed and editing him
            let Lose = new Discord.MessageEmbed()
            Lose.setTitle('**You Lost!**')
            Lose.setDescription(`${result1} ${result2}  ${result3}`)
            Lose.setColor("0xFF2D00")
            //Sending embed
            message.channel.send(Lose)
        }

    }
})

bot.login("YOUR TOKEN HERE")