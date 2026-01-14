import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { WebsocketService } from '../../core/ws/websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss']
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private wsService = inject(WebsocketService);
  private router = inject(Router);

  // Signals for reactive state
  errorMessage = signal('');
  loading = signal(false);

  // Reactive form
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async submit(): Promise<void> {
    if (this.form.invalid || this.loading()) return;

    this.errorMessage.set('');
    this.loading.set(true);

    const { username, password } = this.form.getRawValue();

    try {
      const token = await this.authService.login({ username, password }).toPromise();

if (!token) {
  throw new Error('Login did not return a token');
  
}

this.authService.save_token(token);


      // Wait for WebSocket to connect
      await this.wsService.connect(token);
      console.log('WebSocket connected, navigating to lobby');
      this.router.navigate(['/lobby']);

    } catch (err: any) {
      console.error('Login error:', err);
      this.errorMessage.set(err?.error?.message ?? 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}
