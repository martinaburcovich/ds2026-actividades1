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
    { isbn: "978-1444951417", titulo: "Heartstopper Volumen 2", autor: "Alice Oseman", precio: 18000, disponible: false, genero: "Novela gráfica" },
    { isbn: "978-1444951424", titulo: "Heartstopper Volumen 3", autor: "Alice Oseman", precio: 19000, disponible: true, genero: "Novela gráfica" },
    { isbn: "978-1444951431", titulo: "Heartstopper Volumen 4", autor: "Alice Oseman", precio: 19000, disponible: false, genero: "Novela gráfica" },
    { isbn: "978-1444951448", titulo: "Heartstopper Volumen 5", autor: "Alice Oseman", precio: 20000, disponible: true, genero: "Novela gráfica" },
    { isbn: "978-1444951455", titulo: "Heartstopper Volumen 6", autor: "Alice Oseman", precio: 20000, disponible: true, genero: "Novela gráfica" },
    { isbn: "978-0747532743", titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 15000, disponible: true, genero: "Fantasía" },
    { isbn: "978-0747538486", titulo: "Harry Potter y la cámara secreta", autor: "J.K. Rowling", precio: 15000, disponible: false, genero: "Fantasía" },
    { isbn: "978-0747542155", titulo: "Harry Potter y el prisionero de Azkaban", autor: "J.K. Rowling", precio: 16000, disponible: true, genero: "Fantasía" },
    { isbn: "978-0747546245", titulo: "Harry Potter y el cáliz de fuego", autor: "J.K. Rowling", precio: 17000, disponible: false, genero: "Fantasía" },
    { isbn: "978-0747551003", titulo: "Harry Potter y la orden del fénix", autor: "J.K. Rowling", precio: 18000, disponible: true, genero: "Fantasía" },
    { isbn: "978-0747581086", titulo: "Harry Potter y el misterio del príncipe", autor: "J.K. Rowling", precio: 18000, disponible: true, genero: "Fantasía" },
    { isbn: "978-0747591054", titulo: "Harry Potter y las reliquias de la muerte", autor: "J.K. Rowling", precio: 19000, disponible: false, genero: "Fantasía" },
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
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
        listado.appendChild(li);
    });

    stats.textContent = `${libros.length} libros | Precio promedio: $${precioPromedio(libros).toFixed(0)}`;
}

document.getElementById("filtrar")!.addEventListener("click", () => {
    const input = document.getElementById("filtroAutor") as HTMLInputElement;
    renderizar(buscarPorAutor(input.value));
});

document.getElementById("mostrarDisponibles")!.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

document.getElementById("mostrarTodos")!.addEventListener("click", () => {
    renderizar(catalogo);
});

renderizar(catalogo);