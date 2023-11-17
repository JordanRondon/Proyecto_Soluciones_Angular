import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
  abrirMenu() {
    const barraMenuAbierto = document.getElementById('barra-menu') as HTMLElement;
    const menuicono = document.getElementById('menu-icon') as HTMLElement;
    if (barraMenuAbierto.style.width === "0px") {
        menuicono.style.fontSize = "0px";
        barraMenuAbierto.style.width = "300px";
    } else {
        barraMenuAbierto.style.width = "0px";
        menuicono.style.fontSize = "35px";
    }
  }
}
