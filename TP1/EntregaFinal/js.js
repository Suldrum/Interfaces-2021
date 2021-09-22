'use strict';

/**
 * Lista de las cosas que falta:
 * Corregir/hacer descargar
 * Verificar que cuando se aplica un filtro solo lo haga una vez, ahora mismo si presionas sepia miles de veces lo aplica infinita veces, de ser necesario trabajar con la aplicacion de un solo filtro por vez
 * Hacer la parte de las herramientas en js (borrar y lapiz)
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


///////////////// FIN DE ZONA DE ESCUCHA DE VARIABLE GLOBALES /////////////////

///////////////// ZONA DE ESCUCHA DE EVENTOS /////////////////

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
let fileImage = document.getElementById('inputFile');
fileImage.addEventListener('change', loadImage);
let btnNew = document.getElementById('buttonNew');
btnNew.addEventListener('click', cleanCanvas);
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

///////////////// FIN DE ZONA DE MANEJO DE CANVAS /////////////////

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

//Saturacion
function filterSaturation(){

}

function filterBlur(){

}

///////////////// FIN DE ZONA DE FILTROS /////////////////