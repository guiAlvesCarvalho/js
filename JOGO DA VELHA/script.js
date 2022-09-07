//Dados iniciais
let table = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = ''
let warning = ''
let playing = false

reset()

//Eventos
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemclick)
})

//Funções
function itemclick(event) {
    let item = event.target.getAttribute('data-item')
    if(playing && table[item] === '') {
        table[item] = player
        renderTable()
        togglePlayer()
    }
}

function reset() {
    warning = ''

    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'x' : 'o'

    for(let i in table) {
        table[i] = ''
    }

    playing = true

    renderTable()
    renderInfo()
}

function renderTable() {
    for(let i in table) {
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = table[i]
    }

    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer () {
    player = (player === 'x') ? 'o' : 'x'
    renderInfo()
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = "Jogador 'x' venceu"
        playing = false
    } else if(checkWinnerFor('o')) {
        warning = "Jogador 'o' venceu"
        playing = false
    } else if(isFull()) {
        warning = "Empate"
        playing = false
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3'
    ]

    for(let w in pos) {
        let pArray = pos[w].split(',') // cria um array a1, a2, a3
        let hasWon = pArray.every(option => table[option] === player)
        if(hasWon) {
            return true
        }          
    }

    return false
}

function isFull() {
    for(let i in table) {
        if(table[i] === '') {
            return false
        }
    }

    return true
}