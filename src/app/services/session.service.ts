import { Injectable } from '@angular/core';
import { Login } from '../common/Login';
import jwt_decode from 'jwt-decode';
import { Email } from '../common/Email';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  login!: Login;
  data!: any;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): any {
    if (this.isTokenExpired()) {
      this.signOut();
      return null;
    }
    try {
      const email: Email = jwt_decode(String(this.getToken())) as Email;
      return email.sub;
    } catch (Error) {
      return null;
    }
  }
  

  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    }
    return true;
  }
  
}
