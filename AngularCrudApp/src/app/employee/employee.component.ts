import { EmployeeService } from './../shared/employee.service';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public EmployeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  onEdit(emp: Employee){
    this.EmployeeService.selectedEmployee = emp;
  }
  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.EmployeeService.selectedEmployee={
      _id:"",
      name:"",
      position:"",
      office:"",
      salary:null
    }
  }
  onSubmit(form: NgForm) {
    if(form.value._id==""){
      this.EmployeeService.postEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'saved successfully', classes: 'rounded'});
      });
    }
    else{
      this.EmployeeService.putEmployee(form.value).subscribe((res) =>{
        this.resetForm(form);
        M.toast({html: 'Updated successfully', classes: 'rounded'});
      });    
    }
     
  }
  onDelete(_id:String, form:NgForm){
    if(confirm('Confirm for deletion')==true){
    this.EmployeeService.deleteEmployee(_id).subscribe((res) =>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html: 'Deleted successfully', classes: 'rounded'});
    }); 
    } 
    }
  refreshEmployeeList(){
  this.EmployeeService.getEmployeeList().subscribe((res) => {
    this.EmployeeService.employees = res as Employee[];
  });

}
}
