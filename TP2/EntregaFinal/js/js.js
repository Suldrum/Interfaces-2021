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
let juego = null;


//Cuando se carga la pagina
 $(document).ready(function (){
    //Funcion que se encargada de dejar la pagina en default
    loadAllDefaults();

});

//Carga de valores por defecto a selectores
function loadSelectoresDefaults(){
	let tiempo = document.getElementById('selectorTiempo');
	tiempo.disabled =true;
	tiempo.value = "15";
	document.getElementById('anchoTablero').value = "5";
	document.getElementById('altoTablero').value = "5";
	document.getElementById('colorJugador1').value = "#ff0000";
	document.getElementById('colorJugador2').value = "#0000ff";
}

//Limpieza de inputs y labels
function limpiarTextos(){
	document.getElementById("jugadorTurno").innerHTML= "";
	document.getElementById("reloj").innerHTML= "";
	document.getElementById("nombreJugador1").value= "";
	document.getElementById("nombreJugador2").value= "";
}

//Carga de radios y checkboxs
function eleccionesDefaults(){
	document.getElementById('radioJugador').checked = true;
	document.getElementById('porTiempo').checked = false;
}

//Funcion que carga todos los valores por defecto
function loadAllDefaults() {
	ctx.clearRect(0, 0,canvas.width, canvas.height);
	document.getElementById('salir').disabled = true;
	eleccionesDefaults();
	loadSelectoresDefaults();
	limpiarTextos();	
}

//Crea al jugador 1 que siempre sera un jugador humano
function crearJugador1(){
	//Lectura de valores en el HTML
	let colorJugador1 = document.getElementById('colorJugador1').value;
	let nombreJugador1 = document.getElementById("nombreJugador1").value;
	//Si no se puso ningun nombre por defecto se llamara Jugador 1
	nombreJugador1 =  (nombreJugador1 === "") ?  "Jugador 1" : nombreJugador1;
	//Devuelve un jugador humano
	return new JugadorHumano(MARGEN, TAMAÑO, colorJugador1, ctx, nombreJugador1);
}

//Crea al jugador 2 que puede ser un jugador humano o IA
function crearJugador2(){
	//Lectura de valores en el HTML
	let colorJugador2 = document.getElementById('colorJugador2').value;
	let opcionJugador2 = document.querySelector('input[name="modoJuego"]:checked');
	//Si se eligio jugar contra otro jugador
	if (opcionJugador2.value === "jugador")
	{
		//Lectura de valores en el HTML
		let nombreJugador2 = document.getElementById("nombreJugador2").value;
		nombreJugador2 =  (nombreJugador2 === "") ? "Jugador 2" : nombreJugador2;
		//Devuelve un jugador humano
		return new JugadorHumano(canvas.width - ( 3 * TAMAÑO ) + RADIO , TAMAÑO, colorJugador2, ctx, nombreJugador2);
	}
	else{
		//Devuelve un jugador IA
		return new JugadorIA(canvas.width - ( 3 * TAMAÑO ) + RADIO , TAMAÑO, colorJugador2, ctx, opcionJugador2.value,document.getElementById('anchoTablero').value);
	}
}

//Crea el tablero
function crearTablero(){
	//Lectura de valores en el HTML
	let anchoTablero=  document.getElementById('anchoTablero').value;
	let altoTablero= document.getElementById('altoTablero').value;
	//Devuelve un tablero
	return new Tablero(3 * TAMAÑO, (TAMAÑO / 2),canvas,anchoTablero, altoTablero );
}

//Crea un juego que puede ser por tiempo o no
function crearJuego(tablero,jugador1,jugador2)
{
	//Lectura de valor en el HTML
	let tiempo = document.getElementById('selectorTiempo');
	//Si se eligio jugar con tiempo
	if (!tiempo.disabled)
	{	
		let reloj = new Reloj(tiempo.value);
		//Devuelve un juego temporizado
		return new JuegoTemporizado(tablero,jugador1,jugador2,reloj,ctx);
	}
	else{
		//Devuelve un juego sin tiempo
		return new Juego(tablero,jugador1,jugador2,ctx);
	}
}

//Se encarga de deshabilitar y habilitar el campo del tiempo
document.getElementById('porTiempo').addEventListener('change',function(e){
	//Lectura de valor en el HTML
	let tiempo =document.getElementById('selectorTiempo');
	//Cambia su estado actual por su contrario
	tiempo.disabled = !tiempo.disabled;
});

//Se encarga de habilitar el input del nombre del segundo jugador2
document.getElementById('radioJugador').addEventListener('click',function(e){
		document.getElementById('nombreJugador2').disabled = false;
});

//Se encarga de deshabilitar el input del nombre del segundo jugador2
document.getElementById('radioIA').addEventListener('click',function(e){
	document.getElementById('nombreJugador2').disabled = true;
});

//Funcion que controla que el color del jugador 1 no sea el mismo que el de jugador 2
document.getElementById('colorJugador1').addEventListener('change',function(e){
	//Lectura de valor en el HTML
	let colorJugador2 = document.getElementById('colorJugador2').value;
	//Si es el mismo y no es el default
	if ( this.value === colorJugador2 && colorJugador2 !== "#ff0000")
	{
		//Vuelve a su valor default
		this.value = "#ff0000";
	}
	else
	{	
		//Si es el mismo y es el default
		if ( this.value === colorJugador2)
		//Toma el valor default del jugador 2
		{ this.value = "#0000ff";}
	}
});

//Funcion que controla que el color del jugador 2 no sea el mismo que el de jugador 1
document.getElementById('colorJugador2').addEventListener('change',function(e){
	//Lectura de valor en el HTML
	let colorJugador1 = document.getElementById('colorJugador1').value;
	//Si es el mismo y no es el default
	if ( this.value === colorJugador1 && colorJugador1 !== "#0000ff")
	{
		//Vuelve a su valor default
		this.value = "#0000ff";
	}
	else
	{
		//Si es el mismo y es el default
		if ( this.value === colorJugador1)
		//Toma el valor default del jugador 1
		{this.value = "#ff0000";}
	}
});

//Funcion para iniciar el juego
document.getElementById('jugar').addEventListener('click',function(e){
	//Se deshabilita a si mismo
	this.disabled = true;
	//Habilita la opcion de terminar el juego de una
	document.getElementById('salir').disabled = false;
	document.getElementById("jugadorTurno").innerHTML= "";
	//Revela el canvas
	document.getElementById('enJuego').hidden = false;
	//Limpia el canvas
	ctx.clearRect(0, 0,canvas.width, canvas.height);
	//Crea los objetos y el juego
	let tablero = crearTablero();
	let jugador1 = crearJugador1();
	let jugador2 = crearJugador2();
	juego = crearJuego(tablero,jugador1,jugador2);
	//Oculta las opciones del juego
	document.getElementById('menuJuego').hidden = true;
	//Inicia el juego
	juego.empezarJuego();
});

//Funcion para detener el juego en cualquier momento
document.getElementById('salir').addEventListener('click',function(e){
	if (juego != null)
	{
		juego.terminarJuego(false);
	}
		document.getElementById('menuJuego').hidden = false;
		document.getElementById('jugar').disabled = false;
		this.disabled = true;
});