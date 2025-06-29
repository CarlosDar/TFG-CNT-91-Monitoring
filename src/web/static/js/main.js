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

    // Función para actualizar el estado
    async function actualizarEstado() {
        try {
            const response = await fetch('/api/estado');
            const data = await response.json();
            
            if (data.conectado) {
                estadoDispositivo.textContent = 'Conectado';
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('online');
            } else {
                estadoDispositivo.textContent = 'Desconectado';
                statusIndicator.classList.remove('online');
                statusIndicator.classList.add('offline');
            }
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    }

    btnConectar.addEventListener('click', async function() {
        try {
            // Cambiar el estado a "Trying To Connect"
            estadoDispositivo.textContent = 'Trying To Connect';
            
            const response = await fetch('/api/conectar', {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                estadoDispositivo.textContent = 'Conectado';
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('online');
                btnConectar.innerHTML = '<i class="fas fa-plug"></i> Desconectar';
                
                // Iniciar actualización periódica cada 1 minuto
                if (!intervaloActualizacion) {
                    intervaloActualizacion = setInterval(actualizarEstado, 60000);
                }
            } else {
                // Añadir delay antes de mostrar el mensaje de error
                setTimeout(() => {
                    estadoDispositivo.textContent = 'Not Able To Connect';
                    statusIndicator.classList.remove('online');
                    statusIndicator.classList.add('offline');
                    btnConectar.innerHTML = '<i class="fas fa-plug"></i> Conectar';
                }, 500);
                
                // Detener actualización periódica
                if (intervaloActualizacion) {
                    clearInterval(intervaloActualizacion);
                    intervaloActualizacion = null;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Añadir delay antes de mostrar el mensaje de error
            setTimeout(() => {
                estadoDispositivo.textContent = 'Not Able To Connect';
                statusIndicator.classList.remove('online');
                statusIndicator.classList.add('offline');
            }, 500);
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

    // Función para configurar el canal
    async function configurarCanal() {
        const canalValue = document.getElementById('canal').value;
        // Convertir 1 a 'A' y 2 a 'B'
        const canal = canalValue === '1' ? 'A' : 'B';
        
        try {
            const response = await fetch('/api/configurar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ canal })
            });
            
            const data = await response.json();
            if (data.status === 'success') {
                alert('Canal configurado correctamente');
            } else {
                alert('Error al configurar el canal: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al configurar el canal');
        }
    }

    // Event listener para el botón de configurar canal
    document.getElementById('configurarCanal').addEventListener('click', configurarCanal);

    // Actualizar estado inicial
    actualizarEstado();
}); 