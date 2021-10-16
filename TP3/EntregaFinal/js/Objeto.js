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
		this.position = parseInt(window.getComputedStyle(this.div, null).getPropertyValue("top").split("px")[0]);
		this.width = parseInt(window.getComputedStyle(this.div, null).getPropertyValue("width").split("px")[0]);
		this.height = parseInt(window.getComputedStyle(this.div, null).getPropertyValue("height").split("px")[0]);
		this.baseClass = clase; //Clase de css base del objet. Ej: bird
	}

	//Posiciones X del Objeto
    getPositionLeft() {
        return parseInt(window.getComputedStyle(this.div, null).getPropertyValue("left").split("px")[0]);
    }
    getPositionRight() {
        return this.getPositionLeft() + this.width;
    }

	//Posiciones Y del Objeto
	getPositionTop() {
        return parseInt(window.getComputedStyle(this.div, null).getPropertyValue("top").split("px")[0]);
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
