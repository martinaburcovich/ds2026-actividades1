"use strict";
async function obtenerUsuarios() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        clearTimeout(timeout);
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch (error) {
        clearTimeout(timeout);
        throw error;
    }
}
async function main() {
    const cargando = document.getElementById("cargando");
    const listado = document.getElementById("listado");
    const errorP = document.getElementById("error");
    cargando.style.display = "block";
    try {
        const usuarios = await obtenerUsuarios();
        cargando.style.display = "none";
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} - ${usuario.email}`;
            listado.appendChild(li);
        });
    }
    catch (error) {
        cargando.style.display = "none";
        errorP.textContent = "Error al cargar los usuarios. Intentá de nuevo.";
    }
}
main();
