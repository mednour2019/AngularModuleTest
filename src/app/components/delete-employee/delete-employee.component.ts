import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css',
})
export class DeleteEmployeeComponent {
  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>) {}
  /**
   * Confirms the action and closes the dialog, returning true.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
