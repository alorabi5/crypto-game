const luxuryLevelEl = document.querySelector('#level');
const liabilitiesEl = document.querySelector('#liabilities');
const netWorthEl = document.querySelector('#netWorth');
const itemPriceEl = document.querySelector('#itemPrice');
const imgEl = document.querySelector('.lexury img');
const tableEl = document.querySelector('#dyTable');
const walletEl = document.querySelectorAll(".crypto-wallet p");
const cashEl = document.querySelector('#cash');
const errorEl = document.querySelector('#error');
const buyItemBtn = document.querySelector('#buyItem');
const timerEl = document.querySelector('#timer');
const audio = document.createElement('audio');
const budgetEl = document.querySelector('#budget');
const restartEl = document.querySelector('#restartBtn');

let buyBtnEls = [];
let sellBtnEls = [];
let priceEls = [];
let percentageEls = [];
let luxuryIdx = 0;
let timerStarted = false;







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
    cash: null,
    liabilities: null,
    currentLevel: null,
    cryptoWallet: null,
    budget: null
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
    timerStarted = false;
    luxuryIdx = 0;
    const luxuryItem = luxury[luxuryIdx];

    // audio.setAttribute('src', '/Audio/Start.mp3');
    // audio.play();

    player.netWorth = 100000;
    player.cash = player.netWorth * 0.6;
    player.liabilities = player.netWorth * 0.4;
    player.cryptoWallet = 0;
    player.budget = player.cash;
    
    setLuxuryItem(luxuryItem);

    liabilitiesEl.textContent = priceFormat(player.liabilities);
    netWorthEl.textContent = priceFormat(player.netWorth);
    cashEl.textContent = priceFormat(player.cash);
    timerEl.textContent = 0;
    budgetEl.textContent = priceFormat(player.budget);

};

const buyItem = () => {
    let currentItem = luxury[luxuryIdx];
    const condition = (player.cash - currentItem.price) >= 0;

    if(condition){
        player.cash -= currentItem.price;
        player.budget -= currentItem.price;
        cashEl.textContent = priceFormat(player.cash);
        luxuryIdx++;
        currentItem = luxury[luxuryIdx];
        budgetEl.textContent = priceFormat(player.budget);

        if(currentItem){
            setLuxuryItem(currentItem);
            audio.setAttribute('src', '/Audio/levelUp.mp3');
            audio.play();
        }

        else{
            luxuryLevelEl.textContent = 'You Are Win!';
            audio.setAttribute('src', '/Audio/Win.mp3');
            audio.play();
        }

        
    }
};

const getProfitLose = () => {
    const profitLose = ['profit', 'lose'];

    return profitLose[getRandomNum(2) - 1];
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
    budgetEl.textContent = player.cash + getCryptoWallet();
    player.netWorth = player.cash + getCryptoWallet() + player.liabilities;
    netWorthEl.textContent = priceFormat(player.netWorth);
};

const setLiabilities = () => {
    const liabilitiesVal = player.netWorth * 0.4;
    
    if(player.liabilities < liabilitiesVal){
        const diffirent = liabilitiesVal - player.liabilities;
        player.liabilities = liabilitiesVal;
        liabilitiesEl.textContent = priceFormat(liabilitiesVal);
    }

    setNetWorth();

};


const checkLose = () => {
    player.budget = player.cash + player.cryptoWallet;
    budgetEl.textContent = priceFormat(player.budget);
    const condition = player.budget < player.liabilities;
    if(condition && luxury[luxuryIdx]){
        luxuryLevelEl.textContent = `Player Lose`;
        
        audio.setAttribute('src', '/Audio/lose.mp3');
        audio.play();
    }
};

const buySellProcess = () => {
    

    
        crypto.forEach((el, index) => {
        
        setPercentage(index);
        setPrice(index);
        });

        setNetWorth();
        setLiabilities();
    
};

const timerProcess = () => {
    let seconds = 0;
    const timerAudio = document.createElement('audio');
    timerEl.textContent = seconds;
    const intervalId = setInterval(() => {
        seconds++;
        
        timerAudio.setAttribute('src', '/Audio/timer.mp3');
        timerAudio.play();
        timerEl.textContent = seconds;
        
        if (seconds >= 10) { 
            clearInterval(intervalId);
            buySellProcess();
            checkLose();
            timerStarted = false;
            timerAudio.pause();
            
        }
    }, 1000);
};

const finalProcess = () => {
    if(!timerStarted){
        timerStarted = true;
        timerProcess();
    }
};

const buyCrypto = (btn) => {
    const idx = btn.target.id;
    const condition = (player.cash - crypto[idx].price) >= 0;
    
    if(condition){
        errorEl.hidden = true;
        crypto[idx].quantity++;
        player.cash -= crypto[idx].price;

        walletEl[idx].textContent = crypto[idx].quantity;
        cashEl.textContent = priceFormat(player.cash);

        finalProcess();
        
    }
    else{
        errorEl.hidden = false;
        errorEl.textContent = `Your cash is not enough to buy ${crypto[idx].name}.`;
    }
};

const sellCrypto = (btn) => {
    const idx = btn.target.id;
    const condition = (crypto[idx].quantity > 0);

    if(condition){
        errorEl.hidden = true;

        crypto[idx].quantity--;
        player.cash += crypto[idx].price;
        walletEl[idx].textContent = crypto[idx].quantity;
        cashEl.textContent = priceFormat(player.cash);
        
        finalProcess();
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
restartEl.addEventListener('click', ()=> {
    
});





