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
	constructor(div, baseClass, stateClass) {
		//Div donde se encuentra
		this.div = document.getElementById(div);
		//Imagen del objeto
		this.baseClass = baseClass;
		//Animacion | Keyframe del objeto
		this.stateClass = stateClass;
		this.addClass(baseClass);
		this.addClass(stateClass);
		this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
	}

	//Posiciones X del Objeto
    getPositionLeft() {
        return parseInt(this.div.getBoundingClientRect().left);
    }
    getPositionRight() {
        return this.getPositionLeft() + this.width;
    }

	//Posiciones Y del Objeto
	getPositionTop() {
		return  parseInt(this.div.getBoundingClientRect().top);
	}

    getPositionBottom() {
        return (this.getPositionTop()  + this.height);
    }

	//Devuelve todas las posicions del objeto en forma de vector
	getPositionData(){
		return this.div.getBoundingClientRect();
    }

	getStateClass(){
		return this.stateClass;
	}
	//Añade una clase
	addClass(clase)
	{
		this.div.classList.add(clase);
	}

	//Remueve solo una clase
	removeStateClass(stateClass)
	{
		this.div.classList.remove(stateClass);
	}

	//Cambia el estado del pajaro de uno a otro.Ej: bird flying, bird falling, etc
	changeStateClass(stateClass){
		this.removeStateClass(this.stateClass);
		this.stateClass = stateClass;
		this.addClass(stateClass);
	}

	updatePosition(){}
} //FIN DE LA CLASE
