'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * 
 */
 const COLOR = "#008080";
 const BLANCO = "#FFFFFF";

class Tablero extends Cuadrado{

	//Crea un nuevo tablero en blanco de tamaño fila x columna
	constructor(x,y,canvas,ancho,alto){
		super(x,y,COLOR,canvas.getContext('2d'),(ancho * TAMAÑO),(alto * TAMAÑO + TAMAÑO));
		canvas.width = this.ancho+ 6 * TAMAÑO ;
		canvas.height= this.alto +  TAMAÑO;
		this.imagen =  document.getElementById("fondoTablero");
		//Vector lector de entrada
		this.vector = [ancho];
		//Matriz donde se guarda la informacion del tablero
		this.matriz = [alto];
		for (let fila = 0; fila < alto ; fila++) {
			this.matriz[fila] = [ancho];
		}
    }

	//Dibuja el fondo del tablero
	dibujarFondo(){
		super.dibujar();
	}

	//Dibuja las flechas que le indican al jugador donde debe poner la ficha para que esta entre en el tablero
	dibujarEntrada(){
		let imagen =  document.getElementById("flecha");
		let i = 0;
		for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
			let flecha = new Cuadrado(columna,this.y,COLOR,this.ctx,TAMAÑO,TAMAÑO);
			flecha.setImagen(imagen);
			this.vector[i] = flecha;
			i++;
			flecha.dibujar();
		}
		
	}

	//Dibuja circulos blancos
	dibujarEspaciosLibres(){
		let i=0,j = 0;
		for (let fila = this.y+TAMAÑO; fila < (this.alto+this.y); fila += TAMAÑO) {
			j= 0;
			for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
            	let x = columna + RADIO + MARGEN ;
            	let y = fila + RADIO + MARGEN  ;
               	let espacioBlanco = new Circulo(x, y, BLANCO, this.ctx);
               	espacioBlanco.dibujar();
				this.matriz[i][j] = espacioBlanco;
				j++;
				
            }
			i++;
        }
	}

	//Dibuja el valor por defecto del tablero
	dibujarDefault()
	{
		this.dibujarFondo();
		this.dibujarEntrada();
		this.dibujarEspaciosLibres();
	}
	
	//Dibuja las fichas que estan en la matriz
	dibujarFichasEnTablero()
	{
		let i=0,j = 0;
		for (let fila = this.y+TAMAÑO; fila < (this.alto+this.y); fila += TAMAÑO) {
			j= 0;
			for (let columna = this.x; columna < (this.ancho + this.x); columna += TAMAÑO) {
               	let ficha = this.matriz[i][j];
               	ficha.dibujar();
				j++;
            }
			i++;
        }
	}

	//Vuelve a dibujar el tablero
	actualizarTablero(){
		this.dibujarFondo();
		this.dibujarEntrada();
		this.dibujarFichasEnTablero();
	}

	// Se fija si la posicion se encuentra ocupada o "limpia".
	espacioLibre(vector, columna) {
		return (vector[columna].getColor() === BLANCO);
	}

	//Se fija si la primera fila del tablero esta llena
	tableroLleno()
	{
		let columna= 0;
		while ((columna < this.matriz[0].length) && (!(this.espacioLibre(this.matriz[0] , columna)) ))
		{
			columna++;
		}
		return columna == this.matriz[0].length;
	}

    //Si la ficha puede entrar en el tablero devuelve un vector con la posicion fila,columna donde lo hizo, en caso contrario devuelve null
	meterFicha(columna, ficha) {
		let fila = this.filaUbicacion(columna);
		//Si hay espacio en la columna
		if (fila > -1)
		{
			//Obtengo las coordenadas del lugar en blanco
			let lugar = this.matriz[fila][columna].obtenerPosicion();
			//Coloca la ficha en la posicion obtenida
			ficha.colocarPosicion(lugar[0],lugar[1]);
			//La matriz ahora guarda la ficha
			this.matriz[fila][columna]= ficha;
			//Devuelvo la posicion donde se guardo en la matriz
			return [fila,columna];
		}
		else
			return null;
	}
	
	//Retorna la ultima ubicacion en blanco de una columna.
	filaUbicacion(columna) {
		//Si tengo al menos un espacio libre
		if (this.espacioLibre(this.matriz[0], columna))
		{
			let i =0;
			while ((i < this.matriz.length ) && (this.espacioLibre(this.matriz[i], columna)))
			{	i++;}
			return (i!=0) ? (i - 1) : 0 ; 
		}
		else
		{
			return -1;
		}
	}
	
	//Devuelve el tamaño de la matriz
	tamañoMatriz()
	{
		return this.matriz.length * this.matriz[0].length;
	}

	//Se fija si se puso sobre flecha y si lo hizo sobre cual
	sobreFlecha(x,y)
	{
		for (let i = 0; i < this.vector.length; i++) {	
			if (this.vector[i].esClickeada(x,y)) 
			{
				return i; 
			}
		}
		return -1;
	}
}//Fin de la clase
