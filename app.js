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
    for (let i = 0; i < personajes.length; i++) {
        divFichas.appendChild(hacerFicha(personajes[i]));
    }
    contador.textContent = "son " + personajes.length + " personajes";
}

function hacerFicha(pj) {
    let imagen = pj.image;
    if (imagen === "") {
        imagen = imagenVacia;
    }

    let vivo = "Muerto";
    if (pj.alive) {
        vivo = "Vivo";
    }

    const col = document.createElement("div");
    col.className = "col-md-3";
    col.innerHTML = `
        <div class="card h-100">
            <img src="${imagen}" class="card-img-top" alt="${pj.name}">
            <div class="card-body">
                <h5>${pj.name}</h5>
                <p>Casa: ${pj.house || "no tiene"}</p>
                <p>Genero: ${pj.gender || "no se sabe"}</p>
                <p>Ascendencia: ${pj.ancestry || "no se sabe"}</p>
                <p>Varita: ${pj.wand.wood || "no tiene"} ${pj.wand.core}</p>
                <p>Patronus: ${pj.patronus || "no tiene"}</p>
                <p>Estado: ${vivo}</p>
            </div>
        </div>
    `;
    return col;
}

cargar();
