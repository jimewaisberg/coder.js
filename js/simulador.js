const MAX_NOTA = 10;
let notas = [];

function agregarnota() {
    const nota = parseFloat(prompt("Ingresa una nota entre 0 y 10:"));

    if (nota >= 0 && nota <= MAX_NOTA) {
        notas.push(nota);
        alert(`Nota ${nota} agregada correctamente.`);
        console.log(`Nota ${nota} agregada.`);
    } else {
        alert("Por favor, ingresa una nota válida entre 0 y 10.");
    }
}

function mostrarpromedio() {
    if (notas.length === 0) {
        alert("No has ingresado ninguna nota.");
        return;
    }

    const promedio = calcularpromedio();
    window.location.href = `informe.html?promedio=${promedio.toFixed(2)}`;
}

function calcularpromedio() {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    return suma / notas.length;
}

function notameta() {
    const meta = parseFloat(prompt("Ingresa el promedio que deseas alcanzar:"));

    if (isNaN(meta)) {
        alert("Meta inválida. Por favor, ingresa un número.");
        return;
    }

    const sumaActual = notas.reduce((acc, nota) => acc + nota, 0);
    const notaNecesaria = (meta * (notas.length + 1)) - sumaActual;

    alert("Para alcanzar un promedio de " + meta.toFixed(2) + ",\n" +
          "necesitas obtener al menos una nota de " + notaNecesaria.toFixed(2) +
          " en la próxima evaluación.");
}

function reiniciar() {
    if (confirm("¿Estás seguro de que deseas reiniciar el simulador?\n" +
                "Esto borrará todas las notas ingresadas.")) {
        notas = [];
        alert("Simulador reiniciado.\nPuedes comenzar a ingresar nuevas notas.");
        console.log("Simulador reiniciado.");
    }
}
