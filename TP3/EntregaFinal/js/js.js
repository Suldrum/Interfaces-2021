'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 * 
 */

//Variable del juego
let game = null;
//Variable del avatar
let bird = null;
//Cuando se carga la pagina
 $(document).ready(function (){
    //Ave por defecto
    document.getElementById('avatar').value = "blueBird";
    bird = new Bird("bird", "blueBird","flying");
});

//Boton que inicia el juego
document.getElementById('play').addEventListener('click',function(e){
    //Se oculta el menu principal
    document.getElementById('principalMenu').hidden = true;
    //Se crea el juego con el avatar elegido
    game = new Game(bird);
    //El juego arranca
    game.initGame();
    //Se muestra el menu del juego
    document.getElementById('gameMenu').hidden = false;
    //METODOS DE ESCUCHA MIENTRAS EL JUEGO ESTA ACTIVO
    //Cuando se presiona la tecla para arriba el ave comienza a subir
    window.addEventListener('keydown', e => {
    //Si se mantiene presionando la flecha hacia arriba evito volver a invocar al metodo
    if (!e.repeat && e.key === "ArrowUp" && game.getState() === "running") {
        bird.changeStateClass("rising");
    }
    });

    //Cuando se deja de presionar la tecla para arriba el ave comienza a caer
    window.addEventListener('keyup', e => {  
    if (e.key === "ArrowUp" && game.getState() === "running") {
        bird.changeStateClass("falling");
    }
    });
});

//Cambia la imagen de avatar segun lo elegido
document.getElementById('avatar').addEventListener('change',function(e){
    bird.changeBaseClass(this.value);
});


//Funcion para volver al menu
document.getElementById('reset').addEventListener('click',function(e){
    //Vuelve a mostrar el menu principal
	document.getElementById('principalMenu').hidden = false;
    //Oculta el menu del juego
    document.getElementById('gameMenu').hidden = true;
    //Se oculta a si mismo para que no quede visible hasta que el juego lo indique
    this.hidden = true;
    //El juego se elimina de la pantalla
    game.cleanGameOfScreen();
    //El ave vuelve a volar en su posicion inicial
    if(bird.getStateClass() !== "flying")
        {bird.changeStateClass("flying");}
    bird.setInitialPosition();

});



//Funcion para controlar la visibilidad de la informacion
document.getElementById('informationButton').addEventListener('click',function(e){
	let text = document.getElementById('information');
	text.hidden = !text.hidden;
});
