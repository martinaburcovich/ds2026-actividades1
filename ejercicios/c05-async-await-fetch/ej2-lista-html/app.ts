interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        clearTimeout(timeout);
        const usuarios: Usuario[] = await respuesta.json();
        return usuarios;
    } catch (error) {
        clearTimeout(timeout);
        throw error;
    }
}

async function main(): Promise<void> {
    const cargando = document.getElementById("cargando") as HTMLParagraphElement;
    const listado = document.getElementById("listado") as HTMLUListElement;
    const errorP = document.getElementById("error") as HTMLParagraphElement;

    cargando.style.display = "block";

    try {
        const usuarios = await obtenerUsuarios();
        cargando.style.display = "none";

        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} - ${usuario.email}`;
            listado.appendChild(li);
        });

    } catch (error) {
        cargando.style.display = "none";
        errorP.textContent = "Error al cargar los usuarios. Intentá de nuevo.";
    }
}

main();