function obtenerDatos() {
    return JSON.parse(localStorage.getItem("simuladorData"));
}

function mostrarResultados() {
    const data = obtenerDatos();
    const resultadoPromedio = document.getElementById("resultado-promedio");
    const mensajeFeedback = document.getElementById("mensaje-feedback");

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
    } else {
        resultadoPromedio.innerHTML = "No se encontró un promedio guardado. Por favor, regresa al simulador.";
        mensajeFeedback.innerHTML = "";
    }
}

function volverInicio() {
    window.location.href = "index.html";
}

document.getElementById("volver-inicio").addEventListener("click", volverInicio);
document.addEventListener("DOMContentLoaded", mostrarResultados);
