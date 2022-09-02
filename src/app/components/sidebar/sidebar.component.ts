import { Version } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, Renderer2, VERSION, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private us:UserService, private r:Router) {

  }


  name="Angular " + VERSION.major;
  @ViewChild("body") body:ElementRef | undefined;
  @ViewChild("modeSwitch") modeSwitch:ElementRef | undefined;
  @ViewChild("toggle") toggle: ElementRef | undefined;
  ocultar(){
    this.toggle?.nativeElement.classList.toggle("close");
  }

  darkmode(){
    console.log(this.body);

    this.body?.nativeElement.classList.toggle("dark")
  }

  ngOnInit(): void {
  }

  Login():boolean{
    if(this.r.url=='/login'){
      return true;
    }
    return false;
  }

  logout(){
    this.us.logout()
      .then(()=>{
        this.r.navigate(['/login']);
      })
      .catch(error=>console.log(error));
  }

}



