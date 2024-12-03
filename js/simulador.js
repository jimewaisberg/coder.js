const notas = JSON.parse(localStorage.getItem("notas")) || [];
const formNotas = document.getElementById("form-notas");
const inputNota = document.getElementById("nota");
const calcularPromedioBtn = document.getElementById("calcular-promedio");
const reiniciarBtn = document.getElementById("reiniciar");
const resultadoDiv = document.getElementById("resultado");

function guardarDatos() {
    const data = {
        notas: notas,
        promedio: notas.length > 0 ? (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2) : null,
    };
    localStorage.setItem("simuladorData", JSON.stringify(data));
}

function cargarDatos() {
    const data = JSON.parse(localStorage.getItem("simuladorData"));
    if (data && data.notas) {
        notas.push(...data.notas);
        resultadoDiv.innerHTML = `<p>Notas ingresadas: ${notas.join(", ")}</p>`;
    }
}

function calcularPromedio() {
    if (notas.length === 0) {
        resultadoDiv.innerHTML = `<p>No hay notas para calcular el promedio.</p>`;
        return;
    }

    const promedio = notas.reduce((acumulador, nota) => acumulador + nota, 0) / notas.length;
    guardarDatos(); // Guardar el promedio y las notas
    window.location.href = "informe.html";
}

formNotas.addEventListener("submit", (e) => {
    e.preventDefault();

    const nota = parseFloat(inputNota.value);
    if (nota >= 0 && nota <= 10) {
        notas.push(nota);
        inputNota.value = "";
        resultadoDiv.innerHTML = `<p>Notas ingresadas: ${notas.join(", ")}</p>`;
        guardarDatos(); // Guardar datos actualizados
    } else {
        resultadoDiv.innerHTML = `<p>Por favor, ingresa una nota válida entre 0 y 10.</p>`;
    }
});

calcularPromedioBtn.addEventListener("click", calcularPromedio);

reiniciarBtn.addEventListener("click", () => {
    notas.length = 0;
    localStorage.removeItem("simuladorData");
    resultadoDiv.innerHTML = `<p>Notas ingresadas: No hay notas aún.</p>`;
});

// Cargar datos iniciales al abrir la página
document.addEventListener("DOMContentLoaded", cargarDatos);
