document.addEventListener('DOMContentLoaded', function() {
    // Función para actualizar el estado
    function actualizarEstado() {
        fetch('/api/estado')
            .then(response => response.json())
            .then(data => {
                document.getElementById('estado-dispositivo').textContent = 
                    data.conectado ? 'Conectado' : 'Desconectado';
            })
            .catch(error => console.error('Error:', error));
    }

    // Event listeners para los botones
    document.getElementById('btn-conectar').addEventListener('click', function() {
        fetch('/api/conectar', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje);
                actualizarEstado();
            })
            .catch(error => console.error('Error:', error));
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