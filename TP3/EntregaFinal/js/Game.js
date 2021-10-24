const MAX_COINS = 3;
const MAX_PIPES = 3;
const WIN_VALUE = 50;

class Game {
    constructor(bird) {
        this.div = document.getElementById("body");
        this.divCoins =document.getElementById("coins");
        this.divPipes =document.getElementById("pipes");
        this.width = parseInt(this.div.getBoundingClientRect().width);
		this.height = parseInt(this.div.getBoundingClientRect().height);
        this.bird = bird;
        //Estado del juego
        this.state = this.setState("create");
        this.pipes = [];
        this.coins = [];
        this.score = 0;
        this.interval;
        this.updateScore();
    }

    setState(state){
        this.state = state;
    }

    getState(){
        return this.state;
    }
    //Crea todos los elementos del juego
    createElements()
    {
        for (let index = 0 ; index <  MAX_COINS; index++)
        {
            this.createCoin(index);
        }

        for (let index = 0 ; index < MAX_PIPES ; index++)
        {
            this.createPipe(index);
        }
    }
    createCoin(index){ 
        let newDiv = document.createElement("div");
        let newDivID = "coin"+index;
        newDiv.setAttribute("id",newDivID);
        this.divCoins.appendChild(newDiv);
        this.coins[index] = new Coin (newDivID,"coin","moveCoinToLeft", 12 * (index + 1));
    }

    createPipe(index){
        //Tuberia de arriba
        let newUpDiv = document.createElement("div");
        let newUpID= "pipeUp"+index;
        newUpDiv.setAttribute("id",newUpID);
        this.divPipes.appendChild(newUpDiv);
        let pipeUp = new ObjetoInteractivo(newUpID,"pipeUp","movePipeToLeft", 10 * (index + 1));
        //Tuberia de abajo
        let newDownDiv = document.createElement("div");
        let newDownID= "pipeDown"+index;
        newDownDiv.setAttribute("id",newDownID);
        this.divPipes.appendChild(newDownDiv);
        let pipeDown =new ObjetoInteractivo(newDownID,"pipeDown","movePipeToLeft", 10 * (index + 1));
        //Nuevo Obstaculo
        this.pipes[index] = new Pipe (pipeUp,pipeDown, this.bird.height);
    }

    //Control de las monedas en el juego
    checkCoins(){  
        for (let index = 0 ; index < this.coins.length ; index++)
        {
            //Si ya termino el juego por puntos
            if (this.score >= WIN_VALUE && this.getState() === "running"){
                this.setState("finished");
                this.endGame(true);
                break;
            }
            //Si se salio la moneda de la pantalla
            if(this.coins[index].isOutScreen())
            {
                //Se reinicia la moneda
                this.coins[index].reset(index,(this.width+this.coins[index].width+10));
            }
            else{
                //Si todavia no se toco
                if (!this.coins[index].touched)
                {
                    this.coins[index].isTouch(this.bird,parseInt(this.coins[index].getPositionLeft()));
                }
                //Si se toco y todavia no la conte
                if(this.coins[index].touched && this.coins[index].getValue() !== 0)
                {  
                    this.score+= this.coins[index].getValue();
                    this.coins[index].setValue(0);
                    this.updateScore();
                }
            }
        }
    }

    //Control de las tuberias en el juego
    checkPipes(){
        for (let index = 0; index < this.pipes.length; index++) {
            //Si ya termino el juego por puntos
            if (this.score >= WIN_VALUE && this.getState() === "running"){
                this.setState("finished");
                this.endGame(true);
                break;
            }
            //Si toque una tuberia fuerza el termino
            if (this.pipes[index].isTouch(this.bird) && this.getState() === "running")
            {
                this.setState("finished");           
                this.endGame(false);
                break;
            }
            //Si se salio de pantalla resetea la tuberia
            if (this.pipes[index].isOutScreen())
            {
                this.pipes[index].reset();
            }
            else{
                //Sino se fija si la paso
                if (!this.pipes[index].passed )
                {this.pipes[index].checkPass(this.bird);}
                //Si la paso y todavia no la conte 
                if (this.pipes[index].passed && this.pipes[index].getValue() !== 0)
                {
                    this.score+= this.pipes[index].getValue();
                    this.pipes[index].setValue(0);
                    this.updateScore();
                }
            } 
        }
    }

    initGame() {
        this.createElements();
        this.setState("running");
        this.bird.changeStateClass("falling");
        this.interval = setInterval(this.loop.bind(this), 4.6);

    }

    updateScore(){
        document.getElementById("score").innerHTML = this.score;
    }

    //Llama a todos los controles del juego
    loop() {
        if (this.score >= WIN_VALUE && this.getState() === "running") {
            this.setState("finished");
            this.endGame(true);
        }
        else
        {
            this.checkCoins();
            this.checkPipes();
        }
    }

    //Termina el juego y declara si se gano o no
    endGame(victory) {
        clearInterval(this.interval);
        this.stopAllAnimation();
        document.getElementById('reset').hidden = false;
        if (victory)
        {
            this.bird.changeStateClass("flying");
            alert("¡Felicidades has ganado!");
        }
        else
        {
            this.bird.changeStateClass("dying");
            alert("¡Oh no! Intentalo otra vez");
        }
    }

    //Detiene todas las animaciones de los objetos en juego
    stopAllAnimation(){
        //Detiene las animaciones de las tuberias
        for (let index  = 0; index  < MAX_PIPES; index++) {
            this.pipes[index].stopAnimation();
        }
        //Detiene las animaciones de las monedas
        for (let index = 0; index  < MAX_COINS; index++) {
            if ( this.coins[index].getStateClass() === "moveCoinToLeft")
            {
                this.coins[index].stopAnimation(parseInt(this.coins[index].getPositionLeft()));
            }
        }
    }
}