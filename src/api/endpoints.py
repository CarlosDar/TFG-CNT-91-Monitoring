"""
Módulo que contiene los endpoints de la API para el control del CNT-91.
"""

from flask import Blueprint, jsonify, request
from typing import Dict, Any
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from instrument.cnt91 import CNT91

# Crear el Blueprint para la API
api = Blueprint('cnt91_api', __name__)

# Instancia global del instrumento
instrumento = CNT91('GPIB0::10::INSTR')

@api.route('/conectar', methods=['POST'])
def conectar():
    """
    Endpoint para conectar con el dispositivo.
    """
    try:
        # TODO: Implementar conexión real
        return jsonify({"mensaje": "Dispositivo conectado exitosamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/desconectar', methods=['POST'])
def desconectar():
    """
    Endpoint para desconectar el dispositivo.
    """
    try:
        # TODO: Implementar desconexión real
        return jsonify({"mensaje": "Dispositivo desconectado exitosamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/temperatura', methods=['GET'])
def obtener_temperatura():
    """
    Endpoint para obtener la temperatura del dispositivo.
    """
    try:
        # TODO: Implementar lectura real de temperatura
        return jsonify({"temperatura": 25.0})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/frecuencia', methods=['GET'])
def medir_frecuencia():
    """
    Endpoint para medir la frecuencia en un canal específico.
    """
    try:
        canal = request.args.get('canal', 1, type=int)
        # TODO: Implementar medición real de frecuencia
        return jsonify({"frecuencia": 1000.0, "canal": canal})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/configurar-canal', methods=['POST'])
def configurar_canal():
    """
    Endpoint para configurar un canal específico.
    """
    try:
        datos = request.get_json()
        canal = datos.get('canal')
        configuracion = datos.get('configuracion', {})
        # TODO: Implementar configuración real del canal
        return jsonify({"mensaje": f"Canal {canal} configurado exitosamente"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/estado', methods=['GET'])
def obtener_estado():
    """
    Endpoint para obtener el estado actual del dispositivo.
    """
    try:
        # TODO: Implementar obtención real del estado
        return jsonify({
            "conectado": True,
            "temperatura": 25.0,
            "canales_activos": [1, 2, 3, 4]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500 