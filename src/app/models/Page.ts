export interface Page<T> {
    content: T[];       // Los elementos de la página
    totalPages: number; // Número total de páginas
    totalElements: number; // Número total de elementos
    size: number;       // Tamaño de la página (número de elementos por página)
    number: number;     // Número de la página actual
}