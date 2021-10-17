'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 * 
 */
let bird

let bodyHeight = parseInt(window.getComputedStyle(document.querySelector('body'), null).getPropertyValue("height").split("px")[0]);
//Cuando se carga la pagina
 $(document).ready(function (){
    //Funcion que se encargada de dejar la pagina en default
    bird = new Bird("bird", "bird",bodyHeight);

});

//BOTON TEST
document.getElementById('test').addEventListener('click',function(e){
 
 //   bird.removeClass("flying");
 //   bird.addClass("falling");
//	bird.addClass("dying");
 //   bird.changeClass("inGame");
    //    bird.startFalling();
    bird.changeClass("falling");
});

//Cuando se presiona la tecla para arriba el ave comienza a subir
window.addEventListener('keydown', e => {
    //Si se mantiene presionando la flecha hacia arriba evito volver a invocar al metodo
    if (!e.repeat && e.key === "ArrowUp") {
        bird.changeClass("rising");
    }else
        {return;}
});

//Cuando se deja de presionar la tecla para arriba el ave comienza a caer
window.addEventListener('keyup', e => {
    if (e.key === "ArrowUp") {
        bird.changeClass("falling");
    }
});

/*
*
document.getElementById('test').addEventListener('click',function(e){
    //Esto hace "caer al ave" cada...ehh....al ponerle mas top
    bird.removeClass("flying");
    bird.addClass("falling");
    interval = setInterval(() => {bird.makeJump(20);  }, 200);
});

*/