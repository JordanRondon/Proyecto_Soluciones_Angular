import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { ProductoComponent } from './Components/producto/producto.component';

const routes: Routes = [
  {path:'',redirectTo:'/RegistroProducto',pathMatch:'full'},
  {path:'home',component:LandingComponent},
  {path:'Login',component:LoginComponent},
  {path:'Menu',component:MenuComponent},
  {path:'RegistroProducto',component:ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
