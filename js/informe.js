
function obtenerPromedioURL() {
    const params = new URLSearchParams(window.location.search);
    const promedio = parseFloat(params.get('promedio'));

    if (!isNaN(promedio)) {
        return promedio;
    } else {
        alert("No se encontró el promedio. Regresando al simulador.");
        window.location.href = "index.html";
    }
}
function mostrarResultados() {
    const promedio = obtenerPromedioURL();
    const resultadoPromedio = document.getElementById("resultadopromedio");
    const mensajeFeedback = document.getElementById("mensajefeedback");

    resultadoPromedio.innerHTML = `Tu promedio final es: <strong>${promedio}</strong>`;

    if (promedio >= 8) {
        mensajeFeedback.innerHTML = "¡Felicidades! 🌟 Has alcanzado un rendimiento excelente. ¡Sigue así!";
    } else if (promedio >= 5) {
        mensajeFeedback.innerHTML = "Buen trabajo 👍. Puedes mejorar aún más si te lo propones.";
    } else {
        mensajeFeedback.innerHTML = "Necesitas mejorar 📉. ¡No te desanimes y sigue practicando!";
    }
}
function volverInicio() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", mostrarResultados);
