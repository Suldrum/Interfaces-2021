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
let fichaJugada = null;


//Cuando se carga la pagina
 $(document).ready(function (){
    //Funcion que se encargada de dejar la pagina en default
    loadAllDefaults();

});

//Funcion que carga todos los valores por defecto
function loadAllDefaults() {
	ctx.clearRect(0, 0,canvas.width, canvas.height);
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
	juego = new Juego(canvas);
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
	
});



canvas.addEventListener('mousemove',  function(e) {
	if (fichaJugada != null) {
		let x = e.offsetX;
		let y = e.offsetY;
		x = permanecerDentro(x,canvas.width);
		y = permanecerDentro(y, canvas.height);
		fichaJugada.colocarPosicion(x,y);
		juego.actualizarJuego();
		
	}
});

	//Si se sale del canvas mientras esta dibujando me encargo de dibujar hasta el borde
	canvas.addEventListener("mouseout",function(e){
	if (fichaJugada != null)
	{  
		let x = e.offsetX;
		let y = e.offsetY;
		x = permanecerDentro(x,canvas.width);
		y = permanecerDentro(y, canvas.height);
		fichaJugada.colocarPosicion(x,y);
		juego.actualizarJuego();
		fichaJugada = null;		
	}
	});

//Si se sale del canvas mientras esta dibujando me encargo de dibujar hasta el borde
	canvas.addEventListener("mouseup",function(e){
		if (fichaJugada != null)
		{  
		//Dibujo la ficha por ultima vez
		let x = e.offsetX;
		let y = e.offsetY;
		x = permanecerDentro(x,canvas.width);
		y = permanecerDentro(y, canvas.height);
		fichaJugada.colocarPosicion(x,y);
		let columna = juego.sobreFlecha(x,y);
		if (columna > -1)
		{
			juego.meterFicha(columna,fichaJugada);
		}
		juego.actualizarJuego();
		fichaJugada = null;
		}
	});

	function permanecerDentro(valor, max)
	{
		if (valor < RADIO)
			{return RADIO;}
		if (valor > max - RADIO)
			{return max - RADIO;}
		return valor;
	}

	canvas.addEventListener('mousedown', function(e) {
		let x = e.offsetX;
		let y = e.offsetY;
		if (juego.turno != null)
		{fichaJugada = juego.turno.juegaFicha(x,y);
			if (fichaJugada != null )
			{  
				fichaJugada.colocarPosicion(x,y);
				juego.actualizarJuego();
			}	
		}
	});	
	