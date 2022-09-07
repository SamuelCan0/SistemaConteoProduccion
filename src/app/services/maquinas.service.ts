import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})


export class MaquinasService {



  private dbPath='produccion_';


  labels:any[]=[];
  datos:any[]=[];
  subArr:any[]=[];

  constructor(private firestore:AngularFirestore) { }

  async getMaquinasWeek(fechas:any): Promise<any>{
    this.datos=[];
    for (let index = 0; index < fechas.length; index++) {
      const element = fechas[index];
      for (let j = 0; j < 5; j++) {
        (await this.getMaquinasByIds(element, String(j))).subscribe(data=>{
        this.subArr=[];
          if(data.data()!=null){

          this.subArr.push(data.data()['nombre']);
          this.subArr.push(data.data()['id_a']);
            for (let j = 1; j < 1000; j++) {
              if (data.data()['maquinas']['m'+j]==null) {
                break;
              } else {
                let total=0;
                for (let i = 0; i < 1000; i++) {
                  if (data.data()['maquinas']['m'+j]['procesos']['p'+i]==null) {
                    break;
                  } else {
                    total=total+Number(data.data()['maquinas']['m'+j]['procesos']['p'+i]['produccion']);
                  }
                }
                this.subArr.push(total);
              }
            }
            this.datos.push(this.subArr);
          }
        });
      }
    }
    return this.datos;
  }

  async getMaquinasMonth(fechas:any):Promise<any>{
    this.datos=[];
    for (let index = 0; index < fechas.length; index++) {
      const element = fechas[index];
      for (let j = 0; j < 5; j++) {
        (await this.getMaquinasByIds(element, String(j))).subscribe(data=>{
        this.subArr=[];
          if(data.data()!=null){
          this.subArr.push(data.data()['nombre']);
          this.subArr.push(data.data()['id_a']);
            for (let j = 1; j < 1000; j++) {
              if (data.data()['maquinas']['m'+j]==null) {
                break;
              } else {
                let total=0;
                for (let i = 0; i < 1000; i++) {
                  if (data.data()['maquinas']['m'+j]['procesos']['p'+i]==null) {
                    break;
                  } else {
                    total=total+Number(data.data()['maquinas']['m'+j]['procesos']['p'+i]['produccion']);
                  }
                }
                this.subArr.push(total);
              }
            }

            this.datos.push(this.subArr);
          }
        });
      }
    }
    return this.datos;

  }



  async getMaquinasByIds(collection:string, idDoc:string): Promise<Observable<any>>{
    return this.firestore.collection(collection).doc(idDoc).get();
  }

  async getMaquinas(id:string): Promise<Observable<any>>{
    const hoy=new Date();
    const dia=hoy.getDate();
    const mes=hoy.getMonth()+1;
    const year=hoy.getFullYear();
    //const fullPath=this.dbPath;
    const fullPath=this.dbPath+dia+mes+year;
    console.log(fullPath);
    return this.firestore.collection(fullPath).doc(id).get();
  }


   async getLabels(id:string){
      this.labels=[];
      (await this.getMaquinas(id)).subscribe(data=>{
        for (let j = 1; j < 1000; j++) {
          if (data.data()['maquinas']['m'+j]==null) {
            break;
          } else {
            this.labels.push(data.data()['maquinas']['m'+j]['nombre']);
          }
        }
    });
    return this.labels;
  }

 async getData(id:string){
    this.datos=[];
    (await this.getMaquinas(id)).subscribe(data=>{
      for (let j = 1; j < 1000; j++) {
        if (data.data()['maquinas']['m'+j]==null) {
          break;
        } else {
          let total=0;
          for (let i = 0; i < 1000; i++) {
            if (data.data()['maquinas']['m'+j]['procesos']['p'+i]==null) {
              break;
            } else {
              total=total+Number(data.data()['maquinas']['m'+j]['procesos']['p'+i]['produccion']);
            }
          }
          this.datos.push(total);
        }
      }
  });
  return this.datos;

  }




}
