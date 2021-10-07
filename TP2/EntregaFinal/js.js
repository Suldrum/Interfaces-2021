'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 * 
 */

const MARGEN = 5 ;
const RADIO = 40;
const TAMAÑO = (RADIO + MARGEN) * 2;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


//Cuando se carga la pagina
 $(document).ready(function (){
    //Funcion que se encargada de dejar la pagina en default
    loadAllDefaults();

});

//Funcion que carga todos los valores por defecto
function loadAllDefaults() {
	document.getElementById('radioJugador').checked = true;
	document.getElementById('porTiempo').checked = false;
	let tiempo = document.getElementById('selectorTiempo');
	tiempo.disabled =true;
	tiempo.value = "15";
	document.getElementById('anchoTablero').value = "5";
	document.getElementById('altoTablero').value = "5";
	
}

//Se encarga de deshabilitar y habilitar el campo del tiempo
document.getElementById('porTiempo').addEventListener('change',function(e){
	let tiempo =document.getElementById('selectorTiempo');
	tiempo.disabled = !tiempo.disabled;
});



document.getElementById('jugar').addEventListener('click',function(e){

	//Limpia el canvas
	ctx.clearRect(0, 0,canvas.width, canvas.height);
	let juego = new Juego(canvas);
	juego.empezarJuego();
	let tiempo = document.getElementById('selectorTiempo');
	if (!tiempo.disabled)
	{	
		let timer = new Reloj(tiempo.value);
		timer.iniciar();
		document.getElementById('salir').addEventListener('click',function(e){timer.terminar();})
	}
	
});


document.getElementById('test').addEventListener('click',function(e){
	/*
	let ficha = new Ficha(200,200,"#FF0000",ctx);
	ficha.draggable=true;
	ficha.dibujarFicha();
	let player = new Jugador();
	player.agregarFicha(ficha);
	let otra = player.sacarFicha();
	otra.colocarPosicion(50,50);
	otra.dibujarFicha();
*/

});
