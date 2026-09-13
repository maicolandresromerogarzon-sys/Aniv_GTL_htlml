// --- 1. ABRIR HISTORIA AL HACER CLIC EN EL FRASCO ---
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

// --- 2. CAMBIAR SECCIONES DEL MENÚ ---
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

// --- 3. CÁLCULO DE EQUIVALENTES (TOTALES ACUMULADOS) ---
function calcularTiempoJuntos() {
    // Fecha de inicio: 13 de febrero de 2026 a las 00:00:00
    const fechaInicio = new Date(2026, 1, 13, 0, 0, 0); 
    const ahora = new Date();
    
    if (ahora >= fechaInicio) {
        // 1. Diferencia total en milisegundos
        const diffMs = ahora.getTime() - fechaInicio.getTime();
        
        // 2. Calcular los EQUIVALENTES TOTALES por unidad
        const totalSegundos = Math.floor(diffMs / 1000);
        const totalMinutos = Math.floor(totalSegundos / 60);
        const totalHoras = Math.floor(totalMinutos / 60);
        const totalDias = Math.floor(totalHoras / 24);
        const totalSemanas = Math.floor(totalDias / 7);

        // 3. Equivalentes en meses y años (Cálculo exacto de calendario)
        let totalAnos = ahora.getFullYear() - fechaInicio.getFullYear();
        let tempAnos = new Date(fechaInicio.getFullYear() + totalAnos, fechaInicio.getMonth(), fechaInicio.getDate(), fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds());
        if (tempAnos > ahora) {
            totalAnos--;
        }

        let totalMeses = (ahora.getFullYear() - fechaInicio.getFullYear()) * 12 + (ahora.getMonth() - fechaInicio.getMonth());
        let tempMeses = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth() + totalMeses, fechaInicio.getDate(), fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds());
        if (tempMeses > ahora) {
            totalMeses--;
        }

        // Formateador para poner puntos en los miles (ej: 5.088 horas)
        const formatoNumero = new Intl.NumberFormat('es-CO');

        // Actualizar valores en pantalla
        const elemAnos = document.getElementById('anos');
        const elemMeses = document.getElementById('meses');
        const elemSemanas = document.getElementById('semanas');
        const elemDias = document.getElementById('dias');
        const elemHoras = document.getElementById('horas');
        const elemMinutos = document.getElementById('minutos');
        const elemSegundos = document.getElementById('segundos');

        if (elemAnos) elemAnos.textContent = totalAnos;
        if (elemMeses) elemMeses.textContent = totalMeses;
        if (elemSemanas) elemSemanas.textContent = totalSemanas;
        if (elemDias) elemDias.textContent = totalDias;
        
        // Usamos el formato para que números muy grandes se vean organizados
        if (elemHoras) elemHoras.textContent = formatoNumero.format(totalHoras);
        if (elemMinutos) elemMinutos.textContent = formatoNumero.format(totalMinutos);
        if (elemSegundos) elemSegundos.textContent = formatoNumero.format(totalSegundos);
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

// --- 5. INICIALIZACIÓN CONTINUA ---
calcularTiempoJuntos();
setInterval(calcularTiempoJuntos, 1000);
