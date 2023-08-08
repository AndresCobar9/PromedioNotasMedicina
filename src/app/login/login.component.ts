import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userdata: any 
  token:any;
  isLoggedIn: boolean = false; // agregado
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router:Router){
    this.token = localStorage.getItem('token')
  }
  
  loginform=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  })
  
proceedlogin() {
  if (this.loginform.valid) {
    this.service.login(this.loginform.value).subscribe(res => {
      console.log(res);
      this.userdata = res;
      console.log(this.userdata);
      
      if (this.userdata.error) {
        if (this.userdata.error === 'Credenciales incorrectas') {
          this.toastr.error('Credenciales incorrectas', 'Datos inválidos');
        }
      } else if (this.userdata.token) {
        this.token = this.userdata.token;
        localStorage.setItem('token', this.token);
        sessionStorage.setItem('username', this.userdata.identity.username);
        sessionStorage.setItem('name', this.userdata.identity.name);
        sessionStorage.setItem('area', this.userdata.identity.area);
        sessionStorage.setItem('userrole', this.userdata.identity.userrole);
        this.isLoggedIn = this.service.isLoggedIn();
        this.router.navigate(['portal']);
        this.toastr.success('Login Correcto');
      }
    });
  } else {
    for (const field in this.loginform.controls) {
      const control = this.loginform.get(field);
      if (control && control.errors) {
        console.log(`Campo ${field} inválido: `, control.errors);
      }
    }
    this.toastr.warning('Rellena todos los datos', '');
  }
}



}
