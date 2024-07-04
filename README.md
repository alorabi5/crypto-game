# Crypto Game
![Design of the game interface](https://i.imgur.com/NBExiAV.jpg)

## About
The idea of ​​the game is for the player to invest in the cryptocurrency market to increase his budget so that he can live the luxurious life he aspires to. But he must avoid loss so that his Net Worth is not less than his Liabilities and he eventually declares bankruptcy and loses.

## User Story
The player will start the game with **$100,000** ***Net Worth***. And his ***Liabilities*** is ***40%*** of his ***Net Worth***. This mean the player have ***60%*** ***Budget*** and have a choice to buy the ***Luxury Item*** to go to the next ***Luxury Level*** or take the risk and buy cryptocurrency and get a chance to increases his ***Net Worth***, this leading to increases his ***Budget*** and ***Liabilities*** also. When the player rach the final level of ***Luxury Level*** the player will win. Other wise when player stumbled and lost in the cryptocurrency market and his ***Net Worth*** become less then his ***Liabilities***, the player will went bankrupt and lost the game.

> **Tip**: The amount of ***Liabilities*** will be fixed if the player's ***Net Worth*** decreases.

## Implementation

### 1. objects

I will create an objects contain:

```Javascript
const crypto = [
    {
        name: 'Bitcoin', 
        price: 20000,
        quantity: 0,
        percentage: 1
    },
    ...
];
```

```Javascript
const player = {
    netWorth: 100000,
    liabilities: netWorth * 0.4,
    luxuryLevel: 1,
    cryptoWallet: [
        crypto[0].quantity: 1,
        ...
    ];
}
```

```Javascript
const luxury = [
    {
        img: 'https://i.imgur.com',
        price: 18000
    }
]
```

`crypto`object contain cryptocurrency component.

`player` object contain all information about player.

### 2. functions

I will create functions to implement the game:

- `randomNumber()` to get random number.
- `calculateCryptoPrice()` to calculate price fluctuations.
- `nextLuxuryLvl()` to move to the next level of luxury living.
- `checkNetWorth()` to check if *Net Worth* is not less than player *Liabilities*.
- `checkBudget()` to check if *Budget* is enough.
- `buy()` to buy cryptocurrency or *Luxury* item.

- `sell()` to sell cryptocurrency.


### 3. Listener

I will create *Listener* for each button:

- `buyBtn.addEventListener` to implement action when player *Buy* cryptocurrency or *Luxury* item..

- `sellBtn.addEventListener` to implement action when player *Sell* cryptocurrency.