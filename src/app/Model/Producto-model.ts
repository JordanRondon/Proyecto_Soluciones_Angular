export class ProductoModel{
    
    id_producto: number=0;
    nombre: string = '';
    descripcion:  string = '';
    precio_unitario: number=0;
    imagen: Uint8Array | null = null;
    id_producto_categoria: number=0;
}