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
        // Diferencia total en milisegundos
        const diffMs = ahora.getTime() - fechaInicio.getTime();
        
        // Calcular los EQUIVALENTES TOTALES por unidad
        const totalSegundos = Math.floor(diffMs / 1000);
        const totalMinutos = Math.floor(totalSegundos / 60);
        const totalHoras = Math.floor(totalMinutos / 60);
        const totalDias = Math.floor(totalHoras / 24);
        const totalSemanas = Math.floor(totalDias / 7);

        // Equivalentes en meses y años
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

        // Formateador para poner puntos en los miles
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

// --- 5. FUNCIONES DE PROTECCIÓN Y EDICIÓN CON CONTRASEÑA (13/02/2026) ---

function verificarPassword() {
    const pass = prompt("Introduce la contraseña para realizar cambios:");
    if (pass === "13/02/2026") {
        return true;
    } else {
        if (pass !== null) alert("Contraseña incorrecta ❌");
        return false;
    }
}

// Permite habilitar/deshabilitar la edición directa sobre un texto
function editarTexto(idElemento) {
    if (!verificarPassword()) return;

    const elem = document.getElementById(idElemento);
    if (elem) {
        const esEditable = elem.isContentEditable;
        if (!esEditable) {
            elem.contentEditable = "true";
            elem.focus();
            alert("¡Modo edición activado! Puedes modificar el texto directamente en la pantalla. Haz clic en el botón de nuevo para guardar.");
        } else {
            elem.contentEditable = "false";
            alert("¡Cambios guardados correctamente! ♡");
        }
    }
}

// Abre el selector de archivos para subir una foto
function solicitarSubirFoto() {
    if (verificarPassword()) {
        document.getElementById('inputSubirFoto').click();
    }
}

// Agrega dinámicamente la foto elegida a la galería
function agregarFotoGaleria(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const titulo = prompt("Ingresa el título para esta foto:", "Nuevo recuerdo") || "Nuevo recuerdo";
    const fecha = prompt("Ingresa la fecha de la foto:", "Hoy") || "Hoy";

    const reader = new FileReader();
    reader.onload = function(e) {
        const urlImagen = e.target.result;
        const galeria = document.getElementById('galeriaFotos');
        
        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.className = 'tarjeta-recuerdo';
        nuevaTarjeta.onclick = function() { abrirFoto(urlImagen, titulo, fecha); };
        nuevaTarjeta.innerHTML = `
            <img src="${urlImagen}" alt="${titulo}">
            <div class="info-recuerdo">
                <span>${fecha}</span>
                <h3>${titulo}</h3>
            </div>
        `;
        galeria.appendChild(nuevaTarjeta);
    };
    reader.readAsDataURL(archivo);
}

// Permite agregar un nuevo hito a la línea del tiempo
function agregarMomento() {
    if (!verificarPassword()) return;

    const fecha = prompt("Fecha del momento (ej: 14 DE FEBRERO, 2026):");
    if (!fecha) return;
    const titulo = prompt("Título del momento:");
    if (!titulo) return;
    const desc = prompt("Descripción del momento:");
    if (!desc) return;

    const timeline = document.getElementById('lineaTiempo');
    const nuevoEvento = document.createElement('div');
    nuevoEvento.className = 'evento-timeline';
    nuevoEvento.innerHTML = `
        <div class="punto-corazon">♥</div>
        <div class="tarjeta-evento">
            <span class="fecha-badge">${fecha.toUpperCase()}</span>
            <h3>${titulo}</h3>
            <p>${desc}</p>
        </div>
    `;
    timeline.appendChild(nuevoEvento);
}

// --- 6. INICIALIZACIÓN CONTINUA ---
calcularTiempoJuntos();
setInterval(calcularTiempoJuntos, 1000);
