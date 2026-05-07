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

    if (!btnBuscar) return;

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
                const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
                const anio = libro.first_publish_year ? libro.first_publish_year : "Año desconocido";
                const cover = libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : "https://via.placeholder.com/120x180";

                const col = document.createElement("div");
                col.classList.add("col-md-4", "mb-4");
                col.innerHTML = `
                    <div class="card h-100">
                        <img src="${cover}" class="card-img-top" alt="${libro.title}">
                        <div class="card-body">
                            <h5 class="card-title">${libro.title}</h5>
                            <p class="card-text">${autor}</p>
                            <p class="card-text"><small>${anio}</small></p>
                            <a href="libro.html" class="btn btn-primary">Ver más</a>
                        </div>
                    </div>
                `;
                resultados.appendChild(col);
            });

        } catch (error) {
            cargando.style.display = "none";
            errorP.textContent = "Error al buscar. Intentá de nuevo.";
        }
    });
}

main();