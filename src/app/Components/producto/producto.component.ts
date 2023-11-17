import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoModel } from 'src/app/Model/Producto-model';
import { ProductoService } from 'src/app/Service/producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  listProducto: ProductoModel[]=[];
  formProducto: FormGroup= new FormGroup({});
  isUpdate: boolean=false;
  public imagenSrc: string | null = null;

  constructor(private productoService: ProductoService){

  }
  ngOnInit(): void {
    this.list();
    this.formProducto = new FormGroup({
      id_producto: new FormControl(''),
      nombre: new FormControl(''),
      descripcion:  new FormControl(''),
      precio_unitario: new FormControl(''),
      imagen: new FormControl(''),
      id_producto_categoria: new FormControl('')
    });
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
  ProductoNuevo(){
    this.isUpdate = false;
    this.formProducto.reset();
  }
  selectItem(item:any){
    this.isUpdate = true;
    this.formProducto.controls['id_producto'].setValue(item.id_producto);
    this.formProducto.controls['nombre'].setValue(item.nombre);
    this.formProducto.controls['descripcion'].setValue(item.descripcion);
    this.formProducto.controls['precio_unitario'].setValue(item.precio_unitario);
    this.formProducto.controls['id_producto_categoria'].setValue(item.id_producto_categoria);
  }
  save(){
    const formData = new FormData();
    const nombre = document.getElementById('nombre') as HTMLInputElement;
    const descripcion = document.getElementById('descripcion') as HTMLInputElement;
    const precio_unitario = document.getElementById('precio_unitario') as HTMLInputElement;
    const id_producto_categoria = document.getElementById('id_producto_categoria') as HTMLInputElement;
    const fileInput = document.getElementById('imagen') as HTMLInputElement; 
    formData.append('nombre', nombre.value); 
    formData.append('descripcion', descripcion.value); 
    formData.append('precio_unitario', precio_unitario.value); 
    formData.append('id_producto_categoria', id_producto_categoria.value); 
    

    if (fileInput) {
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('imagen', fileInput.files[0]);
      } else {
        console.error("No se seleccionó ningún archivo");
      }
    } 
    else {
      console.error("No se encontró el elemento con el ID 'inputImagen'");
    }
    this.productoService.saveProducto(formData).subscribe(resp=>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }
  update(){
    const formData = new FormData();
    const id_producto = document.getElementById('id_producto') as HTMLInputElement;
    const nombre = document.getElementById('nombre') as HTMLInputElement;
    const descripcion = document.getElementById('descripcion') as HTMLInputElement;
    const precio_unitario = document.getElementById('precio_unitario') as HTMLInputElement;
    const id_producto_categoria = document.getElementById('id_producto_categoria') as HTMLInputElement;
    const fileInput = document.getElementById('imagen') as HTMLInputElement;
    formData.append('id_producto', id_producto.value); 
    formData.append('nombre', nombre.value); 
    formData.append('descripcion', descripcion.value); 
    formData.append('precio_unitario', precio_unitario.value); 
    formData.append('id_producto_categoria', id_producto_categoria.value); 
    

    if (fileInput) {
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('imagen', fileInput.files[0]);
      } else {
        console.error("No se seleccionó ningún archivo");
      }
    } 
    else {
      console.error("No se encontró el elemento con el ID 'inputImagen'");
    }
    this.productoService.updateProducto(formData).subscribe(resp=>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }
  /*
  update(){
    this.productoService.updateProducto(this.formProducto.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formProducto.reset();
      }
    });
  }
  */
  delete2(id:any){
    this.productoService.deleteProducto(id).subscribe(resp=>{
      if(resp){
        this.list();
      }
    });
  }
}
