const numeros = [3, 7, 12, 5, 19, 8, 1, 15];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const num of numeros) {
    suma += num;
    if (num > mayor) mayor = num;
    if (num < menor) menor = num;
}

const promedio = suma / numeros.length;

console.log(`Suma total: ${suma}`);
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${mayor}`);
console.log(`Número menor: ${menor}`);

function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 0; i < n; i++) {
        resultado += "*";
    }
    return resultado;
}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(1));
console.log(generarAsteriscos(20));