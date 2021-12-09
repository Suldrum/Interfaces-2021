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
        document.querySelector("#popup").innerHTML="Publicar con promoción" ;
        return "img/home/promocionar_activo.png";
    }else
    {
        document.querySelector("#popup").innerHTML="Publicar sin promoción"; 
        return "img/home/promocionar.png";
    }
}
    

