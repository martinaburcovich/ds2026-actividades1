"use strict";
async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data.docs;
}
async function main() {
    const btnBuscar = document.getElementById("btnBuscar");
    const input = document.getElementById("busqueda");
    const resultados = document.getElementById("resultados");
    const errorP = document.getElementById("error");
    const cargando = document.getElementById("cargando");
    btnBuscar.addEventListener("click", async () => {
        const query = input.value.trim();
        errorP.textContent = "";
        resultados.innerHTML = "";
        if (!query) {
            errorP.textContent = "Error: ingresá algo para buscar.";
            return;
        }
        cargando.style.display = "block";
        try {
            const libros = await buscarLibros(query);
            cargando.style.display = "none";
            libros.forEach(libro => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");
                const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
                const anio = libro.first_publish_year ? libro.first_publish_year : "Año desconocido";
                tarjeta.innerHTML = `
                    <strong>${libro.title}</strong><br>
                    Autor: ${autor}<br>
                    Año: ${anio}
                `;
                resultados.appendChild(tarjeta);
            });
        }
        catch (error) {
            cargando.style.display = "none";
            errorP.textContent = "Error al buscar. Intentá de nuevo.";
        }
    });
}
main();
