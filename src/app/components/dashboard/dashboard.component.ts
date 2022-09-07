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

  async ngOnInit(): Promise<void> {
    await this.obtenerAreas();
  }

  async obtenerAreas():Promise<void>{
    (await this.as.getAreas()).subscribe(data=>{
    this.areas=[];
    this.numMaq=[];

      data.forEach((element:any) => {

        this.areas.push({
          id:element.id,
          ...element.data()
        });
        let auxArr=[];
        for (let i = 1; i < 100; i++) {
          if (element.data()['maquinas']['m'+i]==null) {
            break;
          } else {
            auxArr.push([
              element.data()['maquinas']['m'+i]
            ]);
          }
        }
        this.numMaq.push(auxArr);
      });
    });
    await this.delay(2000);
    console.log(this.numMaq);

  }



  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}


