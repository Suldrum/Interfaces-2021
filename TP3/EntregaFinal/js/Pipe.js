'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * 
 * 
 */

class Pipe {
    //Constructor de la clase, da propiedades a los objetos
	constructor(pipeUp,pipeDown,space) {
		this.upObstacle = pipeUp;
		this.downObstacle = pipeDown;
		//Espacio para el ave	
		this.space = space * 2;
		//La altura maxima de cada obstaculo
		this.maxHeight= (this.upObstacle.height - this.space) / 2;
		this.value= 1;
		this.passed = false;
		this.setAltitudes();
	}
	
	getValue(){return this.value ;}
	setValue(value){this.value = value;}


	isOutScreen(){
        return  this.upObstacle.isOutScreen() ;
    }

	//Si el ave pasa por el objecto
	checkPass(bird){
		let thisData = this.upObstacle.getPositionData();
		let birdData = bird.getPositionData();
		if (birdData.left > (thisData.right + 3) )
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
	isTouch(bird){
		return this.upObstacle.isTouch(bird) || this.downObstacle.isTouch(bird);
	}

	//Resetea la tuberia
	reset(){
		this.setValue(1);
		this.passed = false;
		this.setAltitudes();
	}

	//Detiene las animaciones de los obstaculos
	stopAnimation(){
		this.upObstacle.stopAnimation();
		this.downObstacle.stopAnimation();
	}
} //FIN DE LA CLASE
