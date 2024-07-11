const luxuryLevelEl = document.querySelector('#level');
const liabilitiesEl = document.querySelector('#liabilities');
const netWorthEl = document.querySelector('#netWorth');
const itemPriceEl = document.querySelector('#itemPrice');
const imgEl = document.querySelector('.lexury img');
const tableEl = document.querySelector('#dyTable');
const walletEl = document.querySelectorAll(".crypto-wallet p");
const budgetEl = document.querySelector('#budget');
const errorEl = document.querySelector('#error');
const buyItemBtn = document.querySelector('#buyItem');

let buyBtnEls = [];
let sellBtnEls = [];
let priceEls = [];
let percentageEls = [];
let luxuryIdx = 0;








const crypto = [
    {
        name: 'Bitcoin',
        icon: 'https://s3.coinmarketcap.com/static-gravity/image/6fbea0356edd48a4a68a4b877195443c.png',
        alt: 'Bitcoin Icon',
        price: 20000,
        lowerPrice: 4000,
        quantity: 0,
        percentage: null
    },
    {
        name: 'Ethereum',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        alt: 'Ethereum Icon',
        price: 4000,
        lowerPrice: 600,
        quantity: 0,
        percentage: null
    },
    {
        name: 'BNB',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        alt: 'BNB Icon',
        price: 500,
        lowerPrice: 100,
        quantity: 0,
        percentage: null
    }
];


const player = {
    netWorth: null,
    budget: null,
    liabilities: null,
    currentLevel: null,
    cryptoWallet: null
};

const luxury = [
    {
        img: 'https://www.motorcyclenews.com/wp-images/4705/2023_bmw_s1000rr_01.jpg',
        alt: 'BMW S1000RR Photo',
        price: 18000,
        level: 1
    },
    {
        img: 'https://www.motortrend.com/uploads/sites/10/2023/05/2023-dodge-charger-sxt-sedan-angular-front.png',
        alt: 'Dodge-Charger Photo',
        price: 78000,
        level: 2
    }
];

const getRandomNum = (max) =>  { 

    return Math.ceil(Math.random()* max);
};

const getRandomPercentage = () => {
    
    return getRandomNum(3) * 10;
};

const priceFormat = (price) => {

    return `$${price.toLocaleString()}`;
};

const percentageFormat = (percentage) => {

    return `${percentage}%`;
};

const addInTable = () => {

    for(let i=0; i<crypto.length; i++){
        
        const element = crypto[i];

        const rowEl = document.createElement('tr');
        const iconEl = document.createElement('img');
        const iconTdEl = document.createElement('td');
        const priceTdEl = document.createElement('td');
        const percentageTdEl = document.createElement('td');
        const buySellTdEl = document.createElement('td');
        const buySellEl = document.createElement('div');

        const buyBtnEl = document.createElement('div');
        const sellBtnEl = document.createElement('div');

        element.percentage = getRandomPercentage();

        iconEl.setAttribute("src", element.icon);
        iconEl.setAttribute("alt", element.alt);
        
        iconEl.setAttribute("class", "cryptoIcon");
        buySellEl.setAttribute("class", "buySell");
        buyBtnEl.setAttribute("class", "buyBtn");
        sellBtnEl.setAttribute("class", "sellBtn");
        
        buyBtnEl.setAttribute("id", i);
        sellBtnEl.setAttribute("id", i);
        priceTdEl.setAttribute("id", i);
        percentageTdEl.setAttribute("id", i);


        buyBtnEl.textContent = "Buy";
        sellBtnEl.textContent = "Sell";


        
        priceTdEl.textContent = priceFormat(element.price);
        percentageTdEl.textContent = percentageFormat(element.percentage);
        
        tableEl.appendChild(rowEl);
        iconTdEl.appendChild(iconEl);
        buySellEl.appendChild(sellBtnEl);
        buySellEl.appendChild(buyBtnEl);
        buySellTdEl.appendChild(buySellEl);
        rowEl.appendChild(iconTdEl);
        rowEl.appendChild(priceTdEl);
        rowEl.appendChild(percentageTdEl);
        rowEl.appendChild(buySellTdEl);

        buyBtnEls.push(buyBtnEl);
        sellBtnEls.push(sellBtnEl);
        priceEls.push(priceTdEl);
        percentageEls.push(percentageTdEl);
    }
};

const setLuxuryItem = (luxuryItem) => {

    player.currentLevel = luxuryItem.level;
    imgEl.setAttribute("src", luxuryItem.img);
    imgEl.setAttribute("alt", luxuryItem.alt);
    itemPriceEl.textContent = priceFormat(luxuryItem.price);
    luxuryLevelEl.textContent = `Luxury Level ${player.currentLevel}`;
};


const init = () => {

    addInTable();
    luxuryIdx = 0;
    const luxuryItem = luxury[luxuryIdx];

    player.netWorth = 100000;
    player.budget = player.netWorth * 0.6;
    player.liabilities = player.netWorth * 0.4;
    player.cryptoWallet = 0;
    
    setLuxuryItem(luxuryItem);

    liabilitiesEl.textContent = priceFormat(player.liabilities);
    netWorthEl.textContent = priceFormat(player.netWorth);
    budgetEl.textContent = priceFormat(player.budget);

};

const buyItem = () => {
    let currentItem = luxury[luxuryIdx];
    const condition = (player.budget - currentItem.price) >= 0;

    if(condition){
        player.budget -= currentItem.price;
        budgetEl.textContent = priceFormat(player.budget);
        luxuryIdx++;
        currentItem = luxury[luxuryIdx];

        if(currentItem)
            setLuxuryItem(currentItem);
        else
            luxuryLevelEl.textContent = 'You Are Win!';

        
    }
};

const getProfitLose = () => {
    const profitLose = ['profit', 'lose', 'profit'];

    return profitLose[getRandomNum(3) - 1];
};

const setPercentage = (idx) => {
    crypto[idx].percentage = getRandomPercentage();
    percentageEls[idx].textContent = percentageFormat(crypto[idx].percentage);
}

const setPrice = (idx) => {

    const diffirent = (crypto[idx].percentage / 100) * crypto[idx].price;

    if(getProfitLose() === 'lose' && crypto[idx].price >= crypto[idx].lowerPrice){
        
        crypto[idx].price -= diffirent;
        percentageEls[idx].style.color = '#f6465d';
        
    }
    else{
        crypto[idx].price += diffirent;
        percentageEls[idx].style.color = '#2ebd85';
    }

    priceEls[idx].textContent = priceFormat(crypto[idx].price);
}

const getCryptoWallet = () => {

    player.cryptoWallet = 0;

    crypto.forEach(el => {
            player.cryptoWallet += el.price * el.quantity;
    });

    return player.cryptoWallet;
};

const setNetWorth = () => {
    player.netWorth = player.budget + getCryptoWallet() + player.liabilities;
    // player.netWorth = player.budget + getCryptoWallet() + liability;
    netWorthEl.textContent = priceFormat(player.netWorth);
};

const setLiabilities = () => {
    const liabilitiesVal = player.netWorth * 0.4;
    
    if(player.liabilities < liabilitiesVal){
        // setNetWorth(liabilitiesVal)
        player.liabilities = liabilitiesVal;
        liabilitiesEl.textContent = priceFormat(liabilitiesVal);
    }

    return player.liabilities;

};


const buyCrypto = (btn) => {
    const idx = btn.target.id;
    const condition = (player.budget - crypto[idx].price) >= 0;
    
    if(condition){
        errorEl.hidden = true;
        crypto[idx].quantity++;
        player.budget -= crypto[idx].price;

        walletEl[idx].textContent = crypto[idx].quantity;
        budgetEl.textContent = priceFormat(player.budget);

        setPercentage(idx);
        setPrice(idx);

        setNetWorth();
        setLiabilities()
        
    }
    else{
        errorEl.hidden = false;
        errorEl.textContent = `Your budget is not enough to buy ${crypto[idx].name}.`;
    }
};

const sellCrypto = (btn) => {
    const idx = btn.target.id;
    const condition = (crypto[idx].quantity > 0);

    if(condition){
        errorEl.hidden = true;

        crypto[idx].quantity--;
        player.budget += crypto[idx].price;
        walletEl[idx].textContent = crypto[idx].quantity;
        budgetEl.textContent = priceFormat(player.budget);
        
        setPercentage(idx);
        setPrice(idx);

        setNetWorth();
        setLiabilities();
    }
    else{
        errorEl.hidden = false;
        errorEl.textContent = `Your don't have enough ${crypto[idx].name} to sell.`;
    }
    
};

init();

buyItemBtn.addEventListener('click', buyItem);
buyBtnEls.forEach(btn => btn.addEventListener('click', buyCrypto));
sellBtnEls.forEach(btn => btn.addEventListener('click', sellCrypto));

