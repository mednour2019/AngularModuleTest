import { Component } from '@angular/core';
import { Param } from './footerParam';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentDate: Date = new Date();
  param=Param
  constructor() { }
}
