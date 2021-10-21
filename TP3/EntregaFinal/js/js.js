'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 * 
 */

let game = null;
//Cuando se carga la pagina
 $(document).ready(function (){
    //Ave por defecto
    createBird();
});

//BOTON TEST
document.getElementById('play').addEventListener('click',function(e){
    this.hidden = true;
    document.getElementById('information').hidden = true;
    document.getElementById('informationButton').hidden = true;
    game = new Game(bird);
    game.initGame();
    document.getElementById("score").hidden = false;
    //Cuando se presiona la tecla para arriba el ave comienza a subir
    window.addEventListener('keydown', e => {
    //Si se mantiene presionando la flecha hacia arriba evito volver a invocar al metodo
    if (!e.repeat && e.key === "ArrowUp" ) {
        bird.changeStateClass("rising");
    }
    });

    //Cuando se deja de presionar la tecla para arriba el ave comienza a caer
    window.addEventListener('keyup', e => {  
    if (e.key === "ArrowUp") {
        bird.changeStateClass("falling");
    }
    });
   
});

//Pa' el dia que haya multiples aves
function createBird(){
    bird = new Bird("bird", "bird","flying");
}

//Limpia todos los elementos hijos de un padre
function cleanElements(toClean){
    let node = document.getElementById(toClean);
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

//Funcion para detener el juego en cualquier momento
document.getElementById('reset').addEventListener('click',function(e){
	document.getElementById('play').hidden = false;
    document.getElementById('informationButton').hidden = false;
    document.getElementById("score").hidden = true;
	this.hidden = true;
    game = null;
    cleanElements("coins");
    cleanElements("pipes");
    createBird();
});

//Funcion para controlar la visibilidad de la informacion
document.getElementById('informationButton').addEventListener('click',function(e){
	let text = document.getElementById('information');
	text.hidden = !text.hidden;
});