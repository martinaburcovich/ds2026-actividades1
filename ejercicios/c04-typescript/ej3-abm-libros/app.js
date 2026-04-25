"use strict";
const catalogo = [
    { isbn: "978-1444951400", titulo: "Heartstopper Volumen 1", autor: "Alice Oseman", precio: 18000, disponible: true, genero: "Novela gráfica" },
    { isbn: "978-0747532743", titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 15000, disponible: true, genero: "Fantasía" },
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    const index = catalogo.findIndex(libro => libro.isbn === isbn);
    catalogo.splice(index, 1);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const genero = document.getElementById("genero").value.trim();
    const disponible = document.getElementById("disponible").checked;
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
function precioPromedio(libros) {
    const total = libros.reduce((suma, libro) => suma + libro.precio, 0);
    return total / libros.length;
}
function renderizar(libros) {
    const listado = document.getElementById("listado");
    const stats = document.getElementById("stats");
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
document.getElementById("btnAgregar").addEventListener("click", () => {
    const errorForm = document.getElementById("errorForm");
    const libro = validarFormulario();
    if (!libro) {
        errorForm.textContent = "Error: completá título, autor y un precio mayor a 0";
        return;
    }
    errorForm.textContent = "";
    agregarLibro(libro);
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("disponible").checked = false;
});
renderizar(catalogo);
