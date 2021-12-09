const home = "inicio.html";
const chat = "chat.html";
const perfil = "perfil.html";
const busqueda = "busqueda.html";

document.querySelector("#logo").addEventListener("click", function () {
  window.location.href = home;
});

document.querySelector("#home").addEventListener("click", function () {
  window.location.href = home;
});

document.querySelector("#perfil").addEventListener("click", function () {
  window.location.href = perfil;
});

document.querySelector("#chat").addEventListener("click", function () {
  window.location.href = chat;
});

document.querySelector("#busquedaInput").addEventListener("keyup", function (e) {
  let key = e.key;
  if (key === "Enter") window.location.href = busqueda;
});

document.querySelector("#hamburguesa").addEventListener("click", function(e){
  document.querySelector("#menu").classList.toggle("oculto");
});
