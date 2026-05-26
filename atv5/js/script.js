const colors = ["violet", "salmon", "lightblue", "beige", "orange", "lightgreen"];

let boxes = document.querySelectorAll('.box-flex');
let colorBoxes = document.querySelectorAll('.color-box');

function clickColor(index_color){

    for(let i = 0; i < 6; i++){
        let box = document.querySelector('#box' + i);
        if(box){
            box.classList.remove("border");
        }
    }

    let selected = document.querySelector('#box' + index_color);
    if(selected){
        selected.classList.add("border");
    }

    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.setProperty('background-color', colors[index_color]);
    }
}

function clickFormat(type){

  for(let i = 0; i < boxes.length; i++){
    if(type == 1){
      boxes[i].style.setProperty('border-radius', '50%');
      document.getElementById('format0').classList.remove("border");
      document.getElementById('format1').classList.add("border");
    } else {
      boxes[i].style.setProperty('border-radius', '0');
      document.getElementById('format1').classList.remove("border");
      document.getElementById('format0').classList.add("border");
    }
  }

  for(let i = 0; i < colorBoxes.length; i++){
    if(type == 1){
      colorBoxes[i].style.setProperty('border-radius', '50%');
    } else {
      colorBoxes[i].style.setProperty('border-radius', '0');
    }

  }
}

function changeSize(value){

    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.setProperty('width', value + 'px');
        boxes[i].style.setProperty('height', value + 'px');
    }
}

function changeDirection(value){
    let main = document.querySelector('#main');
    main.style.setProperty('flex-direction', value);
}

function changeJustify(value){
    let main = document.querySelector('#main');
    main.style.setProperty('justify-content', value);
}

function changeAlign(value){
    let main = document.querySelector('#main');
    main.style.setProperty('align-items', value);
}



 
