import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;
  previewImage: string = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      department: ['', Validators.required],
      profilePicture: [''],
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(this.employeeId).subscribe((res) => {
        const emp = res.data?.employee;
        if (emp) {
          this.employeeForm.patchValue(emp);
          this.previewImage = emp.profilePicture || '';
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
        this.employeeForm.patchValue({ profilePicture: this.previewImage });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;

      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, formData).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        this.employeeService.addEmployee(formData).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }
}
