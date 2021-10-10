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

	constructor(canvas){
		let anchoTablero=  document.getElementById('anchoTablero').value;
		let altoTablero= document.getElementById('altoTablero').value;
		this.tablero = new Tablero(3 * TAMAÑO, (TAMAÑO / 2),canvas,anchoTablero, altoTablero );
		this.condicionVictoria = new Victoria();
		this.jugador1 = new Jugador("jugador 1", "#FF0000");
		this.jugador2 = new Jugador("jugador 2", "#000000");
		this.turno= null;
		
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
		this.ronda(this.jugador1);
		
	}

	actualizarJuego()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.tablero.actualizarTablero();
		this.visualizarFichas();
	}


	
	meterFicha(columna,ficha){
		let resultado = this.tablero.meterFicha(columna,ficha);
		if (resultado !=null)
		{
			this.turno.sacarFicha(this.turno.fichas.indexOf(ficha));
			let victoria = this.condicionVictoria.victoria(this.tablero.matriz,resultado[0],resultado[1]);
			console.log(victoria);
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
	}

	//Empieza la ronda del jugador
	ronda(jugador)
	{
		this.turno = jugador;
		//Si hace click me fijo que lo hizo sobre una ficha
		
	}

	definirGanador(matriz,modoJuego) {
		//Ejecucion del juego
		

		let turno = true;
		let jugadorGanador = 'E';
		let movGanador = new Recorrido();
		
		while(!(tablero.tableroLleno(matriz[0])) && (jugadorGanador === 'E'))
		{	
			System.out.println(" ");
			let ficha = new Ficha(turno);
			System.out.println("Turno del jugador: "+ficha.fichaValor);
			let jugada;
			
			//Cuando juego la IA
			if (!(modoJuego) && !(turno))
				{
					Thread.sleep(3*1000);
				
				jugada= ficha.movimientoAzar(matriz[0]);}
			else
				jugada= ficha.movimientoValido(matriz[0]);
			
			let fila = ficha.filaUbicacion(matriz, jugada);
			ficha.meterFicha(matriz, fila, jugada, ficha.fichaValor);
			if (movGanador.movDiagonalDer(matriz, fila, jugada) || movGanador.movDiagonalIzq(matriz, fila, jugada) || movGanador.movHorizontal(matriz[fila], jugada) || movGanador.movVertical(matriz, fila, jugada))
				jugadorGanador= ficha.fichaValor;
			turno = (!turno);
			tablero.mostrarTablero(matriz);
		}//FIN DEL JUEGO
		
		return(jugadorGanador);
	}
}//FIN DE LA CLASE
