let roll = document.getElementById('roll')
let hold = document.getElementById('hold')
let newGame = document.getElementById('newgame')
let dice = document.getElementById('dice')
let goal = 100

//Array of dice faces, showing 6 by default

let dices = []
for (let i = 0; i < 6; i++) {
    dices[i]= document.createElement("img")
    dices[i].src = `images/Dice${i+1}.png`
    document.getElementById('dices').appendChild(dices[i])
}
dices[5].style.display = 'inline'


class Player {
    constructor(id, rscoreElement, gscoreElement, dot, player) {
        this.id = id
        this.rscoreElement = document.getElementById(rscoreElement)
        this.gscoreElement = document.getElementById(gscoreElement)
        this.rscore = 0
        this.gscore = 0
        this.dot = document.getElementById(dot)
        this.player = document.getElementById(player)
    }
}

//Initialize Players
let player1 = new Player(1, 'rscore1', 'gscore1', 'dot-player1','player1')
let player2 = new Player(2, 'rscore2', 'gscore2', 'dot-player2','player2')
let currentPlayer = player1
let nextPlayer = player2



//Roll the dice, hide all img then show the one rolled, stop turn on '1'
function rolling(Player) {
    //console.log("rolling")
    
    let score = Math.round(Math.random() * 5 + 1)

    dices.forEach(element => {
        element.style.display = "none"  
    });
    dices[score-1].style.display = "inline"
    console.log(score-1)

    if (score == 1) {
        Player.rscore = 0
        Player.rscoreElement.innerHTML = 1
        holding(Player)
    } else {
        Player.rscore += score
        Player.rscoreElement.innerHTML = Player.rscore
    }
}

roll.addEventListener('click', function () {
    rolling(currentPlayer)
    
})

//Add Round Score to Global Score,check for win, change players
function holding(Player) {
    //console.log("holding")
    Player.gscore += Player.rscore
    Player.gscoreElement.innerHTML = Player.gscore
    Player.rscore = 0
    Player.rscoreElement.innerHTML = 0

    if (Player.gscore >= goal) {
        alert(`Player ${Player.id} win`)
        restart()
    } else {
        currentPlayer = nextPlayer
        nextPlayer = Player
    }
    nextPlayer.dot.style.display = 'none'
    nextPlayer.player.style.color = 'Silver'
    currentPlayer.dot.style.display = 'inline'
    currentPlayer.player.style.color = 'black'

}

hold.addEventListener('click', function () {
    holding(currentPlayer)
})


//Reset the game
newGame.addEventListener('click', function () {
    restart()
})

function restart() {
    player1.gscore = 0
    player2.gscore = 0
    player1.rscore = 0
    player2.rscore = 0
    player1.gscoreElement.innerHTML = player1.gscore
    player1.rscoreElement.innerHTML = player1.rscore
    player2.gscoreElement.innerHTML = player2.gscore
    player2.rscoreElement.innerHTML = player2.rscore
    console.log("new game")
}


