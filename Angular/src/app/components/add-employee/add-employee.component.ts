import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  dob: Date;
  skills: SelectItem[] = [];
  selectedSkills: any[] = [];
  employee: any = {};
  constructor(private employeeService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.employeeService.getSkills().subscribe((skills: any) => {
      this.skills = skills;
    });
    this.employee.id = this.route.snapshot.params['id'];
    if (this.employee.id != '0') {
      this.employeeService.getEmployeeById(this.employee.id).subscribe((res: any) => {
        this.dob = new Date(res.dob);
        this.employee = res;
      })
    }
  }
  addEmployee() {
    if (this.employee.name && this.employee.dob && this.employee.salary && this.employee.selectedSkills&&this.employee.selectedSkills.length){
      this.employeeService.addEmployee(this.employee).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: res.message });
        this.router.navigate(['/employees'])
      });
    }else{
      this.messageService.add({severity:'error',summary:'Please fill all the mandatory fields'});
    }
      
  }
}
