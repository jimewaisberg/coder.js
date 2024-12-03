document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal");
    const btnAyuda = document.getElementById("ayuda");
    const cerrarModal = document.getElementById("cerrar-modal");
   
    btnAyuda.addEventListener("click", () => {
        modal.style.display = "flex";
    });
   
    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
