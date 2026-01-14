import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { WebsocketService } from '../../core/ws/websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-component.html',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private wsService = inject(WebsocketService);
  private router = inject(Router);

  errorMessage = '';
  loading = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.loading) return;

    this.errorMessage = '';
    this.loading = true;

    const { username, password } = this.form.getRawValue();

    this.authService.login({ username, password }).subscribe({
      next: (token: string) => {
        this.authService.save_token(token);
        this.wsService.connect(token);
        this.router.navigate(['/lobby']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Login failed';
        this.loading = false;
      }
    });
  }
}
