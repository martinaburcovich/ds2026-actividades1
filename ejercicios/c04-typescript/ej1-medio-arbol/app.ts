function generarAsteriscos(n: string): string {
    let resultado = "";
    for (let i = 1; i <= n; i++) {
        resultado += "*".repeat(i) + "\n";
    }
    return resultado;
}

function generar(): void {
    const input = document.getElementById("numero") as HTMLInputElement;
    const resultado = document.getElementById("resultado") as HTMLElement;
    const altura = parseInt(input.value);

    if (!input.value || altura < 1) {
        resultado.textContent = "Error: ingresá un número mayor a 0";
        return;
    }

    resultado.textContent = generarAsteriscos(altura);
}