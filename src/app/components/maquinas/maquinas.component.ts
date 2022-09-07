import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaquinasService } from 'src/app/services/maquinas.service';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.css']
})
export class MaquinasComponent implements OnInit {

  isload=true;
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

  async ngOnInit(): Promise<void> {
    await this.getMaquinas();
    await this.delay(1000);
    this.isload=false;
  }

  async recargar(){
    this.isload=true;
    await this.getMaquinas();
    await this.delay(1000);
    this.isload=false;
  }

  async getMaquinas():Promise<void>{
    if(this.id!=null){
      (await this.ms.getMaquinas(this.id)).subscribe(data=>{
        console.log(data);

        this.produccionTot=[];
        this.procesos=[];
        this.maquinas=[];
        for (let j = 1; j < 1000; j++) {
          let suma=0;
          if (data.data()['maquinas']['m'+j]==null) {
            break;
          } else {
            this.maquinas.push(data.data()['maquinas']['m'+j]);
            for (let i = 0; i < 1000; i++) {
              if (data.data()['maquinas']['m'+j]['procesos']['p'+i]==null) {
                break;
              } else {
                this.procesos.push(data.data()['maquinas']['m'+j]['procesos']['p'+i]);
                suma+=data.data()['maquinas']['m'+j]['procesos']['p'+i]['produccion'];
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}

