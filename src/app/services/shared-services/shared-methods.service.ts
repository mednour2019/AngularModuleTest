import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SharedMethodsService {
  constructor(private snackbar: MatSnackBar) {}
  showSnackbar(message: any, action: any, panelClass: any) {
    // Customize snackbar appearance and behavior
    var config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top', // 'top' | 'bottom'
      panelClass: panelClass,
    };
    this.snackbar.open(message, action, config);
  }
}
