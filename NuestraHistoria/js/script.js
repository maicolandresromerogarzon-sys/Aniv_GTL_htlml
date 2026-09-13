// --- 1. TRANSICIÓN DE ENTRADA AL DAR CLIC EN EL FRASCO ---
function abrirHistoria() {
    const inicio = document.getElementById('pantalla-inicio');
    const principal = document.getElementById('pantalla-principal');

    if (inicio && principal) {
        inicio.style.transition = 'opacity 0.6s ease';
        inicio.style.opacity = '0';
        
        setTimeout(() => {
            inicio.style.display = 'none';
            principal.style.display = 'flex';
            principal.style.opacity = '0';
            
            setTimeout(() => {
                principal.style.transition = 'opacity 0.6s ease';
                principal.style.opacity = '1';
            }, 50);
        }, 600);
    }
}

// --- 2. NAVEGACIÓN ENTRE SECCIONES DEL MENÚ ---
function mostrarSeccion(idSeccion, boton) {
    const bloques = document.querySelectorAll('.seccion-bloque');
    bloques.forEach(bloque => {
        bloque.style.display = 'none';
        bloque.classList.remove('activa');
    });

    const botones = document.querySelectorAll('.boton-menu');
    botones.forEach(btn => btn.classList.remove('activo-menu'));

    const objetivo = document.getElementById(idSeccion);
    if (objetivo) {
        objetivo.style.display = 'block';
        objetivo.classList.add('activa');
    }

    if (boton) {
        boton.classList.add('activo-menu');
    }
}

// --- 3. CÁLCULO DINÁMICO DEL CONTADOR (DESDE EL 13/02/2026) ---
function calcularTiempoJuntos() {
    const fechaInicio = new Date('2026-02-13T00:00:00');
    const ahora = new Date();

    const diferenciaMs = ahora - fechaInicio;

    if (diferenciaMs >= 0) {
        const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenciaMs / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenciaMs / (1000 * 60)) % 60);
        const meses = Math.floor(dias / 30.44);

        if (document.getElementById('dias')) document.getElementById('dias').innerText = dias;
        if (document.getElementById('meses')) document.getElementById('meses').innerText = meses;
        if (document.getElementById('horas')) document.getElementById('horas').innerText = horas;
        if (document.getElementById('minutos')) document.getElementById('minutos').innerText = minutos;
    }
}

// --- 4. VISOR DE FOTOS ---
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

// --- ASIGNAR EVENTO AL FRASCO Y CARGAR CONTADOR ---
document.addEventListener('DOMContentLoaded', () => {
    const frasco = document.getElementById('btn-frasco');
    if (frasco) {
        frasco.addEventListener('click', abrirHistoria);
    }
    
    calcularTiempoJuntos();
    setInterval(calcularTiempoJuntos, 1000);
});
