"""
Aplicación web para el control del dispositivo CNT-91.
"""

from flask import Flask, render_template, send_from_directory
import os
import webbrowser
from threading import Timer
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api.endpoints import api

app = Flask(__name__)
app.register_blueprint(api, url_prefix='/api')

# Configuración de rutas estáticas
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/')
def index():
    """
    Página principal de la aplicación.
    """
    return render_template('index.html')

def open_browser():
    webbrowser.open('http://127.0.0.1:5000')

if __name__ == '__main__':
    # Desactivamos el modo debug para evitar que se abra el navegador dos veces
    Timer(1, open_browser).start()
    app.run(debug=False) 