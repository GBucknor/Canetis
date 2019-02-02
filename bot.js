require('dotenv').config();
const Discord = require('discord.js');
const token = process.env.API_TOKEN;
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Canetis is now connected');
	client.channels.find(c => c.name === 'bot-playground').send('Hello World!');
});

client.login(token);