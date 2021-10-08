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
		this.jugador1 = new Jugador();
		this.jugador2 = new Jugador();
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

	empezarJuego(){
		
		this.tablero.dibujarDefault();
		this.repartirFichas();
		this.visualizarFichas();
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
			let ficha = new Ficha(xPivote+saltoX, yPivote+saltoY,jugador.getColor(),this.tablero.ctx);
			jugador.agregarFicha(ficha);
		}
	}

	visualizarFichas()
	{
		this.jugador1.mostrarFichas();
		this.jugador2.mostrarFichas();
	}


}//FIN DE LA CLASE
