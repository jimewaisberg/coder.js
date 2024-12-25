const notas = JSON.parse(localStorage.getItem("notas")) || [];
const inputNota = document.getElementById("nota");
const resultadoDiv = document.getElementById("resultado");
const agregarNotaBtn = document.getElementById("agregar-nota");
const calcularPromedioBtn = document.getElementById("calcular-promedio");
const reiniciarBtn = document.getElementById("reiniciar");
const modal = document.getElementById("modal-estudiantes");
const contenidoModal = document.getElementById("contenido-modal");
const btnVerEstudiantes = document.getElementById("ver-estudiantes");
const btnCerrarModal = document.getElementById("cerrar-modal");


async function cargarDatosIniciales() {
    try {
        const response = await fetch("json/data.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo data.json");

        const data = await response.json();
        if (data.estudiantes && data.estudiantes.length > 0) {
            mostrarEstudiantesModal(data.estudiantes);
        } else {
            console.warn("No hay estudiantes en el archivo JSON");
        }
    } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
        mostrarNotificacion("Error al cargar datos iniciales.", "#dc3545");
    }
}

function mostrarEstudiantesModal(estudiantes) {
    contenidoModal.innerHTML = estudiantes
        .map((estudiante) => {
            const materiasHTML = estudiante.materias
                .map(
                    (materia) => `
                <p><strong>${materia.nombre}:</strong> Notas: ${materia.notas.join(", ")} - Promedio: ${calcularPromedioEstudiante(materia.notas).toFixed(2)}</p>
            `
                )
                .join("");
            return `
            <div class="estudiante">
                <h4>${estudiante.nombre}</h4>
                ${materiasHTML}
            </div>
        `;
        })
        .join("");
    modal.style.display = "flex"; 
}

function calcularPromedioEstudiante(notas) {
    return notas.reduce((a, b) => a + b, 0) / notas.length;
}


function mostrarNotificacion(texto, color) {
    Toastify({
        text: texto,
        backgroundColor: color,
        gravity: "top",
        position: "center",
        duration: 3000,
    }).showToast();
}

function guardarDatos() {
    const promedio = notas.length > 0 ? calcularPromedioEstudiante(notas) : null;
    const data = {
        notas: notas,
        promedio: promedio,
    };
    localStorage.setItem("simuladorData", JSON.stringify(data));
}


function agregarNota() {
    const nota = parseFloat(inputNota.value);
    if (nota >= 0 && nota <= 10) {
        notas.push(nota);
        inputNota.value = "";
        resultadoDiv.innerHTML = `<p>Notas ingresadas: ${notas.join(", ")}</p>`;
        guardarDatos();
        mostrarNotificacion("Nota agregada correctamente", "#28a745");
    } else {
        mostrarNotificacion("Por favor, ingresa una nota válida entre 0 y 10.", "#dc3545");
    }
}

function calcularPromedio() {
    if (notas.length === 0) {
        mostrarNotificacion("No hay notas ingresadas para calcular el promedio.", "#ffc107");
        return;
    }

    const promedio = calcularPromedioEstudiante(notas);
    guardarDatos();
    window.location.href = "informe.html";
}

function reiniciarSimulador() {
    notas.length = 0;
    localStorage.removeItem("simuladorData");
    resultadoDiv.innerHTML = `<p>Notas ingresadas: No hay notas aún.</p>`;
    mostrarNotificacion("Simulador reiniciado correctamente.", "#17a2b8");
}
btnVerEstudiantes.addEventListener("click", async () => {
    try {
        const response = await fetch("json/data.json");
        if (!response.ok) throw new Error("No se pudo cargar el archivo data.json");

        const data = await response.json();
        mostrarEstudiantesModal(data.estudiantes);
    } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
        mostrarNotificacion("Error al cargar datos iniciales.", "#dc3545");
    }
});

btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

inputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        agregarNota();
    }
});

agregarNotaBtn.addEventListener("click", agregarNota);
calcularPromedioBtn.addEventListener("click", calcularPromedio);
reiniciarBtn.addEventListener("click", reiniciarSimulador);

document.addEventListener("DOMContentLoaded", cargarDatosIniciales);
