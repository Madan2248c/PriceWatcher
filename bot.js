const TelegramBot = require('node-telegram-bot-api');
const db = require('./databaseop.js');

class PriceWatcherBot {


    constructor(token) {
        this.bot = new TelegramBot(token, { polling: true });
        this.initializeBot();
    }

    initializeBot() {
        this.bot.on('message', (msg) => this.handleMessage(msg));
    }

    sendMessage(chatId, message) {
        this.bot.sendMessage(chatId, message);
    }

    async handleMessage(msg) {
        const chatId = msg.chat.id;
        const messageText = msg.text;

        if (messageText === '/start') {
            this.sendMessage(chatId, 'Welcome to the bot!');
        } else if (messageText.startsWith('/watchprice')) {
            this.handleWatchPrice(chatId, messageText);
        } else {
            this.sendMessage(chatId, 'Unknown command. Please try again.');
        }
    }

    async handleWatchPrice(chatId, messageText) {
        const args = messageText.split(' ');

        if (args.length > 2) {
            const link = args[1];
            const targetPrice = args[2];

            const product = {
                'chatId': chatId,
                'link': link,
                'target_price': targetPrice
            };

            try {
                await db.writeDataToRealtimeDB(product);
                // console.log(`Watching price for: ${link}`);
                this.sendMessage(chatId, `Watching price for: ${link}`);
            } catch (error) {
                console.error("Error saving to database:", error);
                this.sendMessage(chatId, 'Error occurred while saving the product information.');
            }
        } else {
            this.sendMessage(chatId, 'Please provide a valid link and target price. Example: /watchprice <URL> <TARGET_PRICE>');
        }
    }
}

module.exports = PriceWatcherBot