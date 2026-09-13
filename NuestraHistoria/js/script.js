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

// --- 3. CÁLCULO EN TIEMPO REAL DEL CONTADOR (13 DE FEBRERO DE 2026) ---
// --- CÁLCULO PRECISO (AÑOS, MESES, SEMANAS, DÍAS, HORAS, MINUTOS, SEGUNDOS) ---
function calcularTiempoJuntos() {
    // Fecha de inicio: 13 de febrero de 2026
    const fechaInicio = new Date(2026, 1, 13, 0, 0, 0); 
    const ahora = new Date();
    
    if (ahora >= fechaInicio) {
        // 1. Calcular Años completos
        let anos = ahora.getFullYear() - fechaInicio.getFullYear();
        let tempAnos = new Date(fechaInicio.getFullYear() + anos, fechaInicio.getMonth(), fechaInicio.getDate(), fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds());
        
        if (tempAnos > ahora) {
            anos--;
            tempAnos = new Date(fechaInicio.getFullYear() + anos, fechaInicio.getMonth(), fechaInicio.getDate(), fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds());
        }

        // 2. Calcular Meses restantes
        let meses = 0;
        let tempMeses = new Date(tempAnos.getFullYear(), tempAnos.getMonth() + 1, tempAnos.getDate(), tempAnos.getHours(), tempAnos.getMinutes(), tempAnos.getSeconds());
        
        while (tempMeses <= ahora) {
            meses++;
            tempAnos = tempMeses;
            tempMeses = new Date(tempAnos.getFullYear(), tempAnos.getMonth() + 1, tempAnos.getDate(), tempAnos.getHours(), tempAnos.getMinutes(), tempAnos.getSeconds());
        }

        // 3. Tiempo sobrante tras restar años y meses
        const diffMs = ahora.getTime() - tempAnos.getTime();
        const totalSegundos = Math.floor(diffMs / 1000);

        // 4. Desglose en Semanas, Días, Horas, Minutos y Segundos
        const semanas = Math.floor(totalSegundos / (3600 * 24 * 7));
        const dias = Math.floor((totalSegundos % (3600 * 24 * 7)) / (3600 * 24));
        const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = Math.floor(totalSegundos % 60);

        // Formatear a dos dígitos para horas, minutos y segundos
        const formatHoras = String(horas).padStart(2, '0');
        const formatMinutos = String(minutos).padStart(2, '0');
        const formatSegundos = String(segundos).padStart(2, '0');

        // Actualizar valores en pantalla
        const elemAnos = document.getElementById('anos');
        const elemMeses = document.getElementById('meses');
        const elemSemanas = document.getElementById('semanas');
        const elemDias = document.getElementById('dias');
        const elemHoras = document.getElementById('horas');
        const elemMinutos = document.getElementById('minutos');
        const elemSegundos = document.getElementById('segundos');

        if (elemAnos) elemAnos.textContent = anos;
        if (elemMeses) elemMeses.textContent = meses;
        if (elemSemanas) elemSemanas.textContent = semanas;
        if (elemDias) elemDias.textContent = dias;
        if (elemHoras) elemHoras.textContent = formatHoras;
        if (elemMinutos) elemMinutos.textContent = formatMinutos;
        if (elemSegundos) elemSegundos.textContent = formatSegundos;
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

// --- INICIALIZACIÓN CONTINUA ---
// Se ejecuta inmediatamente al cargar el script
calcularTiempoJuntos();

// Mantiene el reloj sumando segundos sin pausar
setInterval(calcularTiempoJuntos, 1000);
