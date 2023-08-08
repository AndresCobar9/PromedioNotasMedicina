import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http:HttpClient, public jwtHelper: JwtHelperService, private router:Router) { }
    apiurl='https://api.andrescobar.site'


    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
      
        if (token) {
          // Verifica que el token no haya expirado
          if (this.jwtHelper.isTokenExpired(token)) {
            // El token ha expirado, eliminar las credenciales almacenadas y redirigir al inicio de sesión
            this.logout();
            return false;
          }
          // El token es válido y no ha expirado
          return true;
        }
      
        return false;
      }


      logout() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        localStorage.removeItem('token');
        sessionStorage.clear();
        this.router.navigate(['']);
      }

      login(user:any){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiurl+'/login',user, { headers: headers })
      }

      Proceedregister(inputdata:any){
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiurl + '/register', inputdata , { headers: headers })
      }

      getNotas(user: any, clase: any) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const data = { user: user, clase: clase };
        return this.http.post(this.apiurl + '/notas', data, { headers: headers });
    }

    addNota(inputdata:any){

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(this.apiurl + '/notas/crear', inputdata , { headers: headers })
    }

    Promedio(user: any, clase: any){

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const data = {user: user, clase:clase}
      return this.http.post(this.apiurl + '/notas/promedio', data, { headers: headers })
    }

    editNota(inputdata:any){
        
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiurl + '/notas/editar', inputdata , { headers: headers })
      }
    Nota(id:any){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const data = {id:id}
      return this.http.post(this.apiurl + '/notas/nota', data, { headers: headers })
    }

    deleteNota(id:any){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const data = {id:id}
      return this.http.post(this.apiurl + '/notas/delete', data , { headers: headers })
    }

}
 