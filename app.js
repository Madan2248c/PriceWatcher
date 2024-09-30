const PriceWatcherBot = require('./bot.js');
const get_current_price = require('./PriceTracker.js');
const db = require('./databaseop.js');

const token = "<YOUR_BOT_TOKEN>";
const priceWatcherBot = new PriceWatcherBot(token);
var messages = [];


async function fetchMessagesDetails() {
    var data = await db.retrieveMessagesFromRealtimeDB();
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
        const chatId = data[i].chat_id;
        const link = data[i].link;
        const time = data[i].time;
        messages.push({ 'chatId': chatId, 'link': link, 'time': time });
    }
}

async function watchprices() {
    var data = await db.retrieveLinksFromRealtimeDB();
    await fetchMessagesDetails();

    const oneDayInMs = 24 * 60 * 60 * 1000;

    for (let i = 0; i < data.length; i++) {
        const link = data[i].link;
        const chatId = data[i].chatId;
        const target_price = data[i].target_price;
        const current_obj = await get_current_price(link);
        const current_price = current_obj['Price'];
        const Name = current_obj['Name'];
        // console.log(current_price);
        

        const existingMessage = messages.find(msg => msg.chatId === chatId && msg.link === link);

        if (existingMessage) {
            const lastSentTime = existingMessage.time;
            const currentTime = Date.now();

            if (currentTime - lastSentTime < oneDayInMs) {
                // console.log(`Message already sent for ${link} to chatId ${chatId} within the last 24 hours. Skipping...`);
                continue;
            }
            else{
                console.log("Sending message...");
                db.writeAboutMessage({ 'chat_id': chatId, 'link': link, 'time': Date.now() });
                priceWatcherBot.sendMessage(chatId, `Price dropped for ${Name}. Current price: ${current_price},\n You can buy it here: ${link}`);    
            }
        }

        if (current_price < target_price) {
            console.log("Sending message...");
            db.writeAboutMessage({ 'chat_id': chatId, 'link': link, 'time': Date.now() });
            priceWatcherBot.sendMessage(chatId, `Price dropped for ${Name}. \n Current price: ${current_price},\n You can buy it here: ${link}`);
        }
    }
}

setInterval(watchprices, 30000);

// watchprices()
