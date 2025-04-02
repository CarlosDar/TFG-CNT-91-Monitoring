# Documentación de Prompts del Proyecto

Este documento contiene los prompts principales utilizados para el desarrollo del proyecto TFG-CNT-91-Monitoring.

## 1. Prompt Inicial en ChatGPT
**Objetivo**: Obtener una plantilla inicial para el proyecto de control remoto del CNT-91.

**Prompt**:
```
Hazme un prompt para Cursor AI :

Quiero un prompt para que Cursor AI  me diseñe una buena plantilla o esqueleto inicial de proyecto. 

La idea del proyecto nace de querer controlar de manera remota el CNT-91 con conexión GPiB , este control se hace a través de programación con Python.
Por lo que estoy planeando crear una libreria con todas las funciones posibles, iniciar el dispositivo, obtener la temperatura, obtener una medición de frequencia etc.

Mi objetivo es que cuando se ejecute el código tenga una página web que permita al usuario realizar dichas funciones de manera intuitiva, de momento no quiero que uses ninguna función ya que las tengo que hacer, solo quiero una starting page.

Quiero por lo tanto que me organices directorio de tal manera que esté de manera organizada la Api , la parte web, la clase de mi instrumento, etc ...
```

**Propósito**: Este prompt se utilizó para obtener una estructura inicial del proyecto, definiendo los componentes principales y la organización de directorios.

## 2. Prompt de Implementación en Cursor
**Objetivo**: Generar el esqueleto del proyecto con la estructura de directorios y archivos necesarios.

**Prompt**:
```
Prompt para Cursor AI:

Quiero que generes un esqueleto de proyecto en Python para controlar de manera remota el dispositivo CNT-91 mediante conexión GPIB. La idea es crear una biblioteca que incluya todos los métodos necesarios para interactuar con el instrumento (como inicializar el dispositivo, obtener la temperatura, medir la frecuencia, etc.), pero sin implementar la funcionalidad real (solo placeholders o stubs).

El proyecto debe incluir los siguientes componentes y una estructura de directorios bien organizada:

Clase del Instrumento

Crea un módulo, por ejemplo cnt91.py, que contenga la clase CNT91.

Dentro de la clase, define métodos como inicializar(), obtener_temperatura(), medir_frecuencia(), etc., dejando placeholders o stubs (con comentarios de "pendiente de implementación").

API

Desarrolla una pequeña API que sirva de puente para invocar los métodos de la clase del instrumento.

La API debe estar en un módulo o paquete (por ejemplo, en src/api/) y contener endpoints para cada funcionalidad del CNT-91.

Los endpoints pueden ser simples y solo retornar mensajes de "función pendiente de implementar".

Interfaz Web (Local)

Crea una parte web que, al ejecutar el código, muestre una página de inicio intuitiva.

Esta página se generará de manera local (por ejemplo, usando Flask) y se abrirá en un navegador web.

La página debe tener enlaces o botones que representen las distintas funciones (inicializar dispositivo, obtener temperatura, medir frecuencia, etc.), sin que realicen acciones reales por el momento.

Estructura de Directorios Sugerida

bash
proyecto-cnt91/
├── README.md
├── requirements.txt
├── setup.py        # o pyproject.toml
└── src/
    ├── instrument/
    │   ├── __init__.py
    │   └── cnt91.py       # Clase CNT91 con métodos placeholders
    ├── api/
    │   ├── __init__.py
    │   └── endpoints.py   # Endpoints de la API (placeholders)
    └── web/
        ├── __init__.py
        └── app.py         # Aplicación web que muestre una starting page (ejecutada localmente)

Notas Adicionales

No implementes la lógica de cada función; deja comentarios o stubs que indiquen "pendiente de implementación".

La aplicación web se ejecutará localmente y deberá abrirse en un navegador para interactuar de forma intuitiva con los botones y enlaces de las funciones.

Asegúrate de que el código tenga comentarios claros que indiquen la intención de cada módulo y función.

Genera el prompt con este nivel de detalle y claridad para que sirva de base a la construcción del proyecto.
```

**Propósito**: Este prompt se utilizó para generar la estructura completa del proyecto, incluyendo:
- La clase del instrumento con sus métodos
- La API con sus endpoints
- La interfaz web con su diseño
- La estructura de directorios completa

## Notas Adicionales
- Los prompts fueron diseñados para obtener una estructura base sin implementación funcional
- Se enfocaron en la organización y claridad del código
- Permiten una implementación gradual de las funcionalidades
- Facilitan la documentación y mantenimiento del proyecto 