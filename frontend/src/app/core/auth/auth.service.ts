import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { TokenStorage } from './token.storage';

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base_url = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient, private token_storage: TokenStorage) {}

  register(payload: AuthRequest): Observable<string> {
    return this.http.post<AuthResponse>(`${this.base_url}/register`, payload).pipe(
      map((res) => res.token)
    );
  }

  login(payload: AuthRequest): Observable<string> {
    return this.http.post<AuthResponse>(`${this.base_url}/login`, payload).pipe(
      map((res) => res.token)
    );
  }

  save_token(token: string): void {
    this.token_storage.set_token(token);
  }

  logout(): void {
    this.token_storage.clear();
  }

  get_token(): string |null  {
    return this.token_storage.get_token();
  }

  is_authenticated(): boolean {
    return this.get_token() !== null;
  }
}
