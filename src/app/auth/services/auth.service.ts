import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from './../../funcionarios/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string ='http://localhost:8080' //api do spring
  private jet = new JwtHelperService()
  jwt: any;
  constructor(
    private http: HttpClient, //para fazer as requisições http
    private router: Router //importa para poder fazer a rota de voltar para o login
  ) { }

  /* função para chamar o login - vai mandar o token p gente e vai ser guardado no local storage*/
  signIn(user: User): Observable<{ Authorization: string }>{
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, user)
    .pipe(
      tap((response)=>{
        this.armazenarToken(response.Authorization)
      })
    )// tap só serve p consumir o dado q o operador esta lhe enviando e utilizar ele de alguma forma - o token vai chegar no tap e vai armazenar no local storage
  }
  //vai remover token e redirecionar a pessoa para a página de login
  signOut(): void{
    this.removerToken()
    this.router.navigateByUrl('/auth/login')
  }

  //função para armazenar o token
  armazenarToken(token: string): void {
    localStorage.setItem('authorization', token)
  }

  removerToken(): void{
    localStorage.removeItem('authorization')
  }

  recuperarToken(): string | null {
    return localStorage.getItem('authorization')
  }
  //injeta no funcionario os serviços para pegar o token

  logado(): boolean{
    const token =this.recuperarToken()

    if(token == null){
      return false

    }

    return !this.jwt.isTokenExpired(token)
}

}

