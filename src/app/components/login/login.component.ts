import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private readonly notifier: NotifierService;


  constructor(notifierService: NotifierService, private us:UserService, private r:Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  loginProcess(result:any){
    if(result.email=="" || result.password==""){
      this.notifier.show({
        type: 'warning',
        message: 'Datos Faltantes',
      });
    }else{
      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(result.email)) {
        this.us.login(result).then(
          res=>{
            this.notifier.show({
              type: 'success',
              message: 'Bienvenido',
            });
            this.r.navigate(['/dashboard']);
          }
        )
        .catch(error=>{
          this.notifier.show({
            type: 'error',
            message: 'Correo o Contraseña Incorrectos',
          });
        });
      } else {
        this.notifier.show({
          type: 'warning',
          message: 'Utilize Una Direccion de Correo Valida',
        });
      }
    }
  }


}
