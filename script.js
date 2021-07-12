'use strict'

const Game = (function () {

    class Player {
        constructor(name, mark) {
            this.getName = () => {
                return name
            }

            this.getMark = () => {
                return mark
            }
        }
    }

    const boardContainer = document.getElementById('board')

    const winPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    const player1 = new Player('Takashi', 'X')
    const player2 = new Player('Takeshi', 'O')

    let player = player1

    let movesCounter = 0
    let cellsList = []

    let isInitialized = false


    class Board {
        constructor() {

            const clearGrid = () => {
                for (let cell of cellsList) {
                    cell.remove()
                }
                cellsList = []
            }

            const createGrid = () => {

                if (cellsList.length > 0) clearGrid()

                for (let i = 0; i < 9; i++) {
                    const cell = document.createElement('div')

                    boardContainer.appendChild(cell)

                    cellsList.push(cell)
                }
            }

            const addListeners = () => {

                for (let cell of cellsList) {
                    cell.addEventListener('mouseover', mouseEnter)
                    cell.addEventListener('mouseleave', mouseLeave)
                    cell.addEventListener('click', click)
                }

                function mouseEnter() {
                    this.textContent = player.getMark()
                }

                function mouseLeave() {
                    this.textContent = ''
                }

                function click() {
                    this.textContent = player.getMark()
                    this.style.color = 'black'
                    this.style.backgroundColor = 'rgb(213, 213, 213)'

                    movesCounter++

                    if (movesCounter >= 5) {
                        if (hasWon()) removeListeners()

                        if (movesCounter >= 9) {
                            // isDraw()
                            removeListeners()
                        }
                    }

                    switchPlayer()

                    this.removeEventListener('mouseover', mouseEnter)
                    this.removeEventListener('mouseleave', mouseLeave)
                    this.removeEventListener('click', click)
                }

                function removeListeners() {
                    for (let cell of cellsList) {
                        cell.style.cursor = 'initial'

                        cell.removeEventListener('mouseover', mouseEnter)
                        cell.removeEventListener('mouseleave', mouseLeave)
                        cell.removeEventListener('click', click)
                    }
                }
            }

            const init = () => {
                createGrid()
                addListeners()
            }

            init()
        }
    }

    function hasWon() {
        for (let i = 0; i < winPositions.length; i++) {
            let win = true

            winPositions[i].forEach((cell) => {
                const match = cellsList[cell].textContent == player.getMark()
                if (! match) {
                    win = false
                }
            })

            if (win) {
                winPositions[i].forEach((cell) => {
                    cellsList[cell].style.color = 'rgb(200, 0, 0)' // red
                })

                return true
            }
        }

        return false
    }

    function switchPlayer() {
        player = (player == player1) ? player2 : player1
    }

    function reset() {
        if (movesCounter > 0) {
            new Board()
            movesCounter = 0
        }
    }

    function start() {
        if (! isInitialized) {
            new Board()

            isInitialized = true
        }
    }

    return {
        reset,
        start
    }
})()

Game.start()
