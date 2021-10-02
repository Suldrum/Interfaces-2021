'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Mas frontend que no scrolle, ugh 
 */

 const VALORGANADOR = 5;
//Clase creada para verificar las distintas formas en las que un jugador pudo ganar el juego.
static class Recorrido {
	
    //Recorre horizontalmente y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movHorizontal(vector,  columna) {
		let contador = 1, j=columna+1;
		while ((j < vector.length ) &&(contador < VALORGANADOR) && (vector[columna] == vector [j])){
			contador++;
			j++;
		}
		j = columna-1;
		while ((j > -1 ) &&(contador < VALORGANADOR) && (vector[columna] == vector [j])){
				contador++;
				j--;
		}
		return (contador == VALORGANADOR);
	}
	
	//Recorre verticalmente y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movVertical(matriz, fila, columna) {	
		let contador = 1;
		if ((matriz.length - fila) >= VALORGANADOR)
			while ((fila < (matriz.length -1) ) &&(contador < VALORGANADOR) && (matriz[fila][columna] == matriz[fila+1][columna]))
			{
				contador++;
				fila++;
			}
		return  (contador == VALORGANADOR);
	}
	
	//Recorre en forma de una diagonal de 135° y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movDiagonalIzq(matriz, fila, columna) {
		let i = fila-1, j = columna-1, contador = 1;
		while ((i > -1 && j > -1) &&(contador < VALORGANADOR) && (matriz[fila][columna] == matriz[i][j]))
		{
			contador++; i--; j--;
		}
		i = fila+1; j = columna+1;
		while ((i < matriz.length && j < matriz[i].length) &&(contador < VALORGANADOR) && (matriz[fila][columna] == matriz[i][j]))
		{
			contador++; i++; j++;
		}
		return  (contador == VALORGANADOR);
	}
	
	//Recorre en forma de una diagonal de 45° y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movDiagonalDer(matriz, fila, columna) {

		let i = fila-1, j = columna+1, contador = 1;
		
		while ((i > -1 && j < matriz[i].length) &&(contador < VALORGANADOR) && (matriz[fila][columna] == matriz[i][j]))
		{
			contador++; i--; j++;
		}
		
		i = fila+1; j = columna-1;
		while ((i < matriz.length && j > -1) &&(contador < VALORGANADOR) && (matriz[fila][columna] == matriz[i][j]))
		{
			contador++; i++; j--;
		}
		return  (contador == VALORGANADOR);
	}
	
    victoria(matriz, fila, columna)
    {
        return (movHorizontal(matriz[fila],  columna) || movVertical(matriz, fila, columna) || movDiagonalIzq(matriz, fila, columna) || movDiagonalDer(matriz, fila, columna) );
    }

}//FIN DE LA CLASE