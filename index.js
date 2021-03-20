require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');
const cheerio = require('cheerio');
const bot = new Telegraf(process.env.BOT_TOKEN, {polling:true});

bot.start(ctx => ctx.reply(`
Let's generate new user.
Enter "generate"😉
`
)
);
bot.hears('/New User', ctx => {
    ctx.reply('Write your number below...');
});

//Men names, second names

const menFirstNames =[
    { id : 1,  name:'Алан', nickName: 'Alan'},
    { id : 2,  name:'Георгий', nickName: 'George'},
    { id : 3,  name:'Ильяс', nickName: 'Ilias'},
    { id : 4,  name:'Арсений', nickName: 'Arseniy'},
    { id : 5,  name:'Владислав', nickName: 'Vladislav'},
    { id : 6,  name:'Геннадий', nickName: 'Genadiy'},
    { id : 7,  name:'Даниил', nickName: 'Daniel'},
    { id : 8,  name:'Матвей', nickName: 'Matvei'},
    { id : 9,  name:'Денис', nickName: 'Denis'},
    { id : 10, name:'Богдан', nickName: 'Bohdan'},
    { id : 11, name:'Василий', nickName: 'Vasiliy'},
    { id : 12, name:'Виталий', nickName: 'Vitaliy'},
    { id : 13, name:'Вячеслав', nickName: 'Viacheslav'},
    { id : 14, name:'Семен', nickName: 'Semen'},
    { id : 15, name:'Станислав', nickName: 'Sviatoslav'},
    { id : 16, name:'Юрий', nickName: 'Yriy'},
    { id : 17, name:'Шамиль', nickName: 'Shamil'},
    { id : 18, name:'Савелий', nickName: 'Saveliy'},
    { id : 19, name:'Константин', nickName: 'Konstantin'},
    { id : 20, name:'Мирослав', nickName: 'Myroslav'},
    { id : 21, name:'Макар', nickName:'Makar'},
    { id : 22, name:'Демид', nickName:'Demid'},
    { id : 23, name:'Гордей', nickName:'Gordey'},
    { id : 24, name:'Клим', nickName:'Klym'},
    { id : 25, name:'Кирилл', nickName:'Kiryl'},
    { id : 26, name:'Егор', nickName:'Egor'},
    { id : 27, name:'Елисей', nickName:'Elisey'},
    { id : 28, name:'Захар', nickName: 'Zahar'},
    { id : 29, name:'Дмитрий', nickName: 'Dmitriy'},
    { id : 30, name:'Платон', nickName: 'Platon'},
    { id : 31, name:'Ринат', nickName: 'Rinat'},
    { id : 32, name:'Роберт', nickName: 'Robert'},
    { id : 33, name:'Петр', nickName: 'Petr'},
    { id : 34, name:'Олег', nickName: 'Oleh'},
    { id : 35, name:'Никита', nickName: 'Nicolas'},
    { id : 36, name:'Марсель', nickName: 'Marsel'},
    { id : 37, name:'Савва', nickName: 'Sava'},
    { id : 38, name:'Рустам', nickName: 'Rustam'},
    { id : 39, name:'Руслан', nickName: 'Ruslan'},
    { id : 40, name:'Роман', nickName:'Roman'},
    { id : 41, name:'Виктор', nickName: 'Viktor'},
    { id : 42, name:'Валентин', nickName: 'Valentyn'},
    { id : 43, name:'Артур', nickName: 'Artur'},
    { id : 44, name:'Максим', nickName: 'Marsim'},
    { id : 45, name:'Эльдар', nickName: 'Eldar'},
    { id : 46, name:'Тамерлан', nickName: 'Tamerlan'},
    { id : 47, name:'Эрик', nickName: 'Erik'},
    { id : 48, name:'Эльдар', nickName: 'Eldar'},
    { id : 49, name:'Эдуард', nickName: 'Edward'},
    { id : 50, name:'Ярослав', nickName: 'Yaroslav'},
];

const menSecondNames = [
{ id: 1, secondName: 'Смирнов',nickName: 'Smirnov' }, 
{ id: 2, secondName: 'Иванов',nickName: 'Ivanov' },
{ id: 3, secondName: 'Кузнецов',nickName: 'Kyznetsov' },
{ id: 4, secondName: 'Соколов',nickName: 'Sokolov' },
{ id: 5, secondName: 'Попов',nickName: 'Popov' },
{ id: 6, secondName: 'Лебедев',nickName: 'Lebedev' },
{ id: 7, secondName: 'Козлов',nickName: 'Kozlov' },
{ id: 8, secondName: 'Новиков',nickName: 'Novikov' },
{ id: 9, secondName: 'Морозов',nickName: 'Morozov' },
{ id: 10, secondName: 'Петров',nickName: 'Petrov' },
{ id: 11, secondName: 'Волков',nickName: 'Volkov' },
{ id: 12, secondName: 'Соловьёв',nickName: 'Soloviev' },
{ id: 13, secondName: 'Васильев',nickName: 'Vasiliev' },
{ id: 14, secondName: 'Зайцев',nickName: 'Zaitsev' },
{ id: 15, secondName: 'Павлов',nickName: 'Pavlov' },
{ id: 16, secondName: 'Семёнов',nickName: 'Semenev' },
{ id: 17, secondName: 'Голубев',nickName: 'Golubiev' },
{ id: 18, secondName: 'Виноградов',nickName: 'Vinogradov' },
{ id: 19, secondName: 'Богданов',nickName: 'Bogdanov' },
{ id: 20, secondName: 'Воробьёв',nickName: 'Vorobiev' },
{ id: 21, secondName: 'Фёдоров',nickName: 'Fedorov' },
{ id: 22, secondName: 'Михайлов',nickName: 'Mikhailov' },
{ id: 22, secondName: 'Беляев',nickName: 'Belaev' },
{ id: 23, secondName: 'Тарасов',nickName: 'Tarasov' },
{ id: 24, secondName: 'Белов',nickName: 'Below' },
{ id: 25, secondName: 'Комаров',nickName: 'Komarov' },
{ id: 26, secondName: 'Орлов',nickName: 'Orlov' },
{ id: 27, secondName: 'Киселёв',nickName: 'Kisiliev' },
{ id: 28, secondName: 'Макаров',nickName: 'Makarow' },
{ id: 29, secondName: 'Андреев',nickName: 'Andreev' },
{ id: 30, secondName: 'Ковалёв',nickName: 'Kovalev' },
{ id: 31, secondName: 'Ильин',nickName: 'Illin' },
{ id: 32, secondName: 'Гусев',nickName: 'Gusev' },
{ id: 33, secondName: 'Титов',nickName: 'Titov' },
{ id: 34, secondName: 'Кузьмин',nickName: 'Kyzmin' },
{ id: 35, secondName: 'Кудрявцев',nickName: 'Kudriatsev' },
{ id: 36, secondName: 'Баранов',nickName: 'Baranow' },
{ id: 37, secondName: 'Куликов',nickName: 'Kulikov' },
{ id: 38, secondName: 'Алексеев',nickName: 'Alekseev' },
{ id: 39, secondName: 'Степанов',nickName: 'Stepanov' },
{ id: 40, secondName: 'Яковлев',nickName: 'Yakovlev' },
{ id: 41, secondName: 'Сорокин',nickName: 'Sorokin' },
{ id: 42, secondName: 'Сергеев',nickName: 'Sergeev' },
{ id: 42, secondName: 'Романов',nickName: 'Romanov' },
{ id: 42, secondName: 'Захаров',nickName: 'Zaharow' },
{ id: 42, secondName: 'Борисов',nickName: 'Borysov' },
{ id: 43, secondName: 'Королёв',nickName: 'Koroliev' },
{ id: 44, secondName: 'Герасимов',nickName: 'Herasymov' },
{ id: 45, secondName: 'Пономарёв',nickName: 'Ponomarev' },
{ id: 46, secondName: 'Григорьев',nickName: 'Grigoriev' },
{ id: 47, secondName: 'Лазарев',nickName: 'Lazarev' },
{ id: 48, secondName: 'Медведев',nickName: 'Medvedev' },
{ id: 49, secondName: 'Ершов',nickName: 'Ershov' },
{ id: 50, secondName: 'Никитин',nickName: 'Nikitin' },
{ id: 51, secondName: 'Соболев',nickName: 'Sobolev' },
{ id: 52, secondName: 'Рябов',nickName: 'Riabov' },
{ id: 53, secondName: 'Поляков',nickName: 'Poliakov' }, 
];


//women names, second names

const womenNames = [
    {id : 1, name: 'Агафья',nickName: 'Ahafia'},
    {id : 2, name: 'Аглая',nickName: 'Ahlaya'},
    {id : 3, name: 'Агния',nickName: 'Agniya'},
    {id : 4, name: 'Агриппина',nickName: 'Agrippina'},
    {id : 5, name: 'Акулина',nickName: 'Akulina'},
    {id : 6, name: 'Алевтина',nickName: 'Alevtina'},
    {id : 7, name: 'Александра',nickName: 'Aleksandra'},
    {id : 8, name: 'Алина',nickName: 'Alina'},
    {id : 9, name: 'Алла',nickName: 'Alla'},
    {id : 10, name: 'Анастасия',nickName: 'Anastasia'},
    {id : 11, name: 'Ангелина',nickName: 'Angelina'},
    {id : 12, name: 'Анжела',nickName: 'Angella'},
    {id : 13, name: 'Анжелика',nickName: 'Angelica'},
    {id : 14, name: 'Анна',nickName: 'Anna'},
    {id : 15, name: 'Антонина',nickName: 'Antonina'},
    {id : 16, name: 'Анфисa',nickName: 'Anfisa'},
    {id : 17, name: 'Валентина',nickName: 'Valentina'},
    {id : 18, name: 'Валерия',nickName: 'Valeria'},
    {id : 19, name: 'Варвара',nickName: 'Varwara'},
    {id : 20, name: 'Василиса',nickName: 'Vasylisa'},
    {id : 21, name: 'Вера',nickName: 'Vera'},
    {id : 22, name: 'Вероника',nickName: 'Veronika'},
    {id : 23, name: 'Виктория ',nickName: 'Viktoria'},
    {id : 24, name: 'Галина',nickName: 'Galina'},
    {id : 25, name: 'Глафира',nickName: 'Hlafira'},
    {id : 26, name: 'Гликерия',nickName: 'Hlikeria'},
    {id : 27, name: 'Дана',nickName: 'Dana'},
    {id : 28, name: 'Дарья',nickName: 'Daria'},
    {id : 29, name: 'Евгения',nickName: 'Evgenia'},
    {id : 30, name: 'Евдокия',nickName: 'Evdokia'},
    {id : 31, name: 'Евлалия',nickName: 'Evlalia'},
    {id : 32, name: 'Евлампия',nickName: 'Evlampia'},
    {id : 33, name: 'Евпраксия',nickName: 'Evpraksia'},
    {id : 34, name: 'Елена',nickName: 'Elena'},
    {id : 35, name: 'Екатерина',nickName: 'Ekaterina'},
    {id : 36, name: 'Елизавета',nickName: 'Elisaveta'},
    {id : 37, name: 'Жанна',nickName: 'Zhanna'},
    {id : 38, name: 'Зинаида',nickName: 'Zinaida'},
    {id : 39, name: 'Злата',nickName: 'Zlata'},
    {id : 40, name: 'Зоя',nickName: 'Zoia'},
    {id : 41, name: 'Инга',nickName: 'Inga'},
    {id : 42, name: 'Инесса',nickName: 'Inessa'},
    {id : 43, name: 'Инна',nickName: 'Inna'},
    {id : 44, name: 'Иоанна',nickName: 'Ioanna'},
    {id : 45, name: 'Ираида',nickName: 'Iraida'},
    {id : 46, name: 'Ирина',nickName: 'Irina'},
    {id : 47, name: 'Ия',nickName: 'Iya'},
    {id : 48, name: 'Капитолина',nickName: 'Kapitolia'},
    {id : 49, name: 'Карина',nickName: 'Karina'},
    {id : 50, name: 'Кира',nickName: 'Kira'},
];

bot.start((ctx) => ctx.reply('Enter the phone number below:'));
const getPerson = async() => {
    const getHTML = async (url) => {
        const {data} = await axios.get(url)
        return cheerio.load(data);
    }
    const $ = await getHTML('https://meragor.com/profile-generator');

    //Mail number generate
    function mailNumber () {
        
       return Math.floor(Math.random() * (100000 - 1) + 1);
    }

    //Password generate
    function random_password_generate(max,min)
    {
        let passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
        let randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
        return randPassword;
    }

    //Random number generate
    function random_number_generate(max,min)
    {
        let passwordChars = "0123456789abcdefghijklmnopqrstuvwxyz";
        let randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
        let randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
        return randPassword;
    }    

    //Male or Female

    let maleOrFemale = Math.floor(Math.random() * (10 - 1) + 1);
    let name = '';

    if(maleOrFemale < 5){

        name = menFirstNames;
    }
    else{

        name = womenNames;
    }
    // Choose names by random id 
    let NameChooseId = Math.floor(Math.random() * (50 - 1) + 1);
    let SecondNamesChooseId = Math.floor(Math.random() * (53 - 1) + 1);
        
    //Return names which is chosen by id
    const menNameGenerator = name.find(function(menNameGenerator){
        return menNameGenerator.id === NameChooseId;
    });
    const menSecondNameGenerator = menSecondNames.find(function(menSecondNameGenerator){
        return menSecondNameGenerator.id === SecondNamesChooseId;
    });
    
    if(maleOrFemale >= 5){
        menSecondNameGenerator['secondName'] = `${menSecondNameGenerator['secondName']}a`;
        menSecondNameGenerator['nickName'] = `${menSecondNameGenerator['nickName']}a`
    }

    //Parsed from 1st site

        const status =  $('._txt._edit-txt').eq(1).text();
        const age =  $('._txt._edit-txt').eq(3).text();
        const address =  $('._txt._edit-txt').eq(5).text(); 
        const date =  $('._txt._edit-txt').eq(7).text();

        console.log('Name:',menNameGenerator['name'], menSecondNameGenerator['secondName']);
        console.log('NickName:',menNameGenerator['nickName'], menSecondNameGenerator['nickName']);
        console.log('Status:', status);
        console.log('age:', age);
        console.log('Address:', address);
        console.log('Date:',date);
        console.log('Mail:', `${menNameGenerator['nickName'].toLowerCase()}.${menSecondNameGenerator['nickName'].toLowerCase()}${mailNumber()}${random_number_generate(1,8)}@yahoo.com`);
        console.log('Password:', random_password_generate(16,20));
        
        //Main bot message
        const a = `
Name: 
${menNameGenerator['name']} ${menSecondNameGenerator['secondName']};
-----------------------------------------------------------------------
Status:  
${status}
-----------------------------------------------------------------------
Age:  ${age};
-----------------------------------------------------------------------
Address:  
${address};
-----------------------------------------------------------------------
Date:  
${date};
-----------------------------------------------------------------------
Mail: 
${menNameGenerator['nickName'].toLowerCase()}.${menSecondNameGenerator['nickName'].toLowerCase()}${mailNumber()}${random_number_generate(1,8)}@yahoo.com;
-----------------------------------------------------------------------
Password:  
${random_password_generate(10,20)};
-----------------------------------------------------------------------
Links:
---------------------
Facebook:
https://www.facebook.com/?stype=lo&jlou=Afe2ybM2HZNHZz2EMgrtbACCSn88TXZqUx8zy5mp4FRhZx4-O4IHG0f801kzlKfaQdq-p4P61e5hwSmVpsiplMdHjYG-LPahvmxUxJj-fc76mw&smuh=4871&lh=Ac9ABXXRl7YrRYb-3rI
-----------------------------------------------------------------------
Yahoo:
https://login.yahoo.com/account/create?.src=ym&.lang=en-US&.intl=us&.done=https%3A%2F%2Fmail.yahoo.com%2Fd&authMechanism=primary&specId=yidReg
-----------------------------------------------------------------------
Gmail:
https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp
-----------------------------------------------------------------------
Manager:
https://www.google.com/search?q=%D0%B1%D1%96%D0%B7%D0%BD%D0%B5%D1%81%20%D0%BC%D0%B5%D0%BD%D0%B5%D0%B4%D0%B6%D0%B5%D1%80
-----------------------------------------------------------------------
`;

    //Checking parsed info

    //Output
    return a;
};

(async function (bot, process) {
    const generate = bot.hears('generate', async (ctx) => ctx.reply(await getPerson()));
    generate;
    
    bot.launch();
    
    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
})(bot, process);