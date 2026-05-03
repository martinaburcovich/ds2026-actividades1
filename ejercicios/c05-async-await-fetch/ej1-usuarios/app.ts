interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        const usuarios: Usuario[] = await respuesta.json();
        return usuarios;
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
        return [];
    }
}

obtenerUsuarios().then(usuarios => {
    usuarios.forEach(usuario => {
        console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
    });
});
