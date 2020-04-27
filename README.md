# CFRB

CFRB (Commands for discord bot) is a project in which I show how to create commands.
In this Discord.js project I'm using MongoDB Database so if you don't have that set up you can read below how do it. And if you don't want MongoDB database then you just can modify the code.
I always add example.js and a actual-code.js. You can also use this as a reference for your code. It's up to you! If you need help with anything or just want to talk then you can join my [discord server](https://discord.gg/9Rp6JkV)

- example.js - basic structure of the code, so you can modify it as much as you want.

- actual-code - you can use this code if you are using this project command handler and you have setup a MongoDB database.

## Installation
I'm not going to teach you how to install and setup bot. If you haven't do that already watch [this video](https://www.youtube.com/watch?v=X_qg0Ut9nU8).

- You need to put your [bot's token](https://discordapp.com/developers/applications) in `json/config.json`
- You need to change the prefix as well.
- You need to download [fs-readdir-recursive](https://www.npmjs.com/package/fs-readdir-recursive) and [mongoose](https://www.npmjs.com/package/mongoose)

## Setuping MongoDB Databse
- Create account at [MongoDB website](https://www.mongodb.com/).
- Go to `Database Access => Add new Database User => [Create User](https://i.imgur.com/d25YZ7z.png)
- Create `Clusters => Create Cluster => Sandbox (The free one) => Select your region => Create`
- Click on `CONNECT => Connect with your application => Set driver to Node.js => Click on Copy`. Now you need to go into "json/botconfig.json" and change the mongoPass to the url you copied

!BE CAREFUL!

In the url you've copied you need to change your password to the password you set when creating the [DATABASE USER](https://i.imgur.com/d25YZ7z.png) not your account password! And your password can't be in "<>". It should look like this

`
mongodb+srv://txshiro:txshiro1 //rest of the url
`

I hope you get the idea.
## Usage

You can just copy the code inside your own .JS file. I'm also explaining staff in the code.
