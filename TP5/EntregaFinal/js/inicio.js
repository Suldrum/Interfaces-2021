let booleano;

$(document).ready(function (){
    booleano = true;
});

document.querySelector("#promocionar").addEventListener("click", function() {
   
    this.src= changePop() ;
    booleano = !booleano;
    document.querySelector("#popup").classList.toggle("oculto");
    setTimeout(() => {
        document.querySelector("#popup").classList.toggle("oculto");
    }, 1500);
});

function changePop()
{
    if (booleano)
    {
        document.querySelector("#popup").innerHTML="Contenido promocionado activado" ;
        return "img/home/promocionar_activo.png";
    }else
    {
        document.querySelector("#popup").innerHTML="Contenido promocionado desactivado"; 
        return "img/home/promocionar.png";
    }
}
    

