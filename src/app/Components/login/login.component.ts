import { Component,ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/Model/Usuario-model';
import { UsuarioService } from 'src/app/Service/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent {
  listUsuario: UsuarioModel[]=[];
  
  constructor(private router: Router,private usuarioService:UsuarioService) { }
  
   abrirArchivo() {
    this.router.navigate(['/RegistroProducto']);
    }
    logear() {
      const usuario = document.getElementById('Correo') as HTMLInputElement;
      const contraseña = document.getElementById('Contraseña') as HTMLInputElement;
    
      try {
        this.usuarioService.getUsuario(usuario.value).subscribe(
          (resp: any) => {
            if (resp) {
              this.listUsuario = resp.map((item: any) => {
                return {
                  id_usuario: item.id_usuario,
                  contraseña: item.contraseña,
                  nombre: item.nombre,
                  apellido: item.apellido,
                  dni: item.dni,
                  telefono: item.telefono,
                  rol: item.rol,
                };
              });
              let Usuario: UsuarioModel;
              Usuario = this.listUsuario[0];
    
              if (contraseña.value === Usuario.contraseña) {
                this.abrirArchivo();
              } else {
                console.log("No se encontró el usuario");
              }
            }
          },
          (error: any) => {
            console.error("Error al procesar el usuario:", error);
            
          }
        );
      } catch (error) {
        console.error("Error al llamar a getUsuario:", error);
        
      }
    }
    
}
