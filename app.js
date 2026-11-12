const apiHarry = "https://hp-api.onrender.com/api/characters";
const imagenVacia = "https://placehold.co/400x520?text=Sin+imagen";

const inputBusqueda = document.getElementById("txtBuscarPersonaje");
const selectCasa = document.getElementById("selCasaHogwarts");
const divFichas = document.getElementById("listaPersonajes");
const contador = document.getElementById("textoResultado");

let personajes = [];

async function cargar() {
    const resp = await fetch(apiHarry);
    personajes = await resp.json();
    contador.textContent = "son " + personajes.length + " personajes";
}

cargar();
