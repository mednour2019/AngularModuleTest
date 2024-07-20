import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from '../../models/employee.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseApiUrl=environment.baseApiUrl;

  constructor(private httpClient : HttpClient) { }
  getEmployees(): Observable <employee[]>{
    return  this.httpClient.get<employee[]>(this.baseApiUrl);

     }
}
