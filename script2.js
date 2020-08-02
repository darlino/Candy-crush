const grid = document.querySelector('.grid')
const width = 8
const squares = []
const candyColor = [
    'aqua','lime','black','lightgreen','lightpink','orange'
]

function createBoard(){
    for (let index = 0; index <width*width; index++) {
        const square = document.createElement('div')
        squares.push(square)
        square.setAttribute('draggable', true)
        square.setAttribute('id', index)
        const randomColor = Math.floor(Math.random() * candyColor.length)
        square.style.background = candyColor[randomColor]
        grid.appendChild(square)
        
        
    }
    
        
}
createBoard()

let colorDragged
let colorReplaced
let squareIdDragged
let squareIdReplaced
squares.forEach(i => i.addEventListener('dragstart',dragStart))
squares.forEach(i => i.addEventListener('dragend',dragEnd))
squares.forEach(i => i.addEventListener('dragleave',dragLeave))
squares.forEach(i => i.addEventListener('dragover',dragOver))
squares.forEach(i => i.addEventListener('dragenter',dragEnter))
squares.forEach(i => i.addEventListener('drop',drop))

function dragStart(){
    colorDragged = this.style.background
    squareIdDragged = parseInt(this.id)
    console.log(this.id, 'dragStart',colorDragged,squareIdReplaced);
    
}
function dragEnd(){

    
}
function dragLeave(){
 
    
}
function dragOver(){
    
    
}
function dragEnter(){
    
}
function drop(){
    colorReplaced = this.style.background
    squareReplacedId = parseInt(this.id)
    this.style.background = colorDragged
    squares[squareIdDragged].style.background = colorReplaced
}
