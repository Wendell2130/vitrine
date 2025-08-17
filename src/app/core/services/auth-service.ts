import { inject, Injectable, signal } from '@angular/core';
import { Iuser } from '../../models/user-interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
const URL = "https://fakestoreapi.com/auth/login"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<Iuser | null>(null);
  private _isLoggedIn = signal(false);
  public currentUser = this._currentUser.asReadonly();
  public isLoggedIn = this._isLoggedIn.asReadonly();
  private _router=inject(Router)
  private _http = inject(HttpClient);

  constructor() {

  }

  login(username: string, password: string): Observable<{ token: string } | null> {
    return this._http.post<{ token: string }>(URL, { username, password }).
      pipe(tap((resp: { token: string }) => {
        // console.log(resp.token)
        if (!!resp.token) {
          localStorage.setItem("userToken", resp.token);
          
          this._isLoggedIn.set(true);
          this._router.navigate(['/home']);
        }

      }), catchError((error) => {
        alert('Usuário ou senha não recohecido(s)');
        this._isLoggedIn.set(false);
        localStorage.removeItem("userToken");
        return of(null);
      })
      );
  }

  logout() {
    const confirmed=confirm("Deseja realmente sair?");
    if(confirmed){
      this._isLoggedIn.set(false);
      localStorage.removeItem("userToken");
       this._router.navigate(['/login']);
    }
    
  }
}
