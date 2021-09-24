'use strict';



/**
 * Lista de las cosas que falta:
 * Corregir/hacer descargar
 * Verificar que cuando se aplica un filtro solo lo haga una vez, ahora mismo si presionas sepia miles de veces lo aplica infinita veces, de ser necesario trabajar con la aplicacion de un solo filtro por vez
 * Decidir si el brillo funcionara con botones separados, un unico boton que sube o con rango como las herramientas (controlar que no se pase de cierto nivel de luz/oscuridad)
 * Filtros de Saturacion y Blur
 * Decidir si los filtros de Saturacion y Blur trabajaran con rangos fijos o escala (tipo por rango)
 * Comentar mas el codigo
 * Pulir codigo
 * Decidir si puede volver un paso hacia atras
 * Hacer Reestablecer: devuelve la imagen a su estado original para no estarla resubiendo constantemente
 */

///////////////// ZONA DE ESCUCHA DE VARIABLE GLOBALES /////////////////

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
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
let btnSaturation = document.getElementById('buttonSaturation');
btnSaturation.addEventListener('click', filterSaturation);
let btnBlur = document.getElementById('buttonBlur');
btnBlur.addEventListener('click', filterBlur);
let brightness = document.getElementById('rangeBright');
brightness.addEventListener('click', function(){filterBright()});
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
    cleanCanvas();
    let file = document.getElementById('inputFile').files[0];
    let reader = new FileReader();
    reader.onload = function(){ 
        let image = new Image();
        //edita los valores de ancho y alto para no salirse del canvas
        image.onload = function(){ 
            if(height > width){
                height = canvas.width * (1.0 * height) / width;
            }  
            else{
                 width = canvas.height * (1.0 * width) /height;
            }
            canvas.width = height;
            canvas.height = width;
            ctx.drawImage(image,0,0,canvas.width, canvas.height);         
            imageData = getImgData();
        }
        image.src = reader.result;
    }; 
    reader.readAsDataURL(file);
}

//ARREGLAR #>.>
function downloadImage(){
    console.log("ajam");
    let imageUrl = canvas.toDataURL("image/jpg");
    this.href = imageUrl;
}

function reestablishImage()
{
    if (document.getElementById('inputFile').files[0] !== undefined)
        loadImage();

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
    console.log(ctx.strokeStyle);
    if (tool == "Eraser")
        ctx.strokeStyle = "#FFFFFF";
    else
        ctx.strokeStyle = document.getElementById('color'+tool).value;
}

///////////////// FIN DE ZONA DE MANEJO DE HERRAMIENTAS /////////////////

///////////////// ZONA DE FILTROS /////////////////

//Negativo
function filterNegative() {    
    let image = getImgData();
    //Recorrido pixel a pixel 
    for (let x = 0; x <= image.width; x++) {
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
    for (let x = 0; x <= image.width; x++) {    
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
    for (let x = 0; x <= image.width; x++) {    
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
        for (let x = 0; x <= image.width; x++) {    
            for (let y = 0; y < image.height; y++) {
                //obtenemos la informacion del pixel
                let pixel = getPixel(image, x, y);
                //Calculamos los nuevos valores
                let r = validateBright(pixel[0], bright);
                let g = validateBright(pixel[1], bright);
                let b = validateBright(pixel[2], bright);
                //seteamos los nuevos valores
                setPixel(image, x, y,r,g, b ,255);
            }
        }
        putImgData(image);

}

function validateBright(pixel, bright)
{
    if (pixel+bright < 0)
    {
        return 0;
    }
    else
        if ( pixel+bright > 255)
        {
            return 255
        }
    else
        return pixel+bright ;
}

//Saturacion
function filterSaturation(){

}

//Blur
function filterBlur(){

}

///////////////// FIN DE ZONA DE FILTROS /////////////////