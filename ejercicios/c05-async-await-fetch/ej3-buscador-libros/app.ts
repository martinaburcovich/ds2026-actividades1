interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

interface Respuesta {
    docs: LibroOL[];
}

async function buscarLibros(query: string): Promise<LibroOL[]> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;
    const respuesta = await fetch(url);
    const data: Respuesta = await respuesta.json();
    return data.docs;
}

async function main(): Promise<void> {
    const btnBuscar = document.getElementById("btnBuscar") as HTMLButtonElement;
    const input = document.getElementById("busqueda") as HTMLInputElement;
    const resultados = document.getElementById("resultados") as HTMLDivElement;
    const errorP = document.getElementById("error") as HTMLParagraphElement;
    const cargando = document.getElementById("cargando") as HTMLParagraphElement;

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

        } catch (error) {
            cargando.style.display = "none";
            errorP.textContent = "Error al buscar. Intentá de nuevo.";
        }
    });
}

main();