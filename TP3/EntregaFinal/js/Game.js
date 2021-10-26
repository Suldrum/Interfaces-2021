const MAX_COINS = 3;
const MAX_PIPES = 3;
const WIN_VALUE = 50;

class Game {
    constructor(bird) {
        //Ancho del juego
        this.width = parseInt(document.getElementById("body").getBoundingClientRect().width);
        //Lugares en el html donde estaran los elementos del juego
        this.divCoins= document.getElementById("coins");
        this.divPipes= document.getElementById("pipes");
        //Avatar
        this.bird = bird;
        //Estado del juego
        this.state = this.setState("create");
        //Arreglos para llevar el control de los elementos
        this.pipes = [];
        this.coins = [];
        //Puntaje
        this.score = 0;
        //Variable donde se guardara el bucle de controles
        this.interval;
        //Poner la puntuacion por pantalla
        this.updateScore(this.score);
    }

    //Cambia el estado del juego
    setState(state){
        this.state = state;
    }

    //Devuelve el estado del juego
    getState(){
        return this.state;
    }

    //Crea todos los elementos del juego y los agrega al arreglo de control correspondiente
    createElements()
    {
        //Crea las monedas
        for (let index = 0 ; index <  MAX_COINS; index++)
        {
            this.createCoin(index);
        }

        //Crea los obstaculos
        for (let index = 0 ; index < MAX_PIPES ; index++)
        {
            this.createPipe(index);
        }
    }

    //Crea un nuevo div a un padre
    createDiv(id, parent)
    {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id",id);
        parent.appendChild(newDiv);
    }
    
    //Crea una moneda
    createCoin(index){ 
        let newDivID = "coin"+index;
        this.createDiv(newDivID, this.divCoins);
        this.coins[index] = new Coin (newDivID,"coin","moveCoinToLeft", 13 * (index + 1));
    }

    //Crea un nuevo obstaculo
    createPipe(index){
        //Tuberia de arriba
        let newUpID= "pipeUp"+index;
        this.createDiv(newUpID, this.divPipes);
        let pipeUp = new ObjetoInteractivo(newUpID,"pipeUp","movePipeToLeft", 10 * index);
        //Tuberia de abajo
        let newDownID= "pipeDown"+index;
        this.createDiv(newDownID,this.divPipes);
        let pipeDown =new ObjetoInteractivo(newDownID,"pipeDown","movePipeToLeft", 10 * index);
        //Nuevo Obstaculo
        this.pipes[index] = new Pipe (pipeUp,pipeDown, this.bird.height);
    }

    //Si la moneda se choca con una tuberia modifica el delay de dicha moneda
    checkSuperposition(coin){
        for (let index = 0 ; index < this.pipes.length ; index++)
        {
            if (this.pipes[index].isTouch(coin))
            {
                coin.setAnimationDelay(13 * (index + 1) + 5);
                break;
            }
        }
    }

    //Control de las monedas en el juego
    checkCoins(){  
        for (let index = 0 ; index < this.coins.length ; index++)
        {
            //Si el juego ya termino no dejo avanzar el for
            if (this.getState() === "finished")
            {       
                break;
            }
            //Si se salio la moneda de la pantalla
            if(this.coins[index].isOutScreen())
            {
                //Se reinicia la moneda
                this.coins[index].reset(index,(this.width+this.coins[index].width+10));
                this.checkSuperposition(this.coins[index]);
            }
            else{
                //Si todavia esta en pantalla y no se toco
                if (!this.coins[index].touched)
                {
                    //Veo si se toca y la marco como tal
                    this.coins[index].isTouch(this.bird,parseInt(this.coins[index].getPositionLeft()));
                    //Si esta vez se toco la cuento
                    if(this.coins[index].touched)
                    {  
                        this.updateScore(this.coins[index].getValue());
                        //Si al contarla el juego termina por puntos
                        if (this.score >= WIN_VALUE ){
                            this.setState("finished");
                            break;
                        }
                    }
                }   
            }
        }
    }

    //Control de las tuberias en el juego
    checkPipes(){
        for (let index = 0; index < this.pipes.length; index++) {
            //Si ya termino el juego no dejo avanzar el for
            if (this.getState() === "finished")
            {       
                break;
            }
            //Si se salio de pantalla resetea la tuberia
            if (this.pipes[index].isOutScreen())
            {
                this.pipes[index].reset();
            }
            else{
                //Si todavia no la paso
                if (!this.pipes[index].passed)
                {
                    //Si el ave se choca con la tuberia corto el for
                    if (this.pipes[index].isTouch(this.bird)){
                        this.setState("finished");
                        break;
                    }
                    //Veo si se paso el obstaculo y lo marco como tal
                    this.pipes[index].checkPass(this.bird);
                    //Si lo paso lo cuento
                    if (this.pipes[index].passed)
                    {
                        this.updateScore(this.pipes[index].getValue());
                        //Si al contarla el juego termina por puntos
                        if (this.score >= WIN_VALUE ){
                            this.setState("finished");
                            break;
                        }
                    }
                } 
            } 
        }
    }

    //Inicia el juego como tal
    initGame() {
        //Crea los elementos
        this.createElements();
        //Cambia el estado
        this.setState("running");
        //El avatar comienza a caer
        this.bird.changeStateClass("falling");
        //Inicia el bucle controlador
        this.interval = setInterval(this.loop.bind(this), 4.6);
    }

    //Actualiza la puntuacion del juego tanto internamente como en el HTML
    updateScore(value){
        this.score+= value;
        document.getElementById("score").innerHTML = this.score;
    }

    //Llama a todos los controles del juego
    loop() {
        //Si el juego esta en estado de finalizado se corta el bucle
        if (this.getState() === "finished") {
            this.endGame();
        }
        else
        {
            this.checkCoins();
            this.checkPipes();
        }
    }

    //Termina el juego y declara si se gano o no
    endGame() {
        //Limpia el intervalo
        clearInterval(this.interval);
        //Se detienen las animaciones
        this.stopAllAnimation();
        //Se vuelve visible el boton para volver a jugar
        document.getElementById('reset').hidden = false;
        //Si gano por puntos
        if (this.score >= WIN_VALUE)
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

    //Limpia todos los elementos del juego que son visibles en la pantalla
    cleanGameOfScreen(){
        this.cleanElements(this.divCoins);
        this.cleanElements(this.divPipes);
    }

    //Limpia todos los elementos hijos de un padre
    cleanElements(toClean){
        while (toClean.firstChild) 
        {toClean.removeChild(toClean.lastChild);}
    }
    
}