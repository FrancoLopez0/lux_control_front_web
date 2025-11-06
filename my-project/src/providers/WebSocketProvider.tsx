"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserLuxParams } from '@/types/UserLuxParams';
import { LuxValue } from '@/types/LuxValue';
import { FilterValue } from '@/types/FilterValue';
import { PidValue } from '@/types/PidValue';
import { SensorValue } from '@/types/SensorValue';
import { ControlValue } from '@/types/ControlValue';
import axios from 'axios';

interface WebSocketProviderProps{
    children: React.ReactNode;
}

interface WebSocketContextType {
  userParams: UserLuxParams | null;
  luxValue: LuxValue | null;
  filterValue: FilterValue | null;
  pidValue: PidValue | null;
  sensorValue: SensorValue | null;
  controlValue: ControlValue | null;
  isConnected: boolean;
}

// 1. Crear el Contexto
const WebSocketContext = createContext<WebSocketContextType|undefined>(undefined);

// 2. Definir el Estado Inicial
const initialState: WebSocketContextType = {
  userParams: {
    min: 0,
    max: 0,
    setPoint: 0,
    setPointFinal: 0,
    riseTime: 0,
},
  luxValue: {
    lux: 0,
    time: "no time"
  },
  filterValue: {
    q: 0,
    r: 0,
    alpha: 0
  },
  pidValue: {
    kp: 0,
    ki: 0,
    kd: 0
  },
  sensorValue: {
    bh1750: 0,
    temt6000: 0,
    calib: 0
  },
  controlValue:{
    pwm: 0
  },
  isConnected: false,
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  
  const [dataState, setDataState] = useState<WebSocketContextType>(initialState);

  const socketData: WebSocketContextType = dataState;

  useEffect(() => {
    // Reemplaza con tu URL de FastAPI
    const ws = new WebSocket('ws://localhost:8000/ws/status'); 
    
    ws.onopen = () => {
      console.log('WS Conectado.');
      setDataState(prev => ({ ...prev, isConnected: true }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        // console.log('Mensaje WS recibido:', message);

        // La clave de la lógica: usar el campo 'type' del JSON
        switch (message.type) {
          case 'user_params':
            setDataState(prev => ({ ...prev, userParams: message.payload as UserLuxParams }));
            console.log(message.payload);
            break;
          case 'lux_value':
            setDataState(prev => ({ ...prev, luxValue: message.payload as LuxValue }));
            break;
          case 'filter_value':
            setDataState(prev => ({ ...prev, filterValue: message.payload as FilterValue }));
            console.log(message.payload);
            break;
          case 'pid_value':
            setDataState(prev => ({ ...prev, pidValue: message.payload as PidValue }));
            console.log(message.payload);
            break;
          case 'sensors_value':
            setDataState(prev => ({ ...prev, sensorValue: message.payload as SensorValue }));
            console.log(message.payload);
            break;
          case 'control_value':
            setDataState(prev => ({ ...prev, filterValue: message.payload as FilterValue }));
            console.log(message.payload);
            break;
            
          default:
            console.warn('Tipo de mensaje WS desconocido:', message.type);
        }
      } catch (e) {
        console.error('Error al parsear el mensaje WS:', e);
      }
    };

    ws.onclose = () => {
      console.log('WS Desconectado.');
      setDataState(prev => ({ ...prev, isConnected: false }));
    };

    // Función de limpieza al desmontar
    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socketData}>
      {children}
    </WebSocketContext.Provider>
  );
};

// 3. Hook Personalizado para consumir el Contexto
export const useWebSocketData = () => {
    const context = useContext(WebSocketContext);
    
    // Mejor práctica en TS: verificar si el hook se usa fuera del Provider
    if (context === undefined) {
        throw new Error('useWebSocketData debe usarse dentro de un WebSocketProvider');
    }
    
    return context;
};