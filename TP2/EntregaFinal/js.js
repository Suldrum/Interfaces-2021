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
	//Recalcula el tamaño del canvas -> Esto seguro tenga que ir en otra funcion porque falta el espacio que sera para las fichas
	let anchoTablero=  document.getElementById('anchoTablero').value;
	let altoTablero= document.getElementById('altoTablero').value;
	let tiempo = document.getElementById('selectorTiempo');
	if (!tiempo.disabled)
	{	
		let timer = new Reloj(tiempo.value);
		timer.iniciar();
		document.getElementById('salir').addEventListener('click',function(e){timer.terminar();})
	}
	let tablero = new Tablero(3 * TAMAÑO, (TAMAÑO / 2),canvas,anchoTablero, altoTablero );
	tablero.dibujarTablero();
	tablero.dibujarDefault();
	
});

let contador= 75;
document.getElementById('test').addEventListener('click',function(e){
	contador-=6;
	let ficha = new Ficha(contador,contador,"#000000",ctx);
	ficha.dibujarFicha();
});