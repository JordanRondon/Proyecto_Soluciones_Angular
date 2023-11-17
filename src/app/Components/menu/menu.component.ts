import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoModel } from 'src/app/Model/Producto-model';
import { ProductoService } from 'src/app/Service/producto.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit{
  listProducto: ProductoModel[]=[];
  constructor(private productoService: ProductoService){

  }
  ngOnInit(): void {
    this.list();
  }
  base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const uint8Array = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  }
  uint8ArrayToImageUrl(uint8Array: Uint8Array): string | null {
    if (uint8Array && uint8Array.length > 0) {
      const blob = new Blob([uint8Array], { type: 'image/png' }); 
      return URL.createObjectURL(blob);
    }
    return null;
  }
  list() {
    this.productoService.getProducto().subscribe((resp: any) => {
      if (resp) {
        this.listProducto = resp.map((item: any) => {
          return {
            id_producto: item.id_producto,
            nombre: item.nombre,
            descripcion: item.descripcion,
            precio_unitario: item.precio_unitario,
            imagen: this.base64ToUint8Array(item.imagen),
            id_producto_categoria: item.id_producto_categoria
          };
        });
      }
    });
  }
}
