require('dotenv').config();
const { Telegraf } = require('telegraf');
//const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
//const Markup = require('telegraf/markup');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Enter the phone number below:'));
const getPerson = async() => {
    
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data);
    }
    const $ = await getHTML('https://meragor.com/profile-generator');
    const p = await getHTML('https://www.avast.com/random-password-generator');
    const n = await getHTML('http://en.castlots.org/nickname-generator-online/');

    try{
    //Parsed from 1st site
    const photo = $('#img_ava');
    const name = $('._txt._edit-txt').eq(0).text();
    const status = $('._txt._edit-txt').eq(1).text();
    const age = $('._txt._edit-txt').eq(3).text();
    const company = $('._txt._edit-txt').eq(4).text();
    const address = $('._txt._edit-txt').eq(5).text(); 
    const date = $('._txt._edit-txt').eq(7).text();
    
    //parsed from second one
    //Generate password
    const password = p('.password').text();

    //Generate email

    const nickName = n('.nick');
    
    //Checking parsed info
    console.log('Name:',name);
    //console.log('NickName:', nickName);
    console.log('Status:', status);
    console.log('age:', age);
    console.log('Company:',company);
    console.log('Address:', address);
    console.log('Date:',date);
    console.log('Password:', password);

    //Output
    
    bot.hears('info', (ctx) => ctx.reply(`Info:
Name:  ${name};
-----------------------------------------------------------------------
Status:  
${status}
-----------------------------------------------------------------------
Age:  ${age};
-----------------------------------------------------------------------
Company: 
${company}
-----------------------------------------------------------------------
Address:  
${address};
-----------------------------------------------------------------------
Date:  
${date};
-----------------------------------------------------------------------
Password:  
${password};
-----------------------------------------------------------------------`));
}
catch{
    console.log('ERROR!');
    ctx.reply('ERROR!');
}
};
//bot.hears('generate', (ctx) => ctx.reply(getPerson()));
getPerson();

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));