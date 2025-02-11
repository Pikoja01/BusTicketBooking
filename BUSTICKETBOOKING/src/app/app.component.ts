import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BUSTICKETBOOKING';

  isLoginForm: boolean = true;

  masterSrv = inject(MasterService)
  loggedUserData: any

  registerObject: any = {
    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  }
  logIn: any = {
    "userName": "",
    "password": ""
  }

  constructor() {
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('redBusUser');
      if (localUser != null) {
        this.loggedUserData = JSON.parse(localUser);
      }
    }
  }
  

  openModel(){
    const model = document.getElementById("myModal");
    if(model != null){
      model.style.display = "block"
    }
  }

  closeModel(){
    const model = document.getElementById("myModal");
    if(model != null){
      model.style.display = "none"
    }
  }

  onRegister() {
    this.masterSrv.onRegisterUser(this.registerObject).subscribe(
      (res: any) => {
        alert('User Registered Successfully');
        if (typeof window !== 'undefined') {
          localStorage.setItem('redBusUser', JSON.stringify(res.data));
          console.log(res)
        }
        this.loggedUserData = res.data;
        this.closeModel();
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  onLogin(){
    this.masterSrv.onLoginUser(this.logIn).subscribe(
      (res: any) => {
        alert('User Logged In Successfully');
        if (typeof window !== 'undefined') {
          localStorage.setItem('redBusUser', JSON.stringify(this.logIn));
          console.log(res)
        }
        this.loggedUserData = this.logIn;
        this.closeModel();
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }


  logOff(){
    localStorage.removeItem('redBusUser');
    this.loggedUserData = undefined;
    console.log("zorz")
  }
}
