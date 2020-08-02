//lundi le 29 mars 2020
//@author Noula Darlin

const grid = document.querySelector('.grid')
const width = 8
const squares = []

const candyColors = [
    'url(red-candy.png)',
    'url(yellow-candy.png)',
    'url(orange-candy.png)',
    'url(purple-candy.png)',
    'url(green-candy.png)',
    'url(blue-candy.png)'
]

 function createBoard(){
     for (let index = 0; index < width*width; index++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id',index)
        const randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.background = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
         
     }
 }

createBoard() 

// dragger les elements
let colorDrag
let colorReplaced
let squareDraggedId
let squareReplacedId
squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('drop', drop))


function dragStart() {
    colorDrag = this.style.background
    squareDraggedId = parseInt(this.id)
    console.log(this.id, 'dragStart',colorDrag );
    
}

function dragEnd() {
    let validMoves = [
        squareDraggedId -1,
        squareDraggedId - width,
        squareDraggedId + 1,
        squareDraggedId +width
    ]
    let validMove = validMoves.includes(squareReplacedId)
    console.log(validMove, " et ", validMoves, "et" , squareReplacedId)

    console.log(this.id, 'dragEnd' );
    if(squareReplacedId && validMove){
        squareReplacedId = null
    }
    else if(squareReplacedId && !validMove){
        squares[squareReplacedId].style.background = colorReplaced
        squares[squareDraggedId].style.background = colorDrag
    }
    else squares[squareDraggeddId].style.background = colorDrag
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragOver' );
    
}

function dragLeave(e) {
    e.preventDefault()
    console.log(this.id, 'dragLeave' );
    
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragEnter' );
    
}

function drop() {
    colorReplaced = this.style.background
    squareReplacedId = parseInt(this.id)
    this.style.background = colorDrag
    squares[squareDraggedId].style.background = colorReplaced
    console.log(this.id, 'drop' );
    
}

//chercher correspondance
function rowOfThree(){
    for (let i = 0; i < 61; i++) {
        let rowThreeMatch = [i ,i +1, i+2]
        let decidedColor = squares[i].style.background
        const isBlank = squares[i].style.background === ''
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if (notValid.includes(i)) continue
        if(rowThreeMatch.every(index => squares[index].style.background === decidedColor && !isBlank)){
            rowThreeMatch.forEach( index => {
                squares[index].style.background = ''
            })
        }
        
        
    }
}
function columnOfThree(){
    for (let i = 0; i < 47; i++) {
        let columnThreeMatch = [i ,i+width, i+width*2]
        let decidedColor = squares[i].style.background
        const isBlank = squares[i].style.background === ''
       if(columnThreeMatch.every(index => squares[index].style.background === decidedColor && !isBlank)){
            columnThreeMatch.forEach( index => {
                squares[index].style.background = ''
            })
        }
        
        
    }
}
function rowOfFour(){
    for (let i = 0; i < 61; i++) {
        let rowFourMatch = [i ,i +1, i+2,i+3]
        let decidedColor = squares[i].style.background
        const isBlank = squares[i].style.background === ''
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if (notValid.includes(i)) continue
        if(rowFourMatch.every(index => squares[index].style.background === decidedColor && !isBlank)){
            rowFourMatch.forEach( index => {
                squares[index].style.background = ''
            })
        }
        
        
    }
}
//ajputer les bonnons au fur et a mesure 
function addMoreCandies(){
    for (let index = 0; index < 55; index++) {
        if(squares[index + width].style.background === ''){
            squares[index + width].style.background = squares[index].style.background
            squares[index].style.background = ''
            let firtCandies = [0,1,2,3,4,5,6,7]
            let verifyCandies = firtCandies.includes(index)
            if (verifyCandies && (squares[index].style.background === ''))
             {
                const randomColor = Math.floor(Math.random() * candyColors.length)
            squares[index].style.background = candyColors[randomColor]
            
            }
            
        }
    }
}
addMoreCandies()
function columnOfFour(){
    for (let i = 0; i < 39; i++) {
        let columnFourMatch = [i ,i+width, i+width*2,i+width*3]
        let decidedColor = squares[i].style.background
        const isBlank = squares[i].style.background === ''
        if(columnFourMatch.every(index => squares[index].style.background === decidedColor && !isBlank)){
            columnFourMatch.forEach( index => {
                squares[index].style.background = ''
            })
        }
        
        
    }
}
window.setInterval(function () {
    addMoreCandies()
    rowOfFour()
    columnOfFour()
    rowOfThree()
    columnOfThree()
   
},100)
