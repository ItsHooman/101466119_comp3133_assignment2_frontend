import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ required for standalone components
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
          const user = res.data?.signup;
          if (user) {
            // ✅ Signup success — redirect to login instead of expecting token
            this.router.navigate(['/login']);
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
