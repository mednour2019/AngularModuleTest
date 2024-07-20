import { Component } from '@angular/core';
import { Menu } from './nvbmenu';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  toggleFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  }
  menu = Menu;
}
