import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css'],
})
export class AddEmployeeDialogComponent {
  employeeForm: FormGroup;
  isUploading: boolean = false;
  countries: string[] = ['USA', 'Canada', 'Mexico'];

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private fb: FormBuilder
  ) {
    // Initialize the form with validators
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      imageUrl: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: [
        '',
        [Validators.required, Validators.min(700), Validators.max(120000)],
      ],
      gender: ['', Validators.required],
      company: ['', Validators.required],
      package: ['', Validators.required],
      education: ['', Validators.required],
      experience: ['', Validators.required],
      address: ['', Validators.required],
    });
    // Subscribe to form value changes to update the address field
    this.employeeForm.valueChanges.subscribe((values) => {
      var address = `${values.street}, ${values.city}, ${values.country}`;
      this.employeeForm.patchValue({ address: address }, { emitEvent: false });
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    var currentPhone = String(this.employeeForm.get('contactNumber')?.value);
    var updatedPhone = currentPhone.startsWith('(555)')
      ? currentPhone
      : `(555)${currentPhone}`;

    this.employeeForm.patchValue({ contactNumber: updatedPhone });
    var street = this.employeeForm.get('street')?.value;
    var city = this.employeeForm.get('city')?.value;
    var country = this.employeeForm.get('country')?.value;
    var address = `${street}, ${city}, ${country}`;
    // console.log('Form Validity:', this.employeeForm.valid);
    // console.log('Is Uploading:', this.isUploading);
    //debugger
    this.employeeForm.patchValue({ address: address });
    if (this.employeeForm.valid && !this.isUploading) {
      console.log('Form is valid and not uploading');
      console.log('Form Values:', this.employeeForm.value);
      this.dialogRef.close(this.employeeForm.value);
    } else {
      console.log('Form is invalid or still uploading');
    }
  }
  /**
   * Handles the file input change event.
   * Uploads the selected file only from assets/dist/img  angular project path and updates the imageUrl field in the form.
   *
   * @param event - The file input change event.
   */
  async onFileChange(event: Event): Promise<void> {
    var input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var file = input.files[0];
      this.isUploading = true;
      console.log('Uploading file:', file.name);
      var imageUrl = await this.uploadFile(file);
      this.isUploading = false;
      console.log('File uploaded, URL:', imageUrl);

      this.employeeForm.patchValue({ imageUrl: imageUrl });
      this.employeeForm.get('imageUrl')?.markAsTouched();
      this.employeeForm.get('imageUrl')?.updateValueAndValidity();
    }
  }
  /**
   * Simulates file upload by returning a URL after a delay.
   *
   * @param file - The file to be uploaded.
   * @returns A promise that resolves to the URL of the uploaded file.
   */

  async uploadFile(file: File): Promise<string> {
    var url = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`assets/dist/img/${file.name}`);
      }, 1000);
    });
    return url;
  }
}
