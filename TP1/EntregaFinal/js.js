'use strict';
/**
 * 
 * RAMA MASTER
 * 
 * A CORREGIR:
 * Blur con deslizador
 * Mas frontend que no scrolle, ugh 
 * Corregir cuando entran imagenes no se deforme, aspect radio y resolucion, cuidado al descargar
 * Que los rangos de las cosas si no se esta tocando esten en 0
 */
// Ni bien se carga la página me aseguro que este en su estado por defecto
$(document).ready(function (){
    //Funcion que encargada de invocar todas las funciones de defaults
    startNewCanvas();
});

//Funcion para cargar los valores por defecto de los rangos de los filtros
function loadFiltersDefaults()
{
    document.getElementById('rangeSaturation').value = 0;
    document.getElementById('rangeBright').value = 0;
    document.getElementById('rangeBlur').value = 0;
}

//Funcion para cargar los valores por defecto de las herramientas
function loadToolsDefaults()
{
    //Acomodo los valores de las herramientas
    document.getElementById('rangePencil').value= 3;
    document.getElementById('rangeEraser').value = 5;
    document.getElementById('colorPencil').value = "#000000";
    //Limpio el valor del input donde se elige la imagen
    document.getElementById('inputFile').value = "";
    tool = 'None';
}

function loadCanvasDefaults()
{
    //Setea el canvas con su ancho y alto por defecto
    canvas.width = 600 ;
    canvas.height = 600 ;
    //Limpia el canvas y el canvas en memoria
    clearCanvas(ctx);
    clearCanvas(ctxOriginal);
}

//Funcion que carga todas las funciones que setean los valores por defecto
function loadAllDefaults()
{
    loadCanvasDefaults();
    loadToolsDefaults();
    loadFiltersDefaults();
}

//Funcion que carga todos los valores por defecto
function startNewCanvas()
{
    //Cargo todos los valores por defecto
    loadAllDefaults();
}
///////////////// ZONA DE VARIABLE GLOBALES /////////////////

//Canvas donde se veran por pantallas los cambios realizados a la imagen que se agrega a la pagina y los dibujos que se hagan a con las herramientas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
//Canvas auxiliar que mantendra la informacion original de la imagen que se agrego a la pagina
let canvasOriginal = document.createElement('canvas');
let ctxOriginal  = canvasOriginal.getContext('2d');
//Seteo de propiedades al canvas auxiliar
canvasOriginal.width = canvas.width;
canvasOriginal.height= canvas.height;
//Input donde se recibira la imagen
let inputFile = document.getElementById('inputFile');
//Esta variable tendra la funcion de mantener la informacion sobre que herramienta se encuentra activa, por default no tendra ninguna
let tool = 'None';
//Variables de coordenadas del mouse cuando se dibuja
let x=0, y=0;
//Variable para controlar cuando esta realmente dibujando o solo paseando por el canvas 
let isDrawing = false;

///////////////// FIN DE ZONA DE VARIABLE GLOBALES /////////////////

///////////////// ZONA DE ESCUCHA DE EVENTOS /////////////////

//FILTROS
let btnNegative = document.getElementById('buttonNegative');
btnNegative.addEventListener('click', filterNegative);
let btnSepia = document.getElementById('buttonSepia');
btnSepia.addEventListener('click', filterSepia);
let btnBinarization= document.getElementById('buttonBinarization');
btnBinarization.addEventListener('click', filterBinarization);
let blured = document.getElementById('rangeBlur');
blured.addEventListener('change',function(){filterBlur(this.value)});
//btnBlur.addEventListener('click', filterBlur);
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
//FUNCIONES DE LA PAGINA
let btnNew = document.getElementById('buttonNew');
btnNew.addEventListener('click', startNewCanvas);
let btnReestablish= document.getElementById('buttonReestablish');
btnReestablish.addEventListener('click', reestablishImage);
let btnDownload = document.getElementById('buttonDownload');
btnDownload.addEventListener('click', downloadImage);

//FUNCIONES DE DIBUJO DENTRO DEL CANVAS

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
});

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
});

//Si se sale del canvas mientras esta dibujando me encargo de dibujar hasta el borde
canvas.addEventListener("mouseout",function(e){
    //Dibujo la ultima linea
    if (isDrawing)
    {  
        draw(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = false;
    }
});

//Si hace click dentro del canvas
canvas.addEventListener('mousedown', function(e){
   //Si hay una herramienta seleccionada
    if (tool !== "None")
   {
        //Setteo el ancho del trazado
        setLineWidth(tool);
        //Setteo el color del trazado
        setStrokeColor(tool);
        //Almaceno las coordenadas donde se hizo click con el mouse en el canvas 
        x = e.offsetX;
        y = e.offsetY;
        //Tomo nota que se esta dibujando
        isDrawing = true;
        //Dibujo el primer punto o punto
        ctx.strokeRect(x,y,1,1); 

    }
});

///////////////// FIN DE ZONA DE ESCUCHA DE EVENTOS /////////////////

///////////////// ZONA DE MANEJO DE CANVAS /////////////////

//Devuelve el indice de un pixel
function getIndex(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return index;
}

//Devuelve un arreglo con la informacion interna de un pixel que se encuentra en la posicion (x, y) de una imagen pasada por parametro
function getPixel(imageData, x, y) {
    //Se selecciona el pixel
    let index = getIndex(imageData, x, y);
    //Se copia la informacion que posee el pixel
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];
    //Se devuelve su informacion en forma de un arreglo
    return [r, g, b, a];
}

//Modifica un pixel que se encuentra en la posicion (x, y) de una imagen pasada por parametro segun los valores r, g, b, a que recibidos
function setPixel(imageData, x, y, r, g, b, a) {
    //Se selecciona el pixel
    let index = getIndex(imageData, x, y);
    //El pixel recibe sus nuevos valores en la posicion correspondiente
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

//Devuelve la informacion un contexto de un canvas de manera matricial
function getImgData(ctxType) {
    return ctxType.getImageData( 0, 0, canvas.width, canvas.height );
}

//Inserta un contexto a un canvas
function putImgData(image){
    ctx.putImageData(image, 0, 0) * 4;
}

//Limpia el canvas
function clearCanvas(ctxType){
    ctxType.clearRect(0, 0,canvas.width, canvas.width);
}

//Una vez elegida una imagen la carga al canvas
function loadImage(){
    let file = document.getElementById('inputFile').files[0];
    let reader = new FileReader();
    reader.onload = function(){ 
        let image = new Image();
        image.onload = function(){
            //Vuelvo a cargar los valores por defecto del canvas y los filtros
            loadCanvasDefaults();
            loadFiltersDefaults();
            //Calculo una escala basada en el tamaño del canvas y de la imagen para mantener el aspecto de la imagen que se muestra
            let scale = Math.min(canvas.width / image.width, canvas.height / image.height);
            //Reacomoda el tamaño del canvas
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;   
            //Dibuja la imagen en el canvas
            ctx.drawImage(image,0,0,canvas.width, canvas.height);       
            //La guardo tambien en un canvas auxiliar
            ctxOriginal.drawImage(image,0,0,canvas.width,canvas.height);
            //Guardo el tamaño real de la imagen en el boton de descarga
            let download = document.getElementById('buttonDownload');
            download.setAttribute('width',image.width);
            download.setAttribute('height',image.height);
        }
        image.src = reader.result;
    };
    reader.readAsDataURL(file);
}

//Da la opcion de descargar la imagen en la carpeta default de descarga de la computadora donde se ejecuta la pagina
function downloadImage(){
    //Creo un canvas auxiliar para la descarga, este se elimina una vez termina la funcion
    let canvasDownload = document.createElement('canvas');
    let ctxDownload  = canvasDownload.getContext('2d');
    //Elemento donde se guardaron los valores originales
    let download = document.getElementById('buttonDownload');
    //Seteo de propiedades el tamaño original
    canvasDownload.width = download.getAttribute('width');
    canvasDownload.height= download.getAttribute('height');
    //Redibujo la imagen a descargar con el tamaño original
    ctxDownload.drawImage(canvas,0,0, canvasDownload.width,canvasDownload.height);
    //Imagen a formato jpeg
    let imageUrl = canvasDownload.toDataURL("image/jpeg");
    //Guarda la imagen de manera local
    this.href = imageUrl;
}

//Vuelve a colocar en el canvas la imagen que se agrego originalmente
function reestablishImage()
{
    //Si se habia elegido algo con anterioridad
    if (document.getElementById('inputFile').files[0] !== undefined)
    {
        //Vuelve a colocar en el canvas visible la imagen original que se encuentra almacenada en canvasOriginal
		ctx.drawImage(canvasOriginal,0,0,canvas.width,canvas.height);
        //Vuelve a poner los filtros a su estado por defecto
        loadFiltersDefaults();
    }
}

///////////////// FIN DE ZONA DE MANEJO DE CANVAS /////////////////

///////////////// ZONA DE MANEJO DE HERRAMIENTAS /////////////////

//Cambia el estado de la tool segun la nueva herramienta que le llega
function changetool(newTool)
{
    //Si vuelve a elegir la misma herramienta se considera que la dejo de usar
    if (tool == newTool)
        tool='None';
    else
        tool=newTool;
}

//Dibuja desde dos pares de ejes de coordenadas (x,y)
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

//Setteo el ancho del trazado
function setLineWidth(tool)
{
    //Tomo el valor de ancho de la herramienta elegida
    ctx.lineWidth = document.getElementById('range'+tool).value;
}

//Setteo del color del trazado
function setStrokeColor(tool){
    //Si es la goma
    if (tool == "Eraser")
    { ctx.strokeStyle = "#FFFFFF";}    
    else
    { //Si es cualquier otra herramienta
        ctx.strokeStyle = document.getElementById('color'+tool).value;
    }   
}

///////////////// FIN DE ZONA DE MANEJO DE HERRAMIENTAS /////////////////

///////////////// ZONA DE FILTROS /////////////////

//Negativo
function filterNegative() {   
    //Obtenemos la imagen original
    let image = getImgData(ctxOriginal);
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Creamos nuevos valores a partir de la resta entre 255 y los valores actuales
            let r = 255 - pixel[0];
            let g = 255 - pixel[1];
            let b = 255 - pixel[2];
            //Modificamos el pixel con los nuevos valores
            setPixel(image, x, y, r, g, b, 255);
        }
    }
    //La ponemos en el canvas
    putImgData(image);
}

//Sepia
function filterSepia() {
    //Obtenemos la imagen original
    let image = getImgData(ctxOriginal);
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);   
           // y lo multiplicamos por los valores necesarios en cada caso segun la formula pasada en la clase del 22/9/2021
            let sepiaR = Math.floor(0.393 * pixel[0] + 0.769 *  pixel[1] + 0.189 * pixel[2]);
            let sepiaG = Math.floor(0.349 * pixel[0] + 0.686 * pixel[1] + 0.168 * pixel[2]);
            let sepiaB = Math.floor(0.272 * pixel[0] + 0.534 *  pixel[1] + 0.131 * pixel[2]);
            //seteamos los nuevos valores
            setPixel(image, x, y,sepiaR, sepiaG, sepiaB , 255);
        }
    }
    //La ponemos en el canvas
    putImgData(image);
}

//Binarizacion
function filterBinarization(){
    //Obtenemos la imagen original
    let image = getImgData(ctxOriginal);
    //Recorrido pixel a pixel 
    for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Calcula el gris total del pixel
            let gray =  Math.floor((pixel[0] + pixel[1] + pixel[2]) / 3);
            //Determinamos si el pixel debe ir en blanco o en negro en funcion al resultado anterior
            gray =((gray < 128)? 0 : 255);
            //seteamos los nuevos valores
            setPixel(image, x, y,gray, gray, gray , 255);
        }
    }
    //La ponemos en el canvas
    putImgData(image);
}

//Brillo
function filterBright()
{
    //obtenemos la imagen original
    let image = getImgData(ctxOriginal);
     //Tomamos el valor del rango
     let bright = parseInt(document.getElementById('rangeBright').value );
    //Recorrido pixel a pixel 
     for (let x = 0; x < image.width; x++) {    
        for (let y = 0; y < image.height; y++) {
            //obtenemos la informacion del pixel
            let pixel = getPixel(image, x, y);
            //Calculamos los nuevos valores segun la formula mencionada en la clase del 22/9/2021
            let r = validatePixel(pixel[0], bright);
            let g = validatePixel(pixel[1], bright);
            let b = validatePixel(pixel[2], bright);
            //seteamos los nuevos valores
            setPixel(image, x, y,r,g, b ,255);
        }
    }
     //La ponemos en el canvas
    putImgData(image);
}

//Saturacion
function filterSaturation(){
    
    //obtenemos la imagen
    let image = getImgData(ctxOriginal);
    //Tomamos el valor del rango
    let saturationValue = parseInt(document.getElementById('rangeSaturation').value );
    //Tomamos el minimo valor de saturacion
    let saturationMin = parseInt(document.getElementById('rangeSaturation').min) * (-1);
    saturationValue = ((saturationValue < 0)? (saturationValue/saturationMin) : (  saturationValue ));
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
            setPixel(image, x, y,r,g, b ,255);
        }
    }
    putImgData(image);

}

//Blur

//Crea el efecto de blur segun el valor elegido
function filterBlur(value){
    //control para no salirse
    if (value > 10)
    {
        value = 10;
    }
     //obtenemos la imagen
    let image = getImgData(ctxOriginal);
    //Altera la imagen aplicando el efecto de blur tantas veces como indica el valor que le llega por parametro
    for (let i = 0; i < value ; i++) {  
        effectBlur(image);
    }
    //ponemos la imagen filtreada en el canvas
    putImgData(image);
}

//Genera el efecto de blur en cada pixel de una imagen
function effectBlur(image){
    //Recorrido pixel a pixel
    for (let x = 1; x < image.width - 1 ; x++) {    
        for (let y = 1; y < image.height - 1; y++) {
            //Calculamos los nuevos valores
            let r = areaColor(image, x, y,0) /9 ;
            let g = areaColor(image, x, y,1) /9;
            let b = areaColor(image, x, y,2) /9;
            //seteamos los nuevos valores
            setPixel(image, x, y,r,g, b ,255);
        }
    }
}


///////////////// FIN DE ZONA DE FILTROS /////////////////

///////////////// ZONA DE FUNCIONES AUXILIARES PARA LOS FILTROS /////////////////

//Verifica que luego de una operacion de suma se retorne un valor valido para un pixel
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

//Funcion auxiliar para el filtrado de Blur, devuelve la suma total de un color en un area de 3x3 con la posicion central siendo (x,y) de la imagen
function areaColor(imageData, x, y,color)
{
    //acumulador donde sumo el valor del color en cada pixel revisado
    let area = 0;
    //Valores de la fila superior
    area += imageData.data[getIndex(imageData, x-1, y-1) + color]; 
    area += imageData.data[getIndex(imageData, x, y-1)+color];
    area += imageData.data[getIndex(imageData, x+1, y-1)+color];

   //Valores de la fila actual
   area += imageData.data[getIndex(imageData, x-1, y)+color];
   //Valor actual donde estoy en el for que invoca esta funcion
   area += imageData.data[getIndex(imageData, x, y)+color];
   area += imageData.data[getIndex(imageData, x+1, y)+color];

   //Valores de la fila inferior
   area += imageData.data[getIndex(imageData, x-1, y+1)+color];
   area += imageData.data[getIndex(imageData, x, y+1)+color];
   area += imageData.data[getIndex(imageData, x+1, y+1)+color];

   //Obtenemos la suma total del color
   return area;
}

///////////////// FIN ZONA DE FUNCIONES AUXILIARES PARA LOS FILTROS /////////////////