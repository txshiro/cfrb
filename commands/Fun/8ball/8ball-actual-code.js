//IF YOU HAVE ANY PROBLEMS JOIN MY DISCORD https://discord.gg/YuzGfvf

module.exports.run = async(bot, message, args) => {


    //Checking first argument
    if(!args[0]) return message.reply("You need to ask something");
    if(args[0] === message.mentions.members.first()) return message.reply("You need to ask a question, not tag a user")

    //You can add more answers here
    let answers = ["No, I don't think so.", 'Maybe.','Yes.', '100%.','Totally yes.',"I don't know.",'What is that question ?','Leave me alone.','Ask your parents .'];
    //Picking random asnwer
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    //sending it
    message.reply(randomAnswer);
}

module.exports.help = {
name: '8ball',
aliases: ["8b"]
}

