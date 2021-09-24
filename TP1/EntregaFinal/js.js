'use strict';

/**
 * Lista de las cosas que falta:
 * Verificar que cuando se aplica un filtro solo lo haga una vez, filtros con este problema: Sepia, Brillo, Saturacion.
 * Comentar mas el codigo
 * Pulir codigo
 */
// Ni bien se carga la página
$(document).ready(function (){
    cleanCanvas();
    document.getElementById('rangeSaturation').value = 0;
    document.getElementById('rangePencil').value= 3;
    document.getElementById('rangeEraser').value = 5;
    document.getElementById('rangeBright').value = 0;
    document.getElementById('inputFile').value = "";
    document.getElementById('colorPencil').value = "#000000";
    ctxOriginal.clearRect(0, 0,ctxOriginal.width, ctxOriginal.height);
});
///////////////// ZONA DE ESCUCHA DE VARIABLE GLOBALES /////////////////

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let canvasOriginal = document.createElement('canvas');
let ctxOriginal  = canvasOriginal.getContext('2d');
ctxOriginal.width = canvas.width;
ctxOriginal.height=canvas.height;
ctxOriginal.drawImage(canvas,0,0);
let imageData = ctx.createImageData(width, height);
let inputFile = document.getElementById('inputFile');
let tool = 'None';

///////////////// FIN DE ZONA DE ESCUCHA DE VARIABLE GLOBALES /////////////////

///////////////// ZONA DE ESCUCHA DE EVENTOS /////////////////

//FILTROS
let btnNegative = document.getElementById('buttonNegative');
btnNegative.addEventListener('click', filterNegative);
let btnSepia = document.getElementById('buttonSepia');
btnSepia.addEventListener('click', filterSepia);
let btnBinarization= document.getElementById('buttonBinarization');
btnBinarization.addEventListener('click', filterBinarization);
let btnBlur = document.getElementById('buttonBlur');
btnBlur.addEventListener('click', filterBlur);
let brightness = document.getElementById('rangeBright');
brightness.addEventListener('change', function(){filterBright()});
let saturation = document.getElementById('rangeSaturation');
saturation.addEventListener('change', function(){filterSaturation()});
//HERRAMIENTAS
let btnPencil = document.getElementById('buttonPencil');
btnPencil.addEventListener('click', function(){changetool('Pencil')});
let btnEraser = document.getElementById('buttonEraser');
btnEraser.addEventListener('click', function(){changetool('Eraser')});
//IMAGEN
let fileImage = document.getElementById('inputFile');
fileImage.addEventListener('change', loadImage);
let btnNew = document.getElementById('buttonNew');
btnNew.addEventListener('click', cleanCanvas);
let btnReestablish= document.getElementById('buttonReestablish');
btnReestablish.addEventListener('click', reestablishImage);
let btnDownload = document.getElementById('buttonDownload');
btnDownload.addEventListener('click', downloadImage);

///////////////// FIN DE ZONA DE ESCUCHA DE EVENTOS /////////////////

///////////////// ZONA DE MANEJO DE CANVAS /////////////////

//Devuelve un arreglo con la informacion interna de un pixel que se encuentra en la posicion x / y de una imagen pasada por parametro
function getPixel(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];
    return [r, g, b, a];
}

//Modifica un pixel que se encuentra en la posicion x / y de una imagen pasada por parametro segun los valores r, g, b, a que recibidos por paramtro
function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function getImgData() {
    return ctx.getImageData( 0, 0, canvas.width, canvas.height );
}

function putImgData(image){
    ctx.putImageData(image, 0, 0) * 4;
}

//Limpia el canvas
function cleanCanvas(){
    ctx.clearRect(0, 0,canvas.width, canvas.height);
}

// Una vez elegida una imagen la carga al canvas y la adapta al tamaño del canvas
function loadImage(){
    let file = document.getElementById('inputFile').files[0];
    let reader = new FileReader();
    reader.onload = function(){ 
        let image = new Image();
        //edita los valores de ancho y alto para que se adapte al canvas
        image.onload = function(){ 
            if(height > width){
                height = canvas.width * (1.0 * height) / width;
            }  
            else{
                 width = canvas.height * (1.0 * width) /height;
            }
            canvas.width = width;
            canvas.height = height;
            canvasOriginal.width= width;
            canvasOriginal.height= height;
            //Dibuja la imagen en el canvas haciendo que cubra todo su superficie
            ctx.drawImage(image,0,0,canvas.width, canvas.height);       
            imageData = getImgData();
            //La guardo tambien en un canvas auxiliar
            ctxOriginal.drawImage(image,0,0,canvasOriginal.width,canvasOriginal.height);
        }
        image.src = reader.result;
    }; 
    reader.readAsDataURL(file);
}

function downloadImage(){
    //Devuelve la imagen del canvas en el formato especificado
    let imageUrl = canvas.toDataURL("image/jpeg");
    //Guarda la imagen de manera local
    this.href = imageUrl;

}

function reestablishImage()
{
    if (document.getElementById('inputFile').files[0] !== undefined)
    {
        console.log(width+"width");
        console.log(canvasOriginal.width+"canvasOriginal.width");
        console.log(canvas.width+"canvas.width");
        width = canvasOriginal.width;
		height = canvasOriginal.height;
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(canvasOriginal,0,0,canvas.width,canvas.height);
    }

}

///////////////// FIN DE ZONA DE MANEJO DE CANVAS /////////////////

///////////////// ZONA DE MANEJO DE HERRAMIENTAS /////////////////

//Cambia el estado del puntero segun el estado que le llega, si le vuelve a llegar el mismo que ya tenia se queda en none (osea que sin estado/nada)
function changetool(newTool)
{
    if (tool == newTool)
        tool='None';
    else
        tool=newTool;
}
//Variables de coordenadas
let x=0, y=0;
//Variable para controlar cuando esta realmente dibujando o solo paseando por el canvas 
let isDrawing = false;
function draw(x, y, x1, y1){
    //Se prepara para dibujar
    ctx.beginPath();
    //Punto inicial
    ctx.moveTo(x, y);
    //Punto final
    ctx.lineTo(x1, y1);
    //Lo dibuja
    ctx.stroke();
    //Termina de dibujar
    ctx.closePath();
}



//Suelta el mouse por lo tanto se termina de dibujar
canvas.addEventListener("mouseup",function(e){
    if (isDrawing)
    {
        //Dibujo el punto final
        draw(x, y, e.offsetX, e.offsetY);
        //Reinicio los valores
        x=0;
        y=0;
        //Se deja de dibujar
        isDrawing = false;
    }
})

//Mientras este dibujando y dentro del canvas dibujo
canvas.addEventListener("mousemove",function(e){
    if (isDrawing)
    {  
        //Dibujo desde las coordenadas almacenadas a las nuevas coordenadas
        draw(x, y, e.offsetX, e.offsetY);
        //Las viejas coordenadas se actualizan
        x = e.offsetX;
        y = e.offsetY;
    }
})

//Si se sale del canvas se toma como que dejo de dibujar
canvas.addEventListener("mouseleave",function(e){
    isDrawing = false;
})
//Si hace click dentro del canvas
canvas.addEventListener('mousedown', function(e){
   //Si hay una herramienta seleccionada
    if (tool !== "None")
   {
       //Setteo el ancho del trazado
        setLineWidth(tool);
        setStrokeColor(tool);
        //Almaceno las coordenadas donde se hizo click con el mouse en el canvas 
        x = e.offsetX;
        y = e.offsetY;
        //Tomo nota que se esta dibujando
        isDrawing = true;
    }
});

//Setteo el ancho del trazado
function setLineWidth(tool)
{
    //Tomo el valor de ancho de la herramienta elegida
    ctx.lineWidth = document.getElementById('range'+tool).value;
}

function setStrokeColor(tool){
    if (tool == "Eraser")
    { ctx.strokeStyle = "#FFFFFF";}    
    else
    { ctx.strokeStyle = document.getElementById('color'+tool).value;}   
}

///////////////// FIN DE ZONA DE MANEJO DE HERRAMIENTAS /////////////////

///////////////// ZONA DE FILTROS /////////////////

//Negativo
function filterNegative() {    
    let image = getImgData();
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            let pixel = getPixel(image, x, y);
             //Creamos nuevos valores a partir de la resta entre 255 y los valores actuales
            let r = 255 - pixel[0];
            let g = 255 - pixel[1];
            let b = 255 - pixel[2];
            //Modificamos el pixel con los nuevos valores
            setPixel(image, x, y, r, g, b, 255);
        }
    }
    putImgData(image);
}

//Sepia
function filterSepia() {
    //obtenemos la imagen
    let image = getImgData();
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);   
           // y lo multiplicamos por los valores necesarios en cada caso
            let sepiaR = Math.floor(0.393 * pixel[0] + 0.769 *  pixel[1] + 0.189 * pixel[2]);
            let sepiaG = Math.floor(0.349 * pixel[0] + 0.686 * pixel[1] + 0.168 * pixel[2]);
            let sepiaB = Math.floor(0.272 * pixel[0] + 0.534 *  pixel[1] + 0.131 * pixel[2]);
            //seteamos los nuevos valores
            setPixel(image, x, y,sepiaR, sepiaG, sepiaB , 255);
        }
    }
    putImgData(image);
}

//Binarizacion
function filterBinarization(){
    //obtenemos la imagen
    let image = getImgData();
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Calcula su ubicacion en el expectro de color? qsy que comentar
            let rgb =  Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
            //Determinamos si el pixel debe ir en blanco o en negro en funcion al resultado anterior
            rgb =((rgb < 128)? 0 : 255);
            //seteamos los nuevos valores
            setPixel(image, x, y,rgb, rgb, rgb , 255);
        }
    }
    putImgData(image);
}

//Brillo
function filterBright()
{
    //obtenemos la imagen
    let image = getImgData();
     //Tomamos el valor del rango
     let bright = parseInt(document.getElementById('rangeBright').value );
    //Recorrido pixel a pixel 
     for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Calculamos los nuevos valores
            let r = validatePixel(pixel[0], bright);
             let g = validatePixel(pixel[1], bright);
             let b = validatePixel(pixel[2], bright);
             //seteamos los nuevos valores
            setPixel(image, x, y,r,g, b ,255);
        }
    }
    putImgData(image);

}

function validatePixel(pixel, value)
{
    if (pixel+value < 0)
    {
        return 0;
    }
    else
        if ( pixel+value > 255)
        {
            return 255
        }
    else
        return pixel+value ;
}

//Saturacion
function filterSaturation(){
    //obtenemos la imagen
    let image = getImgData();
     //Tomamos el valor del rango
     let saturationValue = parseInt(document.getElementById('rangeSaturation').value );
    //Recorrido pixel a pixel 
     for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Calculamos la cantidad de gris que vamos a quitar
            let gray = (0.2989* pixel[0] + 0.5870* pixel[1] + 0.1140* pixel[2]) * (-1);
            //Calculamos los nuevos valores
            let r = validatePixel(pixel[0] * (1+saturationValue), gray * saturationValue);
            let g = validatePixel(pixel[1] * (1+saturationValue), gray * saturationValue);
            let b = validatePixel(pixel[2] * (1+saturationValue), gray * saturationValue);
             //seteamos los nuevos valores
            setPixel(image, x, y,r,g, b ,255);
        }
    }
    putImgData(image);
}

//Blur
function filterBlur(){
    //obtenemos la imagen
    let image = getImgData();
    //Recorrido pixel a pixel 
    for (let x = 1; x < image.width - 1 ; x++) {    
        for (let y = 1; y < image.height - 1; y++) {
            //Calculamos los nuevos valores
            let r = promedioColor(image, x, y,0);
            let g = promedioColor(image, x, y,1);
            let b = promedioColor(image, x, y,2);
            //seteamos los nuevos valores
            setPixel(image, x, y,r,g, b ,255);
        }
    }
    putImgData(image);
}
function getIndex(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return index;
  }
function promedioColor(imageData, x, y,color)
{
    //Valores de la fila superior
    let pixel0= imageData.data[getIndex(imageData, x-1, y-1) + color]; 
    let pixel1= imageData.data[getIndex(imageData, x, y-1)+color];
    let pixel2= imageData.data[getIndex(imageData, x+1, y-1)+color];

   //Valores de la fila actual
   let pixel3= imageData.data[getIndex(imageData, x-1, y)+color];
   //Valor actual donde estoy en el for
   let pixel4= imageData.data[getIndex(imageData, x, y)+color];
   let pixel5= imageData.data[getIndex(imageData, x+1, y)+color];

   //Valores de la fila inferior
   let pixel6= imageData.data[getIndex(imageData, x-1, y+1)+color];
   let pixel7= imageData.data[getIndex(imageData, x, y+1)+color];
   let pixel8= imageData.data[getIndex(imageData, x+1, y+1)+color];

   //Obtenemos el promedio del color
   let prom = (pixel0+pixel1+pixel2+pixel3+pixel4+pixel5+pixel6+pixel7+pixel8)/9;
   return  Math.floor(prom);
}

///////////////// FIN DE ZONA DE FILTROS /////////////////

/*

var canvas_blur = document.querySelector(".canvas.blur");
var pixelRatio = window.devicePixelRatio || 1;
var c_w = parseInt(getComputedStyle(canvas_blur).width);
var c_h = parseInt(getComputedStyle(canvas_blur).height);
canvas_blur.width = c_w;
canvas_blur.height = c_h;

/*******************************************************************************/


/*
	initCanvas(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		let w = canvas.width;
		let h = canvas.height;
		this.canvas_off = document.createElement("canvas");
		this.ctx_off = this.canvas_off.getContext("2d");
		this.canvas_off.width = w;
		this.canvas_off.height = h;
		this.ctx_off.drawImage(canvas, 0, 0);
	}
	recoverCanvas(){
		let w = this.canvas_off.width;
		let h = this.canvas_off.height;
		this.canvas.width = w;
		this.canvas.height = h;
		this.ctx.drawImage(this.canvas_off,0,0);
	}
    */