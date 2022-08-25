import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';
import { AreasService } from 'src/app/services/areas.service';
import { Area } from "../../models/area.model";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  areas:any[]=[];
  numMaq:any[]=[];

  constructor(private as:AreasService) {}

  ngOnInit(): void {
    this.obtenerAreas();
  }

  obtenerAreas():void{
    this.as.getAreas().subscribe(data=>{
    this.areas=[];
    this.numMaq=[];
      data.forEach((element:any) => {
        this.areas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
        this.numMaq.push([
          element.payload.doc.data()['maquinas']
        ]);
      });
    });
    console.log(this.numMaq);

  }
}


