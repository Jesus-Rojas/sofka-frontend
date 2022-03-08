export interface Intento {
    id: number;
    intentos_id: number;
    preguntas: Preguntas;
    preguntas_id: number;
    rondas: Ronda;
    rondas_id: number;
}

export interface Ronda {
    id: number;
    nombre: string;
}

export interface Preguntas {
    id: number;
    nombre: string;
    opciones: Opciones[];
}

export interface Opciones {
    id: number;
    nombre: string;
    preguntas_id: number;
    disabled?: boolean;
}

export interface Respuesta {
    termino: boolean;
    res?: boolean;
    pregunta?: Intento;
}