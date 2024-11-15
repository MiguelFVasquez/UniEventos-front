import { Localidad } from "./Localidad";

export interface CrearEvento{
    nombre: string;
    descripcion: string;
    direccion: string;
    ciudad: string;
    fecha: Date;
    tipo: string;
    imagenPortada: string;
    imagenLocalidades: string;
    localidades: Localidad[];
    imagenPortadaFile?: File; // Archivo seleccionado para portada
    imagenLocalidadesFile?: File; // Archivo seleccionado para localidade
}