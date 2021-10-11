'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 *
 */
// Ni bien se carga la página me aseguro que este en su estado por defecto
class Juego {

	constructor(tablero,jugador1,jugador2,ctx){
		this.tablero = tablero;
		this.condicionVictoria = new Victoria();
		this.jugador1 = jugador1;
		this.jugador2 = jugador2;
		this.turno= null;
		this.ctx = ctx;
		
    }

	repartirFichas()
	{
		let cantidadFichas = this.tablero.tamañoTablero();
		//Si hay un numero impar de fichas al jugador 1 se le dara una ficha mas
		this.darFichas(this.jugador1, Math.ceil(cantidadFichas/2), TAMAÑO + MARGEN  , TAMAÑO * this.tablero.matriz.length);
		this.darFichas(this.jugador2, Math.floor(cantidadFichas/2),canvas.width - (TAMAÑO +RADIO) ,TAMAÑO * this.tablero.matriz.length);
	}

	darFichas(jugador,cantFichas, xPivote, yPivote){
		for (let i = 0; i < cantFichas ; i++)
		{
			let saltoX = Math.random() * TAMAÑO/2 ;
			let saltoY = Math.random() * TAMAÑO/2 ;
			let ficha = new Circulo(xPivote+saltoX, yPivote+saltoY,jugador.getColor(),this.tablero.ctx);
			jugador.agregarFicha(ficha);
		}
	}

	visualizarFichas()
	{
		this.jugador1.mostrarFichas();
		this.jugador2.mostrarFichas();
	}

	empezarJuego(){
		this.tablero.dibujarDefault();
		this.repartirFichas();
		this.visualizarFichas();
		this.turno=this.jugador1;
		document.getElementById("jugadorTurno").innerHTML= this.turno.getNombre();
	}

	actualizarJuego()
	{
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.tablero.actualizarTablero();
		this.visualizarFichas();
	}
	
	meterFicha(columna,ficha){
		let resultado = this.tablero.meterFicha(columna,ficha);
		if (resultado !=null)
		{
			this.turno.sacarFicha(this.turno.fichas.indexOf(ficha));
			let victoria = this.condicionVictoria.victoria(this.tablero.matriz,resultado[0],resultado[1]);
			if(victoria || this.tablero.tableroLleno()){
				this.terminarJuego(victoria);
			}
			else
			{this.darTurno();}
		}
	}
	

	sobreFlecha(x,y)
	{
		return this.tablero.sobreFlecha(x,y);
	}
	

	darTurno()
	{
		if (this.turno === this.jugador1)
		{
			this.turno = this.jugador2;
		}
		else
		{
			this.turno = this.jugador1;
		}
		document.getElementById("jugadorTurno").innerHTML= this.turno.getNombre();
	}

	terminarJuego(victoria) {
		if (victoria)
		{
			//mostrar que gano
			alert("¡Felicidades "+this.turno.getNombre()+" has ganado!");
		}
		else
		{
			//mostrar empate
			alert("¡Empatados!");
		}
		fichaJugada = null;
		this.turno = null;
	}
}//FIN DE LA CLASE
