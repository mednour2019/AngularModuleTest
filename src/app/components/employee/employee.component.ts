import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../../services/employee/employee.service';
import { employee } from '../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { SharedMethodsService } from '../../services/shared-services/shared-methods.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [DatePipe]
})
export class EmployeeComponent {
  employees: employee[] = [];
  /*displayedColumns: string[] = [
    'address',
    'firstName',
    'lastName',
    'age',
    'contactNumber',
    'dob',
    'email',
    'salary',
    'experience',
    'imageUrl',
    'action'
  ];*/
  // column for my table
  allColumns: string[] = ['firstName',
    'lastName', 'address', 'age', 'contactNumber',
    'dob', 'email', 'salary', 'experience','education','gender','company','package', 'imageUrl',
     'action'];
     displayedColumns: string[] = [...this.allColumns.slice(0, 7), this.allColumns[this.allColumns.length - 2],this.allColumns[this.allColumns.length - 1]]; // Initialize with first 7 columns, the before last and the last item

  dataSource: MatTableDataSource<employee> = new MatTableDataSource<employee>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  paginatorBackgroundColor = '#797d6c26';
  paginatorTextColor = '#3f51b5';
    constructor(private employeeService: EmployeeService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private sharedMethodService: SharedMethodsService) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }
  // simulate my condition pruposed  by :me if url not defined or not coming for path my angular project : assets/dist/img alors make default background image
  isValidImageUrl(url: string): boolean {
    return (url !== null && url !== undefined && url.startsWith('assets'));
  }

  getImageUrl(imageUrl: string): string {
    return this.isValidImageUrl(imageUrl) ? imageUrl : this.defaultImageUrl;
  }
  defaultImageUrl = 'assets/dist/img/AvatarTest.png';
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (successResponse) => {
        console.log(successResponse);
       this.employees = successResponse;
        this.dataSource = new MatTableDataSource<employee>(this.employees);
        console.log('employeess', this.employees);

      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }
  // search filter input
  filterEmployees() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  formatEmployeeDOB(dob: any): string {
    // Check if the value is null or undefined
    if (dob === null || dob === undefined) {
      return 'Invalid date'; // Return empty string for null or undefined
    }

    // Check if the value is a valid date
    if (typeof dob === 'string' && isNaN(Date.parse(dob))) {
      return 'Invalid Date'; // Return empty string for invalid date string
    }

    var date = new Date(dob);
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Return empty string for invalid date
    }

    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }

  openDialog(): void {
    // initialoize my dilaog here
    var dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
    //  width: '1000px',
     // height:'500px',
      position: { top: '5%' },
    // panelClass: 'custom-dialog-container'
    panelClass: 'custom-dialog-container'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result',result);
      if (result) {
        this.addEmployee(result);
      }
    });
  }
  // add employee to teh table functionnality
  addEmployee(employee: employee): void {
    var data = this.dataSource.data;
    console.log("dataaaaa",data);
    data.push(employee);
    this.dataSource.data = data;
    this.sharedMethodService.showSnackbar('Employee Added Succefully','Success','succ-snackbar');

  }

  selectedRow: any;

  selectRow(row: any) {
    this.selectedRow = row;
  }
  openConfirmDialog(id: number): void {
    var dialogRef = this.dialog.open(DeleteEmployeeComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteElement(id);
      }
    });
  }
// delete line from table
  deleteElement(id: number): void {
    var filteredData = this.dataSource.data.filter((item: any) => item.id !== id);
    this.dataSource.data = filteredData;
    this.sharedMethodService.showSnackbar('Employee Removed Succefully','Success','succ-snackbar');

   }
   toggleColumn(event: any, column: string): void {
    var isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.displayedColumns.push(column);
    } else {
      this.displayedColumns = this.displayedColumns.filter(c => c !== column);
    }
    this.sortDisplayedColumns();

  }
  // whecn check or uncheck item from checkbox list ensure the original order of column in displayed columns array
  sortDisplayedColumns(): void {
    this.displayedColumns.sort((a, b) => this.allColumns.indexOf(a) - this.allColumns.indexOf(b));
  }
  // check phoen validity
  checkPhone(contactNumber: string): string {
    if (!contactNumber || contactNumber.trim() === '') {
      return '';
    } else if (!/^[\d\s\-\(\)]+$/.test(contactNumber)) {
      return 'Invalid Phone';
    } else {
      return contactNumber;
    }
  }

  // check email validity
  checkEmail(email: string): string {
    if (!email || email.trim() === '') {
      return '';
    } else if (!email.includes('@')) {
      return 'Invalid Email';
    } else {
      return email;
    }
  }


}
