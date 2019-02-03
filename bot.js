require('dotenv').config();
const Discord = require('discord.js');
const token = process.env.API_TOKEN;
const client = new Discord.Client();

// Command Methods
let separateCmd = (cmd) => {
	let command = cmd.substring(1);
	let splitCommand = command.split(' ');
	let main = splitCommand.shift();
	return {
		main: main,
		arguments: splitCommand
	}
}

let joinChannel = (msg, args) => {
	if (args == null || args.length <= 0) {
		msg.channel.send(`${msg.author} please specify a channel for me to join.`);
	}
}

let parseCommand = (msg) => {
	let cmdObj = separateCmd(msg.content);
	if (cmdObj.main === 'test') {
		console.log('Test works');
	}

	if (cmdObj.main === 'join') {
		joinChannel(msg, cmdObj.arguments);
	}
}

client.on('ready', () => {
	console.log('Canetis is now connected');
	//client.channels.find(c => c.name === 'bot-playground').send('Hello World!');
});

client.on('message', (msg) => {
	if (msg.content.startsWith('!')) {
		parseCommand(msg);
	}
});

client.login(token);