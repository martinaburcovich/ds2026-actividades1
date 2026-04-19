function agregar() {
    const input = document.getElementById("producto");
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");

    if (!input.value.trim()) {
        alert("Error: ingresá un nombre de producto");
        return;
    }

    const li = document.createElement("li");
    li.textContent = input.value;

    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.onclick = function() {
        li.remove();
        actualizarContador();
    };

    li.appendChild(boton);
    lista.appendChild(li);
    input.value = "";
    actualizarContador();
}

function actualizarContador() {
    const lista = document.getElementById("lista");
    const contador = document.getElementById("contador");
    contador.textContent = `${lista.children.length} productos en la lista`;
}