import { inject, Injectable, signal } from '@angular/core';
import { Iuser } from '../../models/user-interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
const URL_TOKEN = "https://fakestoreapi.com/auth/login";
const URL_USERS = "https://fakestoreapi.com/users";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<Iuser | null>(null);
  private _isLoggedIn = signal(false);
  public currentUser = this._currentUser.asReadonly();
  public isLoggedIn = this._isLoggedIn.asReadonly();

  private _router = inject(Router)
  private _http = inject(HttpClient);

  constructor() {

  }

  login(username: string, password: string): Observable<{ token: string } | null> {
    return this._http.get<Iuser[]>(URL_USERS).pipe( //procura o usuario e seta o estado global
      map((users) => users.find(u => u.username == username && u.password == password) || null),
      switchMap((user) => {
        if (!user) {
          alert('Usuário não encontrado');
          return of(null);
        }
        this._currentUser.set(user);
        // POST Faz o login para pegar o token
        return this._http.post<{ token: string }>(URL_TOKEN, { username, password }).
          pipe(
            map(resp => {
              if (resp && resp.token) {

                localStorage.setItem("token", resp.token);

                this._isLoggedIn.set(true);
                this._router.navigate(['/home']);

                return { token: resp.token };
              }
              return null;
            }), catchError((error) => {
              alert('Usuário ou senha não recohecido(s)');
              this._isLoggedIn.set(false);
              localStorage.removeItem("userToken");
              return of(null);
            }))
      }

      ));



  }

  logout() {
    const confirmed = confirm("Deseja realmente sair?");
    if (confirmed) {
      this._isLoggedIn.set(false);
      this._currentUser.set(null);
      localStorage.removeItem("token");
      this._router.navigate(['/login']);
    }

  }
}
