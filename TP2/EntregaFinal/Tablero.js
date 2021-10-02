'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Mas frontend que no scrolle, ugh 
 */

 const TAMAÑOMINIMO = 5;
 const VALORVACIO= '-';


class Tablero {

	//Crea un nuevo tablero en blanco de tamaño fila x columna
    constructor (fila,columna) {
        this = new char[fila][columna];
        for (let i= 0; i < matriz.length; i++)
			for (let j = 0; j < matriz[i].length; j++)
				this[i][j]= VALORVACIO;

    }
	
    //Muestra el tablero
	mostrarTablero( matriz){
		for (let i= 0; i < matriz.length; i++)
		{	for (let j = 0; j < matriz[i].length ; j++)
				System.out.print(matriz[i][j]+" ");
		 System.out.println("");
		 }
	}
	
	// Se fija si la posicion se encuentra ocupada o "limpia".
	llenaColumna(vector, columna) {
		if (vector[columna] == VALORVACIO)
			return false;
		else
			return true;
	}

    // Se fija si todas las primeras posiciones han sido usadas.
	tableroLleno(vector) {
		let lleno= true;
		let columna= 0;
		while ((columna < vector.length) && lleno  )
		{
			lleno=llenaColumna(vector,  columna);
			columna++;
		}
		return lleno;
	}

    //Pone una ficha en el tablero en una fila y columna de la matriz
	meterFicha(matriz, fila,columna, ficha) {
		matriz[fila][columna]= ficha;

	}
	
	//Retorna la ultima ubicacion en blanco de una columna.
	filaUbicacion(matriz, columna) {
		let i =0;
		while ((i < matriz.length ) && (matriz[i][columna] == VALORVACIO))
		{	i++;}
		if (i !=0)
			return (i-1);
		else
			return 0;
	}
	
	//Para un jugador tipo maquina, elige una columna no llena al azar para tirar una ficha.
	movimientoAzar(vector) {
        //Crea un movimiento al azar
		let movimiento=  parseInt( (Math.random() * vector.length ));
		//Controla que no esta generando un movimiento en una columna llena
        while ( llenaColumna(vector, movimiento) )
        movimiento=  parseInt( (Math.random() * vector.length ));
		return movimiento;
	}

}//Fin de la clase
