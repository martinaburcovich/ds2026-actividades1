"use strict";
function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 1; i <= n; i++) {
        resultado += "*".repeat(i) + "\n";
    }
    return resultado;
}
function generar() {
    const input = document.getElementById("numero");
    const resultado = document.getElementById("resultado");
    const altura = parseInt(input.value);
    if (!input.value || altura < 1) {
        resultado.textContent = "Error: ingresá un número mayor a 0";
        return;
    }
    resultado.textContent = generarAsteriscos(altura);
}
