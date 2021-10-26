'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Pipe {
    //Constructor de la clase
	constructor(pipeUp,pipeDown,space) {
		this.upObstacle = pipeUp;
		this.downObstacle = pipeDown;
		//Espacio para el ave	
		this.space = space * 2;
		//La altura maxima de cada obstaculo
		this.maxHeight= (this.upObstacle.height - this.space) / 2;
		this.value= 1;
		this.passed = false;
		//Coloca la altura a las tuberias
		this.setAltitudes();
	}
	
	//Devuelve el valor por pasar las tuberias
	getValue(){return this.value ;}
	//Da valor al obstaculo
	setValue(value){this.value = value;}

	//Si ya salieron de pantalla
	isOutScreen(){
		//Como van juntas a la misma velocidad con verificar una alcanza
        return this.upObstacle.isOutScreen() ;
    }

	//Si el ave pasa por el objecto
	checkPass(bird){
		//Con verificar que paso por la izquierda de uno de los objetos alcanza dado que van juntos
		let thisData = this.upObstacle.getPositionData();
		let birdData = bird.getPositionData();
		if (birdData.left > (thisData.right + 1) )
			{this.passed = true;}
		
	}

	//Modifica el la altura de los obstaculos
	setAltitudes(){
		//Para decidir la altura del hueco
		let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
		//Calculo de la altura
		let moveHeight = Math.floor((Math.random() * this.maxHeight));
		if (plusOrMinus >0)
		{
			//Hueco mas arriba
			this.setHeight(this.upObstacle,(this.maxHeight - moveHeight));
			this.setHeight(this.downObstacle,(this.maxHeight + moveHeight));
		}
		else{
			//Hueco mas abajo
			this.setHeight(this.upObstacle,(this.maxHeight + moveHeight));
			this.setHeight(this.downObstacle,(this.maxHeight - moveHeight));
		}
	}

    //Edita la altura de un obstaculo
    setHeight(obstacle,height){
       obstacle.div.style.height = height+ "px";
    }

	//Si toco alguno de los obstaculos
	isTouch(object){
		//En este caso le pregunto individualmente a cada tuberia si el ave las toco
		return this.upObstacle.isTouch(object) || this.downObstacle.isTouch(object);
	}

	//Resetea la tuberia
	reset(){
		//Vuelve a sus valores default
		this.passed = false;
		//Modifica sus alturas
		this.setAltitudes();
	}

	//Detiene las animaciones de los obstaculos
	stopAnimation(){
		this.upObstacle.stopAnimation();
		this.downObstacle.stopAnimation();
	}
} //FIN DE LA CLASE
