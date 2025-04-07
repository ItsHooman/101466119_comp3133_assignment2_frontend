import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ add these!
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res) => {
          const token = res.data?.signup?.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/employees']);
          } else {
            this.error = 'Signup failed.';
          }
        },
        error: () => {
          this.error = 'Signup failed.';
        },
      });
    }
  }
}
