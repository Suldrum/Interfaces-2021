'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Objeto {
    //Constructor de la clase, da propiedades a los objetos
	constructor(div, clase) {
		this.div = document.getElementById(div);
		this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
		this.baseClass = clase; //Clase de css base del objet. Ej: bird
	}

	//Posiciones X del Objeto
    getPositionLeft() {
        return this.div.getBoundingClientRect().left;
    }
    getPositionRight() {
        return this.getPositionLeft() + this.width;
    }

	//Posiciones Y del Objeto
	getPositionTop() {
		return this.div.getBoundingClientRect().top;
	}

    getPositionBottom() {
        return (this.getPositionTop()  + this.height);
    }

	//Devuelve todas las posicions del objeto en forma de vector
	getPositionData(){
        let left = this.getPositionLeft();
        let right = this.getPositionRight(); 
        let top = this.getPositionTop(); 
        let bottom = this.getPositionBottom();
        return [left,right,top,bottom]; 
    }

	//Remueve todas las clases existentes
	removeAllClass()
	{
		//CUIDADO BORRA TODAS LAS CLASES INCLUYENDO LA BASE, EL PAJARO DESAPARECE!
		$(this.div).removeClass();
		//La vuelvo a añadir
		this.addClass(this.baseClass);
	}

	//Añade una clase
	addClass(clase)
	{
		this.div.classList.add(clase);
	}

	//Remueve solo una clase
	removeClass(clase)
	{
		this.div.classList.remove(clase);
	}

	//Cambia el estado del pajaro de uno a otro.Ej: bird flying, bird falling, etc
	changeClass(clase){
		this.removeAllClass();
		this.addClass(clase);
	}
} //FIN DE LA CLASE
