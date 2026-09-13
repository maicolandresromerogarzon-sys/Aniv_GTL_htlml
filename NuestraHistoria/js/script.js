// --- ABRIR LA HISTORIA DESDE EL FRASCO ---
function abrirHistoria() {
    const inicio = document.getElementById('pantalla-inicio');
    const principal = document.getElementById('pantalla-principal');

    if (inicio && principal) {
        inicio.style.opacity = '0';
        inicio.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            inicio.style.display = 'none';
            principal.style.display = 'flex';
            principal.style.opacity = '0';
            setTimeout(() => {
                principal.style.transition = 'opacity 0.5s ease';
                principal.style.opacity = '1';
            }, 50);
        }, 500);
    }
}

// --- NAVEGACIÓN DEL MENÚ ---
function mostrarSeccion(idSeccion, boton) {
    const bloques = document.querySelectorAll('.seccion-bloque');
    bloques.forEach(bloque => {
        bloque.style.display = 'none';
    });

    const botones = document.querySelectorAll('.boton-menu');
    botones.forEach(btn => btn.classList.remove('activo-menu'));

    const objetivo = document.getElementById(idSeccion);
    if (objetivo) {
        objetivo.style.display = 'block';
    }

    if (boton) {
        boton.classList.add('activo-menu');
    }
}

// --- CÁLCULO PRECISO DEL TIEMPO JUNTOS (DÍAS, HORAS, MINUTOS, SEGUNDOS) ---
function calcularTiempoJuntos() {
    // Fecha de inicio: 13 de Febrero de 2026
    const fechaInicio = new Date('2026-02-13T00:00:00');
    const ahora = new Date();
    const diferenciaMs = ahora - fechaInicio;

    if (diferenciaMs >= 0) {
        const totalSegundos = Math.floor(diferenciaMs / 1000);

        const dias = Math.floor(totalSegundos / (3600 * 24));
        const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = Math.floor(totalSegundos % 60);

        // Formatear números con cero inicial (ej. 05 en vez de 5)
        const formatHoras = String(horas).padStart(2, '0');
        const formatMinutos = String(minutos).padStart(2, '0');
        const formatSegundos = String(segundos).padStart(2, '0');

        if (document.getElementById('dias')) document.getElementById('dias').innerText = dias;
        if (document.getElementById('horas')) document.getElementById('horas').innerText = formatHoras;
        if (document.getElementById('minutos')) document.getElementById('minutos').innerText = formatMinutos;
        if (document.getElementById('segundos')) document.getElementById('segundos').innerText = formatSegundos;
    }
}

// --- VISOR DE FOTOS PARA LA GALERÍA ---
function abrirFoto(ruta, titulo, fecha) {
    const visor = document.getElementById('visorFoto');
    const fotoGrande = document.getElementById('fotoGrande');
    const caption = document.getElementById('captionFoto');

    if (visor && fotoGrande) {
        fotoGrande.src = ruta;
        caption.innerHTML = `<strong>${titulo}</strong> — ${fecha}`;
        visor.style.display = 'flex';
    }
}

function cerrarFoto() {
    const visor = document.getElementById('visorFoto');
    if (visor) visor.style.display = 'none';
}

// Inicializar el reloj dinámico cada 1000 milisegundos (1 segundo)
document.addEventListener('DOMContentLoaded', () => {
    calcularTiempoJuntos();
    setInterval(calcularTiempoJuntos, 1000);
});
