# Control Remoto CNT-91

Este proyecto proporciona una interfaz para controlar remotamente el dispositivo CNT-91 mediante conexión GPIB.

## Estructura del Proyecto

```
proyecto-cnt91/
├── README.md
├── requirements.txt
├── setup.py
└── src/
    ├── instrument/
    │   ├── __init__.py
    │   └── cnt91.py
    ├── api/
    │   ├── __init__.py
    │   └── endpoints.py
    └── web/
        ├── __init__.py
        └── app.py
```

## Requisitos

- Python 3.8 o superior
- Dependencias listadas en `requirements.txt`
- Dispositivo CNT-91 conectado en la dirección GPIB 10

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Uso

Para iniciar la interfaz web:

```bash
python src/web/app.py
```

## Funcionalidades

- Inicialización del dispositivo CNT-91
- Lectura de temperatura
- Medición de frecuencia
- Control remoto mediante interfaz web

## Configuración del Dispositivo

El dispositivo CNT-91 debe estar configurado con la dirección GPIB 10. La dirección por defecto en el código es 'GPIB0::10::INSTR'. 