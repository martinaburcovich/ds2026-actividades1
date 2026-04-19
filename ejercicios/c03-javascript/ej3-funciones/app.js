function calcularPrecioFinal(monto, medioPago) {
    if (monto < 200) {
        return monto;
    } else if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") return monto * 0.70;
        if (medioPago === "D") return monto * 0.80;
        if (medioPago === "C") return monto * 0.90;
    } else {
        return monto * 0.60;
    }
}

console.log(`Monto: $150 | Pago: D | Final: $${calcularPrecioFinal(150, "D")}`);
console.log(`Monto: $200 | Pago: E | Final: $${calcularPrecioFinal(200, "E")}`);
console.log(`Monto: $350 | Pago: C | Final: $${calcularPrecioFinal(350, "C")}`);
console.log(`Monto: $400 | Pago: D | Final: $${calcularPrecioFinal(400, "D")}`);
console.log(`Monto: $999 | Pago: C | Final: $${calcularPrecioFinal(999, "C")}`);