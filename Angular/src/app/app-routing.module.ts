import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';


const routes: Routes = [{ path: 'addEmployee/:id', component: AddEmployeeComponent },
{ path: 'employees', component: EmployeesComponent },
{ path: '', redirectTo: '/employees', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
