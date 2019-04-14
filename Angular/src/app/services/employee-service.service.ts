import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  _getSkills: string = environment.employee_api + 'getAllSkills';
  _addEmployee: string = environment.employee_api + 'addEmployee';
  _getAllEmployees: string = environment.employee_api + 'getAllEmployees';
  _getEmpById: string = environment.employee_api + 'getEmpById/';
  _deleteEmp: string = environment.employee_api + 'deleteEmp/';
  constructor(private http: HttpClient) { }

  getSkills() {
    return this.http.get(this._getSkills);
  }

  addEmployee(employee: any) {
    return this.http.post(this._addEmployee, employee);
  }

  getAllEmployees() {
    return this.http.get(this._getAllEmployees);
  }

  getEmployeeById(employeeId: string): any {
    return this.http.get(this._getEmpById + employeeId);
  }
  
  deleteEmp(employeeId: string): any {
    return this.http.get(this._deleteEmp + employeeId);
  }
}
