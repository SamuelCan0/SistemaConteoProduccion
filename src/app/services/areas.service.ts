import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private dbPath='produccion_';


  constructor(private firestore:AngularFirestore) {
  }

  async getAreas(): Promise<Observable<any>>{
    const hoy=new Date();
    const dia=hoy.getDate();
    const mes=hoy.getMonth()+1;
    const year=hoy.getFullYear();
    //const fullPath=this.dbPath;
    const fullPath=this.dbPath+dia+mes+year;
    console.log(fullPath);
    return (await this.firestore.collection(fullPath).get());
  }
}
