# Amazon Price Watcher Bot

---

This is a Telegram bot built with Node.js that helps you monitor the prices of Amazon products and notifies you when the price drops below a target value you specify. The bot provides an easy way to track product prices directly through your Telegram account, sending real-time notifications.

## Features

- **Monitor any Amazon product**: Track the price of any Amazon product by providing its URL.
- **Real-time notifications**: Receive alerts when the product price drops below your target price.
- **Simple commands**: Use easy-to-remember commands to set up your price tracking.
- **Fully automated**: No manual checks required—the bot will handle everything for you.
- **Telegram integration**: Accessible on any platform that supports Telegram (mobile, desktop, and web).

## How It Works

1. **Start the Bot**:

   - Start a chat with the bot on Telegram: [@mprice_watcher_bot](https://t.me/mprice_watcher_bot).
2. **Track a Product**:

   - Use the following command to track a product:
     ```bash
     /watchprice <URL> <Target_Price>
     ```

     Where:- `<URL>` is the Amazon product URL you want to monitor.
     - `<Target_Price>` is the price threshold below which you want to receive a notification.
3. **Receive Notifications**:

   - Once the product's price drops below your set target price, the bot will send you an alert.

### Example Command

```bash
/watchprice https://www.amazon.com/dp/B08KH53NKR 299
```

This command will monitor the product at the specified URL and notify you when the price falls below $299.

## Getting Started

### Prerequisites

- A **Telegram** account.
- **Node.js** and **npm** installed on your machine.
- A **Telegram Bot API key** (You can obtain this by chatting with [BotFather](https://t.me/BotFather) on Telegram).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/amazon-price-watcher-bot.git
   cd amazon-price-watcher-bot
   ```
2. **Install dependencies**:
   Use `npm` to install all required dependencies:

   ```bash
   npm install
   ```
3. **Set up**:
   Replace `<your_telegram_bot_token>` with the API token from BotFather.
   Replace `<YOUR_FIREBASE_CONFIG>` with the config from firebase.
4. **Start the bot**:

   ```bash
   node app.js
   ```

The bot will now be running and ready to respond to price tracking requests on Telegram.

## Built With

- **Node.js**: JavaScript runtime used for backend development.
- **Telegram Bot API**: For integrating the bot with Telegram.
- **Amazon Scraper**: To retrieve product prices from Amazon.
- **fetch**: For making HTTP requests to Amazon and Telegram

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Future Enhancements

- Add support for tracking products from other e-commerce platforms.
- Add features for tracking multiple products simultaneously for each user.
- Implement price history tracking for a more comprehensive analysis of price trends.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any feature requests or bug fixes.

---

Developed by [Madan Gopal](https://github.com/Madan2248c/).
