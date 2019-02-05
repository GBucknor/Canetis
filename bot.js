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
		if (isClientInVC(msg.member.voiceChannel)) {
			msg.member.voiceChannel.leave();
		} else {
			msg.reply('I\'m not in your current voice channel');
		}
	} else {
		msg.reply('you need to be in the channel to ask me to leave.');
	}
}

let isClientInVC = (channel) => {
	let memArray = channel.members.array();
	for (let i = 0; i < memArray.length;++i) {
		if (memArray[i].user === client.user) {
			return true;
		}
	}
	return false;
}

let playSound = (msg, args) => {
	if (msg.member.voiceChannel) {
		if (isClientInVC(msg.member.voiceChannel)) {
			let connection = msg.member.voiceChannel.connection;
			if (args.length !== 0) {
				console.log('got here');
				//connection.playArbitraryInput(args[0]);
				connection.playArbitraryInput('https://soundcloud.com/andrew-wilborn-614125133/torna-the-golden-country-battle-theme-xenoblade-2')
			}
		} else {
			msg.reply('I\'m not in your current voice channel');
		}
	} else {
		msg.reply('you need to be in a voice channel to listen to music.');
	}
}

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
		playSound(msg, cmdObj.arguments);
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