const puppeteer = require("puppeteer");
const request = require('request-promise');
const cheerio = require('cheerio');


const FetchPrice = async (productUrl) => {
    const page = await request(productUrl);
    let $ = cheerio.load(page);
    const title = $('#productTitle').text().trim();
    const price = $('.priceToPay').text();
    let numericPrice = price.replace(/[^0-9]/g, '');
    // console.log(title);
    // console.log(numericPrice);
    obj = {
        "Name" : title,
        "Price" : numericPrice
    }
    return obj;
}


module.exports = FetchPrice;