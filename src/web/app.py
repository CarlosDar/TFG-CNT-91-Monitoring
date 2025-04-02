"""
Aplicación web para el control del dispositivo CNT-91.
"""

from flask import Flask, render_template, send_from_directory
import webbrowser
import os
from ..api.endpoints import api

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def index():
    """
    Página principal de la aplicación.
    """
    return render_template('index.html')

@app.route('/static/<path:path>')
def send_static(path):
    """
    Sirve archivos estáticos (CSS, JS, etc.).
    """
    return send_from_directory('static', path)

def iniciar_app():
    """
    Inicia la aplicación web y abre el navegador.
    """
    # Abrir el navegador solo una vez
    webbrowser.open('http://localhost:5000')
    # Desactivar el modo debug para evitar el doble despliegue
    app.run(debug=False)

if __name__ == '__main__':
    iniciar_app() 