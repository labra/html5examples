var canvas;
var ctx;
var spanTecla;
var palabras = new Array("BIENVENIDO","HOLA","PALABRA");
var palabra; 
var aciertos = new Array(); 
var fallos = new Array(); 
var spanPal;

function init() {
 canvas = document.getElementById("idCanvas");
 ctx = canvas.getContext("2d");
 

 spanPal = document.getElementById("palabra");
 spanTecla = document.getElementById("tecla");
 spanMensaje = document.getElementById("mensaje");
 nuevoJuego();
}

function nuevoJuego() {
 palabra = palabras[Math.floor(Math.random()*palabras.length)];
 // Limpiar lista de aciertos y de fallos
 aciertos = [];
 fallos = [];
 spanPal.innerText = palabra;
 spanMensaje.innerText = "Jugando...";
 spanTecla.innerText = " ";
 ponLetras();
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.strokeStyle = "red" ;
 ctx.fillStyle = "blue" ;
}

function ponLetras() {
 var divLetras = document.getElementById("letras");
 
 // Borra todas las letras para volver a pintarlas
 // TODO: igual es más eficiente cambiar las que correspondan 
 // en vez de borrarlas todas para volver a pintarlas...
 while (divLetras.hasChildNodes()) {
    divLetras.removeChild(divLetras.lastChild);
  } 

 for (var i = 0; i < palabra.length; i++) {
   var caracter = document.createElement("span");
   caracter.setAttribute("class","hueco");
   if (aciertos.indexOf(palabra[i]) == -1)  {
    // Si la letra no está en la lista de aciertos se escribe _
    caracter.innerText = "_";
   }
   else {
    caracter.innerText = palabra[i];
   }
  
   var espacio = document.createElement("span");
   espacio.setAttribute("class","espacio");
   espacio.innerText = " ";

   divLetras.appendChild(caracter); 
   divLetras.appendChild(espacio); 
   
 }
};

function controlAhorcado(){
 if (fallos.length > 6) {
  spanMensaje.innerText = "AHORCADO!";
  dibujaAhorcado();
  finJuego();
 } 
 else {
  switch (fallos.length) {
   case 1: dibujaCara(); break;
   case 2: dibujaCuerpo(); break;
   case 3: dibujaBrazoIzq(); break;
   case 4: dibujaBrazoDer(); break;
   case 5: dibujaPiernaIzq(); break;
   case 6: dibujaPiernaDer(); break;
  }
 }
}


function dibujaCara() {
 ctx.beginPath();
 ctx.arc(100,50,25,0,Math.PI*2,true);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaCuerpo() {
 ctx.beginPath();
 ctx.moveTo(75,75);
 ctx.lineTo(125,75);
 ctx.lineTo(125,150);
 ctx.lineTo(75,150);
 ctx.lineTo(75,75);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaBrazoIzq() {
 ctx.beginPath();
 ctx.moveTo(75,75);
 ctx.lineTo(50,100);
 ctx.lineTo(50,125);
 ctx.lineTo(75,100);
 ctx.lineTo(75,75);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaBrazoDer() {
 ctx.beginPath();
 ctx.moveTo(125,75);
 ctx.lineTo(150,100);
 ctx.lineTo(150,125);
 ctx.lineTo(125,100);
 ctx.lineTo(125,75);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaPiernaIzq() {
 ctx.beginPath();
 ctx.moveTo(75,150);
 ctx.lineTo(95,150);
 ctx.lineTo(95,200);
 ctx.lineTo(75,200);
 ctx.lineTo(75,150);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaPiernaDer() {
 ctx.beginPath();
 ctx.moveTo(105,150);
 ctx.lineTo(125,150);
 ctx.lineTo(125,200);
 ctx.lineTo(105,200);
 ctx.lineTo(105,150);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaAhorcado() {
 ctx.fillStyle = "red";
 ctx.beginPath();
 ctx.arc(100,50,25,0,Math.PI*2,true);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function dibujaAcertado() {
 ctx.fillStyle = "green";
 ctx.beginPath();
 ctx.arc(100,50,25,0,Math.PI*2,true);
 ctx.closePath();
 ctx.stroke();
 ctx.fill();
}

function doKeyDown(evt) {
 var tecla = String.fromCharCode(evt.keyCode);
 spanTecla.innerText = tecla ;
 if (palabra.indexOf(tecla) == -1) {
  // Si la tecla no está en la palabra = fallo
  // Se añade a la lista de fallos si no se había añadido ya
  if (fallos.indexOf(tecla) == -1) {
	fallos.push(tecla);
	controlAhorcado();
  }
 }
 else {
  if (aciertos.indexOf(tecla) == -1) {
   aciertos.push(tecla);
   ponLetras();
   // Comprobar si ya se acertaron todas las letras
   if (todasAcertadas(palabra,aciertos)) {
    dibujaAcertado();
	finJuego();
   }
  }
 }
}

function todasAcertadas(palabra,aciertos) {
 for (var i=0; i<palabra.length; i++) {
  if (aciertos.indexOf(palabra[i]) == -1) return false;
 }
 return true;
}

function finJuego() {
 alert("Nuevo juego");
 nuevoJuego();
}

window.addEventListener('keydown',doKeyDown,true);
