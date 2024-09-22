import './style.css'

// 1. Inicializar el canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

// 3. Board
const board = Array(BOARD_HEIGHT).fill([])
board.forEach((row, y) => {
  board[y] = Array(BOARD_WIDTH).fill(0)
})

// 4. Player Piece
let piece = {}

const piece1 = {
  position: { x: 6, y: 0 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

const piece2 = {
  position: { x: 6, y: 0 },
  shape: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ]
}
const piece3 = {
  position: { x: 6, y: 0 },
  shape: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ]
}
const pieces = [piece1, piece2, piece3]

function nextPiece() {
  const x = Math.floor(Math.random() * 3)
//  piece = pieces[0]
}

// 2. Game Loop
/* function update() {
  draw()
  window.requestAnimationFrame(update)
} */

// 5. Auto Drop
let dropCounter = 0
let lastTime = 0
nextPiece()

function update(time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if (dropCounter > 1000) {
    ArrowDown()
    dropCounter = 0
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      } else {
        context.fillStyle = 'white'
        context.fillRect(x + 1 / 2, y + 0.5, 1 / BLOCK_SIZE, 1 / BLOCK_SIZE)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'blue'
        context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
      }
    })
  })
}

function ArrowDown() {
  piece.position.y++
  if (checkColision()) {
    console.log('colision')
    piece.position.y--
    solidifyPiece()
    removeRow()
  }
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    if (checkColision()) {
      piece.position.x++
    }
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++
    if (checkColision()) {
      piece.position.x--
    }
  }
  if (event.key === 'ArrowDown') {
    ArrowDown()
  }
})

function checkColision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return value === 1 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
    })
  })
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) board[y + piece.position.y][x + piece.position.x] = 1
    })
  })
  nextPiece()
  piece.position.x = 6
  piece.position.y = 0
}

function removeRow() {
  piece.shape.forEach((row, y) => {
    if (board[y + piece.position.y].every(value => value === 1)) {
      board.splice(y + piece.position.y, 1)
      // board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      board.unshift(Array(BOARD_WIDTH).fill(0))
    }
  })
}

update()
