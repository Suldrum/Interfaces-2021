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
	document.getElementById('colorJugador1').value = "#ff0000";
	document.getElementById('colorJugador2').value = "#0000ff";
	document.getElementById('salir').disabled = true;
	
}

//Se encarga de deshabilitar y habilitar el campo del tiempo
document.getElementById('porTiempo').addEventListener('change',function(e){
	let tiempo =document.getElementById('selectorTiempo');
	tiempo.disabled = !tiempo.disabled;
});



document.getElementById('jugar').addEventListener('click',function(e){
	//Limpia el canvas
	this.disabled = true;
	document.getElementById('salir').disabled = false;
	canvas.hidden = false;
	ctx.clearRect(0, 0,canvas.width, canvas.height);
	let anchoTablero=  document.getElementById('anchoTablero').value;
	let altoTablero= document.getElementById('altoTablero').value;
	let tablero = new Tablero(3 * TAMAÑO, (TAMAÑO / 2),canvas,anchoTablero, altoTablero );
	let colorJugador1 = document.getElementById('colorJugador1').value;
	let colorJugador2 = document.getElementById('colorJugador2').value;
	let jugador1 = new Jugador(MARGEN, TAMAÑO, colorJugador1, ctx, "jugador 1");
	let jugador2 = new Jugador(canvas.width - ( 3 * TAMAÑO ) + RADIO , TAMAÑO, colorJugador2, ctx, "jugador 2");
	
	let tiempo = document.getElementById('selectorTiempo');
	if (!tiempo.disabled)
	{	
		let reloj = new Reloj(tiempo.value);
		juego = new JuegoTemporizado(tablero,jugador1,jugador2,reloj,ctx);
	}
	else{
		juego = new Juego(tablero,jugador1,jugador2,ctx);
	}
	juego.empezarJuego();
	document.getElementById('salir').addEventListener('click',function(e){
		juego.terminarJuego(false);
		document.getElementById('jugar').disabled = false;
		this.disabled = true;
	});
});

document.getElementById('test').addEventListener('click',function(e){
	juego.terminarJuego(false);
});
canvas.addEventListener('mousemove',  function(e) {
	if (juego.turno != null && fichaJugada != null) {
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
	