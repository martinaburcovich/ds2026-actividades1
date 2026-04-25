interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "978-1444951400", titulo: "Heartstopper Volumen 1", autor: "Alice Oseman", precio: 18000, disponible: true, genero: "Novela gráfica" },
    { isbn: "978-0747532743", titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 15000, disponible: true, genero: "Fantasía" },
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    const index = catalogo.findIndex(libro => libro.isbn === isbn);
    catalogo.splice(index, 1);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim();
    const autor = (document.getElementById("autor") as HTMLInputElement).value.trim();
    const precio = parseFloat((document.getElementById("precio") as HTMLInputElement).value);
    const genero = (document.getElementById("genero") as HTMLInputElement).value.trim();
    const disponible = (document.getElementById("disponible") as HTMLInputElement).checked;

    if (!titulo || !autor || !precio || precio <= 0) {
        return null;
    }

    return {
        isbn: "AUTO-" + Date.now(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero || undefined
    };
}

function precioPromedio(libros: Libro[]): number {
    const total = libros.reduce((suma, libro) => suma + libro.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listado = document.getElementById("listado") as HTMLUListElement;
    const stats = document.getElementById("stats") as HTMLParagraphElement;

    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.disponible ? "Disponible" : "No disponible"}`;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";
        boton.onclick = () => eliminarLibro(libro.isbn);

        li.appendChild(boton);
        listado.appendChild(li);
    });

    stats.textContent = `${libros.length} libros | Precio promedio: $${precioPromedio(libros).toFixed(0)}`;
}

document.getElementById("btnAgregar")!.addEventListener("click", () => {
    const errorForm = document.getElementById("errorForm") as HTMLDivElement;
    const libro = validarFormulario();

    if (!libro) {
        errorForm.textContent = "Error: completá título, autor y un precio mayor a 0";
        return;
    }

    errorForm.textContent = "";
    agregarLibro(libro);

    (document.getElementById("titulo") as HTMLInputElement).value = "";
    (document.getElementById("autor") as HTMLInputElement).value = "";
    (document.getElementById("precio") as HTMLInputElement).value = "";
    (document.getElementById("genero") as HTMLInputElement).value = "";
    (document.getElementById("disponible") as HTMLInputElement).checked = false;
});

renderizar(catalogo);