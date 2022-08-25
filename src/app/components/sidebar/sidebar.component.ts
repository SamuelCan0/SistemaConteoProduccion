import { Version } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, Renderer2, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {}
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

}



