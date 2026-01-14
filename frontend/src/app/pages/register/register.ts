import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { WebsocketService } from '../../core/ws/websocket.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
})
export class RegisterComponent {

  errorMessage = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private wsService: WebsocketService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.errorMessage = '';

    const { username, password } = this.form.getRawValue();

    this.authService.register({ username, password }).subscribe({
      next: (token: string) => {
        this.authService.save_token(token);
        this.wsService.connect(token);
        this.router.navigate(['/lobby']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Registration failed';
      }
    });
  }
}
