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
let bird = null;
//Cuando se carga la pagina
 $(document).ready(function (){
    //Ave por defecto
    document.getElementById('avatar').value = "blueBird";
    bird = new Bird("bird", "blueBird","flying");
});

//Boton que inicia el juego
document.getElementById('play').addEventListener('click',function(e){
    document.getElementById('principalMenu').hidden = true;
    game = new Game(bird);
    game.initGame();
    document.getElementById('gameMenu').hidden = false;
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

//Edita el tipo de avatar
document.getElementById('avatar').addEventListener('change',function(e){
    bird.cleanClasses();
	bird = new Bird("bird", this.value,"flying");
});


//Funcion para volver al menu
document.getElementById('reset').addEventListener('click',function(e){
	document.getElementById('principalMenu').hidden = false;
    document.getElementById('gameMenu').hidden = true;
    this.hidden = true;
    game.cleanGameOfScreen();
    game = null;
    if(bird.getStateClass() !== "flying")
        {bird.changeStateClass("flying");}
    bird.setInitialPosition();

});

//Funcion para controlar la visibilidad de la informacion
document.getElementById('informationButton').addEventListener('click',function(e){
	let text = document.getElementById('information');
	text.hidden = !text.hidden;
});
