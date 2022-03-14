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
    this.EmployeeService.postEmployee(form.value).subscribe((res) =>{
      this.resetForm(form);
      M.toast({html: 'saved successfully', classes: 'rounded'});
    }); 
  }

}
