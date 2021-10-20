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
		//Si tenia algo definido antes lo limpio
		this.cleanClasses();
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

	cleanClasses(){
        this.div.classList.remove();
    }

	//Cambia el estado del pajaro de uno a otro.Ej: bird flying, bird falling, etc
	changeStateClass(stateClass){
		this.removeStateClass(this.stateClass);
		this.stateClass = stateClass;
		this.addClass(stateClass);
	}

	updatePosition(){}

    //Si el objeto es visible
    isInScreen(){
        let object = this.getPositionData();
        return (
            object.top >= 0 &&
            object.left >= 0 &&
            object.bottom <= ( $(window).height() || document.documentElement.clientHeight) && 
            object.right <= ($(window).width() || document.documentElement.clientWidth)
        );
    }
} //FIN DE LA CLASE
