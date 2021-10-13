'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 *
 */
//Clase de juego basica
class Juego {

	constructor(tablero,jugador1,jugador2,ctx){
		this.tablero = tablero;
		this.condicionVictoria = new Victoria();
		this.jugador1 = jugador1;
		this.jugador2 = jugador2;
		this.turno= null;
		this.ctx = ctx;		
    }

	//Toma a todos los jugadores y hace que reciban una cantidad de fichas segun el tamaño del tablero
	repartirFichas()
	{
		let cantidadFichas = this.tablero.tamañoMatriz();
		//Si hay un numero impar de fichas al jugador 1 se le dara una ficha mas
		this.darFichas(this.jugador1, Math.ceil(cantidadFichas/2), TAMAÑO + MARGEN  , TAMAÑO * this.tablero.matriz.length);
		this.darFichas(this.jugador2, Math.floor(cantidadFichas/2),canvas.width - (TAMAÑO +RADIO) ,TAMAÑO * this.tablero.matriz.length);
	}

	//Crea una nueva ficha y se la asigna al jugador
	darFichas(jugador,cantFichas, xPivote, yPivote){
		let imagen =  document.getElementById("ficha");
		for (let i = 0; i < cantFichas ; i++)
		{
			//Calcula una separacion entre fichas para que no salgan todas una sobre otra
			let saltoX = Math.random() * TAMAÑO/2 ;
			let saltoY = Math.random() * TAMAÑO/2 ;
			let ficha = new Circulo(xPivote+saltoX, yPivote+saltoY,jugador.getColor(),this.tablero.ctx);
			ficha.setImagen(imagen);
			jugador.agregarFicha(ficha);
		}
	}

	//Todos los jugadores muestran las fichas que poseen actualmente
	visualizarFichas()
	{
		this.jugador1.mostrarFichas();
		this.jugador2.mostrarFichas();
	}

	//Hace que los jugadores dibujen sus nombres
	visualizarJugadores()
	{
		this.jugador1.dibujar();
		this.jugador2.dibujar();
	}

	//Dibuja y asigna todo lo necesario para el inicio del juego
	empezarJuego(){
		this.tablero.dibujarDefault();
		this.repartirFichas();
		this.visualizarJugadores();
		this.visualizarFichas();
		this.turno=this.jugador1;
		this.turno.juegaFicha();
		document.getElementById("jugadorTurno").innerHTML= "Turno de: "+this.turno.getNombre();
	}

	//Actualiza el canvas segun como va progresando el juego
	actualizarJuego()
	{
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.tablero.actualizarTablero();
		this.visualizarJugadores();
		this.visualizarFichas();
	}
	
	//Controla que una ficha pueda entrar al tablero y si se debe continuar jugando
	meterFicha(columna,ficha){
		let resultado = this.tablero.meterFicha(columna,ficha);
		//Si entro en el tablero
		if (resultado !=null)
		{
			//Se actualiza el juego, para el tema de la ultima ficha
			this.actualizarJuego();
			//Se le quita la ficha al jugador
			this.turno.sacarFicha(this.turno.fichas.indexOf(ficha));
			//Se evalua si gano el jugador
			let victoria = this.condicionVictoria.victoria(this.tablero.matriz,resultado[0],resultado[1]);
			//Si gano o se lleno el tablero
			if(victoria || this.tablero.tableroLleno()){
				//Termina el juego
				this.terminarJuego(victoria);
			}
			else
			//Se procede con la proxima ronda
			{this.darTurno();}
		}
	}
	
	//Devuelve si se posiciono sobre una flecha
	sobreFlecha(x,y)
	{
		return this.tablero.sobreFlecha(x,y);
	}
	
	//Asigna al proximo jugador y lo hace jugar
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
		this.turno.juegaFicha();
		//Muestra al jugador en turno en el HTML
		document.getElementById("jugadorTurno").innerHTML= this.turno.getNombre();
	}

	//Finaliza el juego y dispara un alert que muestra el resultado
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
		//Elimina el juego
		juego = null;
		//Permite volver a jugar
		document.getElementById('jugar').disabled = false;
	}
}//FIN DE LA CLASE
