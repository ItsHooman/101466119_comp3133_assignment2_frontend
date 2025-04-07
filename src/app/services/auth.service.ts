import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:4000/graphql';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    const query = {
      query: `
        mutation {
          login(email: "${credentials.email}", password: "${credentials.password}")
        }
      `
    };

    return this.http.post(this.apiUrl, query);
  }

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    const query = {
      query: `
        mutation {
          signup(username: "${data.name}", email: "${data.email}", password: "${data.password}") {
            id
            username
            email
          }
        }
      `
    };

    return this.http.post(this.apiUrl, query);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
