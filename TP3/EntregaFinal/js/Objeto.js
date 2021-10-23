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
		//Clase de la base del objeto
		this.addClass(baseClass);
		//Clase de la animacion
		this.addClass(stateClass);
		this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
	}
	
	//Posiciones X del Objeto
    getPositionLeft() {
        return this.div.getBoundingClientRect().left;
    }
	
    getPositionRight() {
        return this.div.getBoundingClientRect().right;
    }

	//Posiciones Y del Objeto
	getPositionTop() {
		return this.div.getBoundingClientRect().top;
	}

    getPositionBottom() {
        return this.div.getBoundingClientRect().bottom;
    }

	//Devuelve toda la informacion del objeto
	getPositionData(){
		return this.div.getBoundingClientRect();
    }

	//Devuelve la clase de la animacion
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

	//Remueve todas las clases
	cleanClasses(){
        this.div.setAttribute("class", "");
    }

	//Cambia la animacion por otra.Ej: bird flying, bird falling, etc
	changeStateClass(stateClass){
		this.removeStateClass(this.stateClass);
		this.stateClass = stateClass;
		this.addClass(stateClass);
	}
	
} //FIN DE LA CLASE
