import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaquinasService } from 'src/app/services/maquinas.service';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {

  id:string|null;
  nombre:string|null;
  maquinas:any[]=[];
  currentIndex = 0;
  procesos:any[]=[];
  produccionTot:any[]=[];

  constructor(private aRoute:ActivatedRoute,
              private ms:MaquinasService) {
    this.id=aRoute.snapshot.paramMap.get('id');
    this.nombre=aRoute.snapshot.paramMap.get('nombre');
  }

  ngOnInit(): void {

    this.getMaquinas();
  }

  async getMaquinas():Promise<void>{
    if(this.id!=null){
      (await this.ms.getMaquinas(this.id)).subscribe(data=>{
        this.produccionTot=[];
        this.procesos=[];
        this.maquinas=[];
        for (let j = 1; j < 1000; j++) {
          let suma=0;
          if (data.payload.data()['maquinas']['m'+j]==null) {
            break;
          } else {
            this.maquinas.push(data.payload.data()['maquinas']['m'+j]);
            for (let i = 0; i < 1000; i++) {
              if (data.payload.data()['maquinas']['m'+j]['procesos']['p'+i]==null) {
                break;
              } else {
                this.procesos.push(data.payload.data()['maquinas']['m'+j]['procesos']['p'+i]);
                suma+=data.payload.data()['maquinas']['m'+j]['procesos']['p'+i]['produccion'];
              }
            }
          }
          this.produccionTot.push(suma);
        }
        console.log(this.maquinas);
        console.log(this.procesos);
        console.log(this.produccionTot);


      });



    }
  }

}
