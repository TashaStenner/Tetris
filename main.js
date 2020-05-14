document.addEventListener(`DOMContentLoaded` , () => {
const grid = document.querySelector(`.grid`);   
let squares = Array.from(document.querySelectorAll(`.grid div`));
const width = 10; 
let displaySquares = document.querySelectorAll(`.mini-grid div`);
const displayWidth = 4;
let displayIndex = 0;
const scoreDisplay = document.querySelector(`#score`);
const startBtn = document.querySelector(`#start-button`);
let timerId;

// The Tetrominoes
const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ];

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1 ],
    [width+1, width+2, width*2, width*2+1]
  ];

const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ];

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];

const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

let currentPosition = 4;
let currentRotation = 0;

let randomSelection = Math.floor(Math.random()*theTetrominoes.length);

let current = theTetrominoes[randomSelection][currentRotation];

const draw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.add(`tetromino`)
    })
}

const undraw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove(`tetromino`)
    })
}


//movement

const moveDown = () => {
    undraw()
    currentPosition += width
    draw()
    freeze()
};

timerId = setInterval(moveDown, 1000);

draw()

const freeze = () => {
    if(current.some(index => squares[currentPosition + index + width].classList.contains(`taken`))) {
       current.forEach(index => squares[currentPosition + index].classList.add(`taken`)) , 
       randomSelection = Math.floor(Math.random() * theTetrominoes.length)
       current = theTetrominoes[randomSelection][currentRotation]
       currentPosition = 4
       draw()
    }
}


const moveLeft = () => {
    undraw()
    const isALeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isALeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition +=1
    }

    draw()
}

const moveRight = () => {
    undraw()
    const isRightEdge = current.some(index => (currentPosition + index) % width === width-1 )

    if(!isRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains(`taken`))) {
        currentPosition -=1
    }

    draw()
}

const rotate = () => {
    undraw()
    currentRotation ++ 
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[randomSelection][currentRotation]
    draw()
}

const control = (event) => {
    if(event.keyCode === 37) {
        moveLeft()
    }else if(event.keyCode === 38) {
        rotate()
    }else if(event.keyCode === 39) {
        moveRight()
    }else if(event.keyCode === 40) {
        moveDown()
    }

}

document.addEventListener('keyup', control);

const upNextTetromino = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2], 
    [0, 1, displayWidth, displayWidth+1], 
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] 
]

const displayUpNext = () => {
    displaySquares.forEach(item => )
}
})