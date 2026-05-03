"use strict";
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch (error) {
        console.log("Error al obtener usuarios:", error);
        return [];
    }
}
obtenerUsuarios().then(usuarios => {
    usuarios.forEach(usuario => {
        console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
    });
});
