document.addEventListener('DOMContentLoaded', function() {
    // Manejo de la navegación
    const navLinks = document.querySelectorAll('.sidebar nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al enlace clickeado
            this.classList.add('active');
            
            // Obtener la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección seleccionada
            const targetSection = document.getElementById(sectionId + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Manejo del botón de conexión
    const btnConectar = document.getElementById('btn-conectar');
    const estadoDispositivo = document.getElementById('estado-dispositivo');
    const statusIndicator = document.querySelector('.status-indicator');
    let intervaloActualizacion = null;
    let actualizandoTemperatura = false; // Control para evitar solicitudes simultáneas

    // Función para actualizar el estado
    async function actualizarEstado() {
        if (actualizandoTemperatura) return; // Evitar solicitudes simultáneas
        
        try {
            actualizandoTemperatura = true;
            const response = await fetch('/api/estado');
            const data = await response.json();
            
            if (data.conectado) {
                // Actualizar temperatura
                const temperaturaElement = document.querySelector('.temperature .value');
                if (temperaturaElement) {
                    temperaturaElement.textContent = data.temperatura.toFixed(2);
                }
            }
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        } finally {
            actualizandoTemperatura = false;
        }
    }

    btnConectar.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/conectar', {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.conectado) {
                estadoDispositivo.textContent = 'Conectado';
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('online');
                btnConectar.innerHTML = '<i class="fas fa-plug"></i> Desconectar';
                
                // Iniciar actualización periódica cada 30 segundos
                if (!intervaloActualizacion) {
                    intervaloActualizacion = setInterval(actualizarEstado, 30000);
                }
            } else {
                estadoDispositivo.textContent = 'Desconectado';
                statusIndicator.classList.remove('online');
                statusIndicator.classList.add('offline');
                btnConectar.innerHTML = '<i class="fas fa-plug"></i> Conectar';
                
                // Detener actualización periódica
                if (intervaloActualizacion) {
                    clearInterval(intervaloActualizacion);
                    intervaloActualizacion = null;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            estadoDispositivo.textContent = 'Error de conexión';
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
        }
    });

    document.getElementById('btn-desconectar').addEventListener('click', function() {
        fetch('/api/desconectar', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje);
                actualizarEstado();
            })
            .catch(error => console.error('Error:', error));
    });

    document.getElementById('btn-temperatura').addEventListener('click', function() {
        fetch('/api/temperatura')
            .then(response => response.json())
            .then(data => {
                alert(`Temperatura: ${data.temperatura}°C`);
            })
            .catch(error => console.error('Error:', error));
    });

    document.getElementById('btn-frecuencia').addEventListener('click', function() {
        fetch('/api/frecuencia')
            .then(response => response.json())
            .then(data => {
                alert(`Frecuencia en canal ${data.canal}: ${data.frecuencia} Hz`);
            })
            .catch(error => console.error('Error:', error));
    });

    document.getElementById('btn-configurar').addEventListener('click', function() {
        const canal = prompt('Ingrese el número de canal (1-4):');
        if (canal) {
            fetch('/api/configurar-canal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    canal: parseInt(canal),
                    configuracion: {}
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje);
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // Actualizar estado inicial
    actualizarEstado();
}); 