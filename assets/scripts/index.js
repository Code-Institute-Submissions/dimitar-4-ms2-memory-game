// CB Memory Game

const cards = [
    {
        id: 1,
        name: "Toyota",
        imageSrc: "./assets/images/toyota-logo.png",
    },
    {
        id: 2,
        name: "Honda",
        imageSrc: "./assets/images/honda-logo.png",
    },
    {
        id: 3,
        name: "Subaru",
        imageSrc: "./assets/images/subaru-logo.png",
    },
    {
        id: 4,
        name: "Nissan",
        imageSrc: "./assets/images/nissan-logo.png",
    },
    {
        id: 5,
        name: "Mazda",
        imageSrc: "./assets/images/mazda-logo.png",
    },
    {
        id: 6,
        name: "Mitsubishi",
        imageSrc: "./assets/images/mitsubishi-logo.png",
    },
    {
        id: 7,
        name: "Suzuki",
        imageSrc: "./assets/images/suzuki-logo.png",
    },
    {
        id: 8,
        name: "Daihatsu",
        imageSrc: "./assets/images/daihatsu-logo.png",
    },
];

const cardsWithDuplicates = cards.concat(cards);

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
let resultDisplay = {};
let seconds = 60;
let time;

document.addEventListener("DOMContentLoaded", () => {
    
    // Randomise the cards order
    
    cardsWithDuplicates.sort(() => Math.random() - 0.5);

    const game = document.querySelector(".game");

    function initialiseGame() {
        let cardsHTML = [];
        for (let i = 0; i < cardsWithDuplicates.length; i++) {
            let card = document.createElement("img");
            card.setAttribute("src", "./assets/images/card-back.png");
            card.setAttribute("data-id", cardsWithDuplicates[i].id);
            card.addEventListener("click", handleCardClick);
            game.appendChild(card);
        }
        game.append(cardsHTML);
    }

    // Checking for Match

    function checkForMatch() {
        const cardOneId = cardsChosenId[0];
        const cardTwoId = cardsChosenId[1];
        if (cardOneId !== cardTwoId) {
            cardsChosen[0].setAttribute("src", "./assets/images/card-back.png");
            cardsChosen[1].setAttribute("src", "./assets/images/card-back.png");
        } else {
            cardsWon.push(cardOneId);
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cards.length) {
            alert("CONGRATULATIONS, YOU WIN!");
        }
    }

    // Card click event listener

    function handleCardClick() {
        let cardId = parseInt(this.dataset.id);
        cardsChosenId.push(cardId);
        cardsChosen.push(this);
        const imgSrc = cards.filter((obj) => {
            return obj.id === cardId;
        })[0].imageSrc;
        this.setAttribute("src", imgSrc);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Countdown Timer

    function countDown() {
        if (seconds < 60) {
            document.getElementById("timer").innerHTML = seconds + "s";
        }
        if (seconds > 0) {
            seconds--;
        } else {
            clearInterval(time);
            alert("TIMES UP, PRESS RESTART TO TRY AGAIN!");
        }
        if (cardsWon.length === cards.length) {
            clearInterval(time);
        }
    }
    document.getElementById("gameboard").onclick = function () {
        if (!time) {
            time = window.setInterval(function () {
                countDown();
            }, 1000);
        }
    };

    document.getElementById("timer").innerHTML = "60s";

    initialiseGame();
});

// Theme Buttons

function turnDefault() {
    document.body.style.backgroundImage = "url('./assets/images/road-bg.jpg')";
    window.localStorage.setItem('bg', 'default')
}
function turnBlue() {
    document.body.style.backgroundImage = "url('./assets/images/blue-bg.jpg')";
    window.localStorage.setItem('bg', 'blue')
}
function turnWorld() {
    document.body.style.backgroundImage = "url('./assets/images/world-bg.jpg')";
    window.localStorage.setItem('bg', 'world')
}

// Sets The Backgraound image in Local Storage

let storedBg = window.localStorage.getItem('bg');
  if (storedBg) {
    if (storedBg === 'default')
    {
      turnDefault();
    } else if (storedBg === 'world') {
        turnWorld();
    } else if (storedBg ==='blue') {
        turnBlue();
    }
  }
