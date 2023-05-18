let drawing = false;
let maxWidth = 100;
let minWidth = 16;
let startWidth = 16;

const container = document.querySelector('.drawing');
const size = document.getElementById('size');
const colors = document.getElementById('colors');

//Creates grid with specified width
function createGrid(width){
    let grid = document.getElementById('grid');
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
          squares[i][j].dataset.row = i;
          squares[i][j].dataset.column =j;

          //If mouse down, start drawing
          squares[i][j].addEventListener('mousedown', ()=>{
            drawing = true;
            squares[i][j].classList.add('select');
            squares[i][j].style.backgroundColor = colors.value;
          });

          //If mouse enters square while drawing, keep drawing
          squares[i][j].addEventListener('mouseenter', () =>{
            if(drawing){
              squares[i][j].classList.add('select');
              squares[i][j].style.backgroundColor = colors.value;
          }});


          //if mouse is released, stop drawing
          squares[i][j].addEventListener('mouseup', ()=>{
            drawing=false;
          });

          rows[i].appendChild(squares[i][j]);
        }

        grid.appendChild(rows[i]);

    }
}

//initialize grid
createGrid(startWidth);

//clear button event listener
const clear = document.getElementById('clear');
clear.addEventListener('click', () =>{
  let changed = document.querySelectorAll('.select');
  for (let i = 0; i < changed.length; i++) {
    changed[i].classList.remove('select');
    changed[i].style.backgroundColor ='white';
  }
});

//If mouse up anywhere on page, stop drawing
document.addEventListener('mouseup', ()=>{
  drawing = false;
});

//resize event listener
const resize = document.getElementById('resize');
resize.addEventListener('click', ()=>{
    let newWidth = size.value;
    if(newWidth < minWidth){
        alert(`Size must be greater than ${minWidth}`);
        size.value = 16;
    }else if(newWidth > 100){
        alert(`Size must be less than ${maxWidth}`);
        size.value = 16;
    }else{
        while(container.firstChild){
          container.firstChild.remove();
        }
       createGrid(newWidth);
    }
});
