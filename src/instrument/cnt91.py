"""
Módulo para el control del dispositivo CNT-91 mediante conexión GPIB.
"""

import pyvisa
from typing import Optional, Union, Dict, Any
from pyvisa.highlevel import ResourceManager

class CNT91:
    """
    Clase para controlar el dispositivo CNT-91.
    """
    
    def __init__(self, address='GPIB0::10::INSTR'):
        """
        Inicializa la conexión con el dispositivo.
        
        Args:
            address (str): Dirección GPIB del dispositivo.
        """
        rm = ResourceManager()
        self.dev = rm.open_resource(address)
        
        self.dev.write('*IDN?')
        resposta = self.dev.read()
        self.device_name = resposta.strip()  # Guardamos el nombre del dispositivo
        
        print('Communication established with GSE-UIB ' + self.device_name)
        
    def conectar(self) -> bool:
        """
        Establece la conexión con el dispositivo.
        
        Returns:
            bool: True si la conexión fue exitosa, False en caso contrario
        """
        # TODO: Implementar conexión GPIB
        return True
    
    def desconectar(self) -> None:
        """
        Cierra la conexión con el dispositivo.
        """
        # TODO: Implementar desconexión
        pass
    
    def obtener_temperatura(self) -> float:
        """
        Obtiene la temperatura actual del dispositivo.
        
        Returns:
            float: Temperatura en grados Celsius
        """
        self.dev.write(':SYST:TEMP?')
        temp = self.dev.read()
        return float(temp)
    
    def medir_frecuencia(self, canal: int = 1) -> float:
        """
        Mide la frecuencia en el canal especificado.
        
        Args:
            canal (int): Número de canal (1-4)
            
        Returns:
            float: Frecuencia medida en Hz
        """
        # TODO: Implementar medición de frecuencia
        return 1000.0
    
    def configurar_canal(self, canal: int, configuracion: Dict[str, Any]) -> None:
        """
        Configura los parámetros de un canal específico.
        
        Args:
            canal (int): Número de canal (1-4)
            configuracion (dict): Diccionario con los parámetros a configurar
        """
        # TODO: Implementar configuración de canal
        pass
    
    def obtener_estado(self) -> Dict[str, Any]:
        """
        Obtiene el estado actual del dispositivo.
        
        Returns:
            dict: Diccionario con el estado del dispositivo
        """
        # TODO: Implementar obtención de estado
        return {
            "conectado": True,
            "temperatura": self.obtener_temperatura(),
            "canales_activos": [1, 2, 3, 4]
        } 