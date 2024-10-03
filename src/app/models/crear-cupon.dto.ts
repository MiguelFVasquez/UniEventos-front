// model/editar-cupon.dto.ts
export interface CrearCuponDTO {
    nombre: string;
    descuento: number;
    fechaVencimiento: string; // Asegúrate de que el formato coincida con el que espera el backend
    codigo: string;
    tipo: string;
  }
  