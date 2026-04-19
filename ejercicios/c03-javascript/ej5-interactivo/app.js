function generar() {
    const input = document.getElementById("numero");
    const resultado = document.getElementById("resultado");
    const altura = parseInt(input.value);

    if (!input.value || altura < 1) {
        resultado.textContent = "Error: ingresá un número mayor a 0";
        return;
    }

    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
}