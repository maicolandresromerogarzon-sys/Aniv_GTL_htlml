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

// --- CÁLCULO PRECISO Y COMPATIBLE DEL TIEMPO JUNTOS ---
function calcularTiempoJuntos() {
    // Formato compatible con todos los navegadores: (Año, Mes [0=Ene, 1=Feb], Día, Hora, Min, Seg)
    const fechaInicio = new Date(2026, 1, 13, 0, 0, 0); 
    const ahora = new Date();
    const diferenciaMs = ahora - fechaInicio;

    if (!isNaN(diferenciaMs) && diferenciaMs >= 0) {
        const totalSegundos = Math.floor(diferenciaMs / 1000);

        const dias = Math.floor(totalSegundos / (3600 * 24));
        const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = Math.floor(totalSegundos % 60);

        // Formatear a dos dígitos (ej. "05" en lugar de "5")
        const formatHoras = String(horas).padStart(2, '0');
        const formatMinutos = String(minutos).padStart(2, '0');
        const formatSegundos = String(segundos).padStart(2, '0');

        const elemDias = document.getElementById('dias');
        const elemHoras = document.getElementById('horas');
        const elemMinutos = document.getElementById('minutos');
        const elemSegundos = document.getElementById('segundos');

        if (elemDias) elemDias.textContent = dias;
        if (elemHoras) elemHoras.textContent = formatHoras;
        if (elemMinutos) elemMinutos.textContent = formatMinutos;
        if (elemSegundos) elemSegundos.textContent = formatSegundos;
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

// Executar inmediatamente al cargar el archivo script
calcularTiempoJuntos();

// Actualizar cada segundo (1000 ms)
setInterval(calcularTiempoJuntos, 1000);
