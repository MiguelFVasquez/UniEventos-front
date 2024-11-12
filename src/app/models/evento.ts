export interface Localidad {
    nombre: string;
    precio: number;
    entradasVendidas: number;
    capacidadMaxima: number;

}

export interface Evento {
    id: string; // Asumiendo que el evento tiene un ID único
    nombre: string;
    descripcion: string;
    direccion: string;
    ciudad: string;
    fecha: Date; // Puedes usar Date o string, dependiendo de cómo se maneje en tu API
    estado: string; // Asumiendo que 'EstadoEvento' es un string
    tipo: string; // Asumiendo que 'TipoEvento' es un string
    imagenPortada: string;
    imagenLocalidades: string;
    localidades: Localidad[];
    promedioCalificaciones: number;
}
  