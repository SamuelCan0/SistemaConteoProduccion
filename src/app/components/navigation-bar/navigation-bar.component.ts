import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private r:Router, private us:UserService) {}

  ngOnInit(): void {

  }

  logout(){
    this.us.logout()
      .then(()=>{
        this.r.navigate(['/login']);
      })
      .catch(error=>console.log(error));
  }

  Login():boolean{
    if(this.r.url=='/login'){
      return true;
    }
    return false;
  }

  condicion():string{
    let ruta='';
    for (let i = 0; i < this.r.url.length; i++) {
      if(i>=0 && i<9){ruta+=this.r.url[i];}else{break;}
    }
    return(ruta);
  }

}
