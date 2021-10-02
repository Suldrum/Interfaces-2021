'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Mas frontend que no scrolle, ugh 
 */
// Ni bien se carga la página me aseguro que este en su estado por defecto
class inicio {

	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Tablero tablero = new Tablero();
		char[][] matriz = null;
		boolean modoJuego = false; //false para vs IA, true para vs otro jugador
		int opcionMenu;
		
		System.out.println("¡Bienvenido al 5 en linea!");
		do {
		//Menu
			opcionMenu=-1;
			System.out.println(" ");
			System.out.print("Modo de juego: ");
			if (modoJuego)
				System.out.print("vs otro Jugador");
			else
				System.out.print("vs el equipo");
			System.out.println(" ");
			System.out.print("Tamaño del tablero: ");
			if (matriz == null)
				System.out.print("aun no definido");
			else
				System.out.print(matriz[0].length+"x"+ matriz.length);
			System.out.println(" ");
			System.out.println(" ");
			System.out.println("Presione el numero correspondiente a la accion que desea realizar: ");
			System.out.println("1. Cambiar modo de juego");
			System.out.println("2. Cambiar tamaño del tablero");
			System.out.println("3. Jugar");
			System.out.println("4. Salir");
		try{	
			BufferedReader entrada = new BufferedReader(new  InputStreamReader(System.in)); 
			opcionMenu = new Integer (entrada.readLine());
			switch (opcionMenu)
			{
			case 1: 
				modoJuego= (!(modoJuego));
				System.out.println("Modo de juego cambiado");
				break;
			case 2: 
				matriz = tablero.crearTablero();
				break;
			case 3: 
				System.out.println(" ");
				if (matriz != null)
				{	
					char jugadorGanador= definirGanador(matriz, modoJuego);
					if ( jugadorGanador == 'E')
						System.out.println("Empate");
					else	
						System.out.println("El jugador "+jugadorGanador+" ha ganado");
					System.out.println(" ");
					System.out.println("¡Juegue una vez mas!");
					
				}
				else
					System.out.println("Por favor primero establezca el tamaño del tablero");
				break;
			}
		}
		catch (Exception exc ){
			System.out.println( "Error. La tecla presionada no ha sido un numero, intente nuevamente" );	
		}
		}while  (opcionMenu != 4); //Salir
	}//Fin del main

	
	public static char definirGanador(char[][] matriz, boolean modoJuego) {
		//Ejecucion del juego
		
		Tablero tablero = new Tablero();
		tablero.inicializarTablero(matriz);
		tablero.mostrarTablero(matriz);
		boolean turno = true;
		char jugadorGanador = 'E';
		Recorrido movGanador = new Recorrido();
		
		while(!(tablero.tableroLleno(matriz[0])) && (jugadorGanador == 'E'))
		{	
			System.out.println(" ");
			Ficha ficha = new Ficha(turno);
			System.out.println("Turno del jugador: "+ficha.fichaValor);
			int jugada;
		
			if (!(modoJuego) && !(turno))
				{try {
					Thread.sleep(3*1000);
				} catch (InterruptedException e) {
					// TODO Bloque catch generado automáticamente
					e.printStackTrace();
				}
				jugada= ficha.movimientoAzar(matriz[0]);}
			else
				jugada= ficha.movimientoValido(matriz[0]);
			
			int fila = ficha.filaUbicacion(matriz, jugada);
			ficha.meterFicha(matriz, fila, jugada, ficha.fichaValor);
			if (movGanador.movDiagonalDer(matriz, fila, jugada) || movGanador.movDiagonalIzq(matriz, fila, jugada) || movGanador.movHorizontal(matriz[fila], jugada) || movGanador.movVertical(matriz, fila, jugada))
				jugadorGanador= ficha.fichaValor;
			turno = (!turno);
			tablero.mostrarTablero(matriz);
		}//FIN DEL JUEGO
		
		return(jugadorGanador);
	}
	
}//FIN DE LA CLASE
