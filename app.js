const apiHarry = "https://hp-api.onrender.com/api/characters";
const imagenVacia = "https://placehold.co/400x520?text=Sin+imagen";

const inputBusqueda = document.getElementById("txtBuscarPersonaje");
const selectCasa = document.getElementById("selCasaHogwarts");
const divFichas = document.getElementById("listaPersonajes");
const contador = document.getElementById("textoResultado");

let personajes = [];

async function cargar() {
    contador.textContent = "Cargando los personajes, espera tantito...";
    try {
        const resp = await fetch(apiHarry);
        personajes = await resp.json();
        buscar();
    } catch (error) {
        contador.textContent = "Ups, no se pudo conectar con la api :(";
    }
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

function buscar() {
    const txt = inputBusqueda.value.toLowerCase();
    const casa = selectCasa.value;
    let cuantos = 0;

    divFichas.innerHTML = "";

    for (let i = 0; i < personajes.length; i++) {
        const pj = personajes[i];
        const ficha = hacerFicha(pj);
        const textoFicha = ficha.textContent.toLowerCase();

        if (casa !== "" && pj.house !== casa) {
            continue;
        }
        if (!textoFicha.includes(txt)) {
            continue;
        }

        divFichas.appendChild(ficha);
        cuantos++;
    }

    if (cuantos === 0) {
        contador.textContent = "No encontre nada con eso :/";
    } else {
        contador.textContent = "Van " + cuantos + " de " + personajes.length + " personajes";
    }
}

inputBusqueda.addEventListener("input", buscar);
selectCasa.addEventListener("change", buscar);

cargar();
