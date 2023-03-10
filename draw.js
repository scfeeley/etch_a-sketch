let drawing = false;
let width = 16;
/**********************************
User Interface
 *********************************/
const container = document.querySelector('.container');


const grid = document.createElement('div');
grid.classList.add('grid');
let squares = [];
let rows =[];
for(let i = 0; i < width; i++){
    squares.push([]);
    rows.push(document.createElement('div'));
    rows[i].classList.add('row');
    for(let j = 0; j < width; j++){
      squares[i].push(document.createElement('div'));
      squares[i][j].classList.add('square');
      //if in first row add class top
      if(i === 0){
        squares[i][j].classList.add('top');
      }
      //if in last column add class right
      if(j + 1 === width){
        squares[i][j].classList.add('right');
      }
      //If mouse down, start drawing
      squares[i][j].addEventListener('mousedown', ()=>{
        drawing = true;
        squares[i][j].classList.add('select');
        squares[i][j].style.backgroundColor = colors.value;
      })
      //If mouse enters square while drawing, keep drawing
      squares[i][j].addEventListener('mouseenter', () =>{
        if(drawing){
          squares[i][j].classList.add('select');
          squares[i][j].style.backgroundColor = colors.value;
      }
    });
      rows[i].appendChild(squares[i][j]);
    }
    grid.appendChild(rows[i]);
}
container.appendChild(grid)


//create toolbar
const tools = document.createElement('div');
tools.classList.add('tools');

const colorSpan = document.createElement('span');
colorSpan.textContent = 'Pick a Color: '

const colors = document.createElement('input');
colors.setAttribute('type', 'color');
colors.setAttribute('value', '#000000');
colorSpan.appendChild(colors);
tools.appendChild(colorSpan);

const sizeSpan = document.createElement('span');
const size = document.createElement('input');
sizeSpan.textContent ='Choose Grid Size: ';
size.setAttribute('type', 'number');
size.setAttribute('value', '16');
size.setAttribute('min', 10);
size.setAttribute('max', 50);
size.classList.add('size');
width = size.getAttribute('value');
sizeSpan.appendChild(size);
tools.appendChild(sizeSpan);

const clearSpan = document.createElement('span');
clearSpan.classList.add('clearSpan')
const clear = document.createElement('button');
clear.classList.add('clear');
clear.textContent = 'clear';
clear.addEventListener('click', () =>{
  let changed = document.querySelectorAll('.select');
  for (let i = 0; i < changed.length; i++) {
    changed[i].classList.remove('select');
    changed[i].style.backgroundColor ='white';
  }
});
clearSpan.appendChild(clear);
tools.appendChild(clearSpan);



//create knobs 
const leftKnob =document.createElement('div');
leftKnob.classList.add('circle');
leftKnob.classList.add('left');

const rightKnob = document.createElement('div');
rightKnob.classList.add('circle');
rightKnob.classList.add('right');

container.appendChild(leftKnob);
container.appendChild(rightKnob);
container.append(tools);

//If mouse up anywhere on page, stop drawing
document.addEventListener('mouseup', ()=>{
  drawing = false;
})
size.addEventListener('keypress', (e) =>{
  if(e.key === 'Enter'){
    width = size.value;
    if(width < 16){
      size.setAttribute('value', '16');
      size.value = 16;
      alert('Must be a size between 16 and 50. Try Again.');
    }else if(width > 50){
      alert('Must be a size between 16 and 50. Try Again.');
      size.value = 50;
    }
  }
})