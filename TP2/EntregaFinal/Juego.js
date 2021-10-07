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
		this.darFichas(this.jugador1, Math.ceil(cantidadFichas/2));
		this.darFichas(this.jugador2, Math.floor(cantidadFichas/2));
	}

	darFichas(jugador,cantFichas){
		let cosa = 10;
		for (let i = 0; i < cantFichas ; i++)
		{
			let ficha = new Ficha(cosa,cosa,"#FF0000",this.tablero.ctx);
			jugador.agregarFicha(ficha);
			cosa+=2;
		}
	}

	visualizarFichas()
	{
		this.jugador1.mostrarFichas();
		this.jugador2.mostrarFichas();
	}


}//FIN DE LA CLASE
