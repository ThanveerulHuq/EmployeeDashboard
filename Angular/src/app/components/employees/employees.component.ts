import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:any[]=[];
  @ViewChild('dt') _table:any;

  constructor(private employeeService:EmployeeServiceService,
    private router:Router,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit() {
    this._table.filterConstraints['date'] = (value, filter): boolean => {
      // Make sure the value and the filter are Dates
      value=new Date(value)
      return value.getDate() == filter.getDate() && value.getMonth() == filter.getMonth() && value.getYear() == filter.getYear() ;
      }
    this.getData();
  }
  getData(){
    this.employeeService.getAllEmployees().subscribe((res:any)=>{
      this.employees=res;
    });
  }

  editEmployee(id:string){
    this.router.navigate(['addEmployee',id])
  }

  deleteEmployee({name,id}){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${name} ?`,
      accept: () => {
          this.employeeService.deleteEmp(id).subscribe(res=>{
            this.messageService.add({severity:'success',summary:res.message});
            this.getData();
          });
      }
  });
  }

}
