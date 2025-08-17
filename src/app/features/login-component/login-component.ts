import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';


@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  private _fb=inject(FormBuilder);
 
  public authService=inject(AuthService);
  loginForm=this._fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });

  login(){ //mor_2314 83r5^_  ou johnd m38rmF$
    const username=this.loginForm.value.name??'';
    const password=this.loginForm.value.password??'';
    this.authService.login(username,password).subscribe((token)=>{
      console.log(token)
      
    });
  }
  logout(){
    this.authService.logout();
  }
}
