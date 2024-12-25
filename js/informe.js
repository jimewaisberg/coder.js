function obtenerDatos() {
    return JSON.parse(localStorage.getItem("simuladorData"));
}

function mostrarResultados() {
    const data = obtenerDatos();
    const resultadoPromedio = document.getElementById("resultado-promedio");
    const mensajeFeedback = document.getElementById("mensaje-feedback");

    
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    if (data && data.promedio !== null) {
        const promedio = parseFloat(data.promedio);
        resultadoPromedio.innerHTML = `Tu promedio final es: <strong>${promedio.toFixed(2)}</strong>`;

        if (promedio >= 8) {
            mensajeFeedback.innerHTML = "¡Felicidades! 🌟 Has alcanzado un rendimiento excelente. ¡Sigue así!";
            mensajeFeedback.className = "feedback-excelente";
        } else if (promedio >= 5) {
            mensajeFeedback.innerHTML = "Buen trabajo 👍. Puedes mejorar aún más si te lo propones.";
            mensajeFeedback.className = "feedback-bueno";
        } else {
            mensajeFeedback.innerHTML = "Necesitas mejorar 📉. ¡No te desanimes y sigue practicando!";
            mensajeFeedback.className = "feedback-malo";
        }

        mostrarGrafico(estudiantes);
    } else {
        resultadoPromedio.innerHTML = "No se encontró un promedio guardado. Por favor, regresa al simulador.";
        mensajeFeedback.innerHTML = "";
    }
}


function mostrarGrafico(estudiantes) {
    const promedios = calcularPromedios(estudiantes);
    const nombres = promedios.map(est => est.nombre);
    const valoresPromedio = promedios.map(est => est.promedio);

    const ctx = document.getElementById('graficoPromedios').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Promedio de Notas',
                data: valoresPromedio,
                backgroundColor: 'rgba(99, 179, 237, 0.6)',
                borderColor: 'rgba(99, 179, 237, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}


function calcularPromedios(estudiantes) {
    return estudiantes.map(est => {
        const promedio = est.materias.reduce((sum, materia) => sum + materia.notas[0], 0) / est.materias.length;
        return { nombre: est.nombre, promedio: promedio };
    });
}

function volverInicio() {
    window.location.href = "index.html";
}

document.getElementById("volver-inicio").addEventListener("click", volverInicio);
document.addEventListener("DOMContentLoaded", mostrarResultados);
