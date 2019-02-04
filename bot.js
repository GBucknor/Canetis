require('dotenv').config();
const Discord = require('discord.js');
const token = process.env.API_TOKEN;
const client = new Discord.Client();

/*
	Command Methods
*/

// Splits commands from their arguments.
let separateCmd = (cmd) => {
	let command = cmd.substring(1);
	let splitCommand = command.split(' ');
	let main = splitCommand.shift();
	return {
		main: main,
		arguments: splitCommand
	}
}

// Joins a bot to a voice channel.
let joinChannel = (msg) => {
	if (msg.member.voiceChannel) {
		if (!msg.member.voiceChannel.joinable) {
			msg.reply('I\'m not allowed in your current voice channel');
		}
		msg.member.voiceChannel.join()
			.then(connection => {
				//msg.reply(`Successfully joined ${msg.member.voiceChannel}`);
			})
			.catch(console.log);
	} else {
		msg.reply(`you need to join a channel first.`);
	}
}

// Leaves the voice channel the user is currently in.
let leaveChannel = (msg) => {
	if (msg.member.voiceChannel) {
		if (client.guilds.has(msg.member.voiceChannel.guild.id)) {
			msg.member.voiceChannel.leave();
		} else {
			msg.reply('I\'m not in your current voice channel');
		}
	} else {
		msg.reply('you need to be in the channel to ask me to leave.');
	}
}

let playSound = (msg, args) => {}

// Chooses which function to have the bot execute.
let parseCommand = (msg) => {
	let cmdObj = separateCmd(msg.content);
	if (cmdObj.main === 'test') {
		console.log('Test works');
	}

	if (cmdObj.main === 'join') {
		joinChannel(msg);
	}

	if (cmdObj.main === 'leave') {
		leaveChannel(msg);
	}

	if (cmdObj.main === 'play') {
		//
	}
}

// Sets the bot up when online.
client.on('ready', () => {
	console.log('Canetis is now connected');
	//client.channels.find(c => c.name === 'bot-playground').send('Hello World!');
});

// Listens for messages that start with an '!'.
client.on('message', (msg) => {
	if (!msg.guild) return;

	if (msg.content.startsWith('!')) {
		parseCommand(msg);
	}
});

client.on('voiceStateUpdate', (oldmember, newmember) => {
	if (oldmember.voiceChannel) {
		if (oldmember.voiceChannel.members.array().length <= 1) {
			oldmember.voiceChannel.leave();
		}
	}
});

client.login(token);