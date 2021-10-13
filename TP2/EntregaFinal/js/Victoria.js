'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 */

 const VALORGANADOR = 4;
//Clase creada para verificar las distintas formas en las que un jugador pudo ganar el juego.
//Los contadores siempre empiezan en uno porque cuenta la posicion donde inicia la verificacion
class Victoria {
	
    //Recorre horizontalmente y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movHorizontal(vector,  columna) {
		let contador = 1, j=columna+1;
		//Desde la posicion hacia la derecha
		while ((j < vector.length ) &&(contador < VALORGANADOR) && (vector[columna].getColor() == vector [j].getColor() )){
			contador++;
			j++;
		}
		j = columna-1;
		//Desde la posicion hacia la izquierda
		while ((j > -1 ) &&(contador < VALORGANADOR) && (vector[columna].getColor()  == vector [j].getColor() )){
				contador++;
				j--;
		}
		return (contador == VALORGANADOR);
	}
	
	//Recorre verticalmente y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movVertical(matriz, fila, columna) {	
		let contador = 1;
		//Si hay posibilidades que puedan haber la cantidad de elementos para ganar
		if ((matriz.length - fila) >= VALORGANADOR)
			//Desde la posicion actual hacia abajo pregunto si el siguiente es igual a la posicion actual
			while ((fila < (matriz.length -1) ) &&(contador < VALORGANADOR) && (matriz[fila][columna].getColor()  == matriz[fila+1][columna].getColor() ))
			{
				contador++;
				fila++;
			}
		return  (contador == VALORGANADOR);
	}
	
	//Recorre en forma de una diagonal de 45° (F(x) = x) y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movDiagonalIzq(matriz, fila, columna) {
		let i = fila-1, j = columna-1, contador = 1;
		//Desde la posicion en diagonal hacia abajo 
		while ((i > -1 && j > -1) &&(contador < VALORGANADOR) && (matriz[fila][columna].getColor()  == matriz[i][j].getColor() ))
		{
			contador++; i--; j--;
		}
		i = fila+1; j = columna+1;
		//Desde la posicion en diagonal hacia arriba
		while ((i < matriz.length && j < matriz[i].length) &&(contador < VALORGANADOR) && (matriz[fila][columna].getColor()  == matriz[i][j].getColor() ))
		{
			contador++; i++; j++;
		}
		return  (contador == VALORGANADOR);
	}
	
	//Recorre en forma de una diagonal de 135° (F(x) = -x) y devuelve si encontro la cantidad de igualdades necesarias para ganar el juego.
	movDiagonalDer(matriz, fila, columna) {

		let i = fila-1, j = columna+1, contador = 1;
		//Desde la posicion en diagonal hacia arriba
		while ((i > -1 && j < matriz[i].length) &&(contador < VALORGANADOR) && (matriz[fila][columna].getColor()  == matriz[i][j].getColor() ))
		{
			contador++; i--; j++;
		}
		
		i = fila+1; j = columna-1;
		//Desde la posicion en diagonal hacia abajo
		while ((i < matriz.length && j > -1) &&(contador < VALORGANADOR) && (matriz[fila][columna].getColor()  == matriz[i][j].getColor() ))
		{
			contador++; i++; j--;
		}
		return  (contador == VALORGANADOR);
	}
	
	//Devuelve si alguna de las opciones de victoria se cumple
	victoria(matriz, fila, columna)
    {
        return (this.movHorizontal(matriz[fila],  columna) || this.movVertical(matriz, fila, columna) || this.movDiagonalIzq(matriz, fila, columna) || this.movDiagonalDer(matriz, fila, columna) );
    }

}//FIN DE LA CLASE