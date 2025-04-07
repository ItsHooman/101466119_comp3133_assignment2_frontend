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
          login(email: "${credentials.email}", password: "${credentials.password}") {
            token
            user {
              id
              email
              name
            }
          }
        }
      `,
    };

    return this.http.post(this.apiUrl, query);
  }

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    const query = {
      query: `
        mutation {
          signup(name: "${data.name}", email: "${data.email}", password: "${data.password}") {
            token
            user {
              id
              email
              name
            }
          }
        }
      `,
    };

    return this.http.post(this.apiUrl, query);
  }

  // ✅ Store token (you might already do this in login component)
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // ✅ Get token for auth headers (if needed later)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Check login state
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ✅ Clear session
  logout(): void {
    localStorage.removeItem('token');
  }
}
