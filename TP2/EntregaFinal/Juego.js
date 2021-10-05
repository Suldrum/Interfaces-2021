'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 *
 */
// Ni bien se carga la página me aseguro que este en su estado por defecto
class inicio {
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
		let tablero = new Tablero();
		tablero.inicializarTablero(matriz);
		tablero.mostrarTablero(matriz);
	}
	

}//FIN DE LA CLASE
