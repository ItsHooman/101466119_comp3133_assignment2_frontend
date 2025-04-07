import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ✅ added Router
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service'; // ✅ added AuthService

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  allEmployees: any[] = [];
  departments: string[] = [];
  positions: string[] = [];

  selectedDepartment: string = '';
  selectedPosition: string = '';

  loading = true;
  error: any;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,     // ✅ inject
    private router: Router                // ✅ inject
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.allEmployees = res.data?.employees || [];
        this.employees = [...this.allEmployees];

        this.departments = [...new Set(this.allEmployees.map(e => e.department))];
        this.positions = [...new Set(this.allEmployees.map(e => e.position))];
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }

  filterEmployees(): void {
    this.employees = this.allEmployees.filter(emp => {
      return (!this.selectedDepartment || emp.department === this.selectedDepartment) &&
             (!this.selectedPosition || emp.position === this.selectedPosition);
    });
  }

  resetFilters(): void {
    this.selectedDepartment = '';
    this.selectedPosition = '';
    this.employees = [...this.allEmployees];
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(emp => emp.id !== id);
        this.allEmployees = this.allEmployees.filter(emp => emp.id !== id);
      });
    }
  }

  // ✅ Add logout function
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
