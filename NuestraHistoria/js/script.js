// --- LÓGICA DEL CONTADOR DINÁMICO ---
function actualizarContador() {
    // Ajusta aquí la fecha de inicio de tu relación (Año, Mes-1, Día, Hora, Minuto)
    // Nota: El mes 0 es Enero, 1 es Febrero, etc.
    const fechaInicio = new Date(2026, 1, 13, 0, 0, 0); 
    const ahora = new Date();
    
    const diferenciaMs = ahora - fechaInicio;

    if (diferenciaMs > 0) {
        const diasTotal = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenciaMs / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenciaMs / (1000 * 60)) % 60);
        const meses = Math.floor(diasTotal / 30.44);

        const elemDias = document.getElementById('dias');
        const elemMeses = document.getElementById('meses');
        const elemHoras = document.getElementById('horas');
        const elemMinutos = document.getElementById('minutos');

        if (elemDias) elemDias.innerText = diasTotal;
        if (elemMeses) elemMeses.innerText = meses;
        if (elemHoras) elemHoras.innerText = horas;
        if (elemMinutos) elemMinutos.innerText = minutos;
    }
}

// --- VISOR DE IMÁGENES ---
function abrirFoto(ruta) {
    const visor = document.getElementById('visorFoto');
    const fotoGrande = document.getElementById('fotoGrande');
    if (visor && fotoGrande) {
        fotoGrande.src = ruta;
        visor.style.display = 'flex';
    }
}

function cerrarFoto() {
    const visor = document.getElementById('visorFoto');
    if (visor) {
        visor.style.display = 'none';
    }
}

// Inicializar el contador al cargar la página y actualizarlo cada segundo
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    setInterval(actualizarContador, 1000);
});
