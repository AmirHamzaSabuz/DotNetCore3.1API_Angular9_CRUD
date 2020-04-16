import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeList;
  employeeId;
  btnSave = 'Save';
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    });
    this.getEmployeeList();
  }

  onSubmit() {
    if (this.employeeId && this.employeeId > 0) {
      const employeeDataForUpdate = {
        id: this.employeeId,
        name: this.employeeForm.controls.name.value,
        email: this.employeeForm.controls.email.value,
        password: this.employeeForm.controls.password.value
      };
      this.employeeService.updateEmployee(employeeDataForUpdate).subscribe(res => {
        this.getEmployeeList();
        this.employeeForm.reset();
        this.btnSave = 'Save';
        this.employeeId = 0;
      });
    } else {
      this.employeeService.saveEmployee(this.employeeForm.value).subscribe(res => {
        this.getEmployeeList();
        this.employeeForm.reset();
      });
    }
  }

  getEmployeeList() {
    this.employeeService.getAllEmployees().subscribe(data => this.employeeList = data);
  }

  edit(id) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.employeeForm.patchValue(data);
      this.employeeId = id;
      this.btnSave = 'Update';
    });
  }

  delete(id) {
    this.employeeService.deleteEmployee(id).subscribe(res => this.getEmployeeList());
  }

}
