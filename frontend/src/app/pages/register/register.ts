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
  styleUrls:['./register.scss']
})
export class RegisterComponent {

  errorMessage = '';
  loading = false;
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
    if (this.form.invalid || this.loading) return;

    this.errorMessage = '';
    this.loading = true;

    const { username, password } = this.form.getRawValue();

    this.authService.register({ username, password }).subscribe({
      next: async (token: string) => {
        this.authService.save_token(token);
        
        try {
          // Wait for WebSocket to connect before navigating
          await this.wsService.connect(token);
          console.log('WebSocket connected, navigating to lobby');
          this.router.navigate(['/lobby']);
        } catch (error) {
          console.error('WebSocket connection failed:', error);
          this.errorMessage = 'Registered but WebSocket failed. Please login.';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = err?.error?.message ?? 'Registration failed';
        this.loading = false;
      }
    });
  }
}