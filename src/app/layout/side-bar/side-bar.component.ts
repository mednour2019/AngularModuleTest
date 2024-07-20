import { Component } from '@angular/core';
import { Menu } from './sdmenu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menu=Menu;
  mySolutionName='test angular';
  logoSolution='assets/dist/img/AdminLTELogo.png';
  logoalt='solLTE Logo';
  searchText = '';
  filterMenu() {
    this.menu.forEach(item => {
      const subMenu = item.subMenu;
      item.show = false; // Hide the main menu item by default

      subMenu.forEach(sub => {
        if (sub.label.toLowerCase().includes(this.searchText.toLowerCase())) {
          item.show = true; // Show the main menu item if any sub-menu matches
          sub.show = true; // Show the matching sub-menu item
        } else {
          sub.show = false; // Hide the non-matching sub-menu item
        }
      });
    });
  }
  clearInput() {
    this.searchText = ''; // Clear the input field
    // Reset the 'show' property for all menu items and sub-menu items
    this.menu.forEach(item => {
      item.show = true; // Show the main menu item by default
      item.subMenu.forEach(sub => {
        sub.show = true; // Show all sub-menu items by default
      });
    })
  }

}
