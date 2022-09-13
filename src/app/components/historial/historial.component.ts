import { Component, OnInit } from '@angular/core';
import { DateTime } from "luxon";
import { MaquinasService } from 'src/app/services/maquinas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})


export class HistorialComponent implements OnInit {
  semana:number=DateTime.local().weekNumber;
  mesesDataOrder:any[]=[];
  idDocsS:any[]=[];
  idDocsM:any[]=[];
  idDocsY:any[]=[];
  FinalDataA:any[]=[];
  colorBS:any[]=[
    'rgb(127, 255, 212)',
    'rgb(0, 255, 127)',
    'rgb(221, 160, 221)',
    'rgb(175, 238, 238)',
    'rgb(0, 250, 154)'
  ];
  colorS:any[]=[
    'rgba(127, 255, 212, 0.2)',
    'rgba(0, 255, 127, 0.2)',
    'rgba(221, 160, 221, 0.2)',
    'rgba(175, 238, 238, 0.2)',
    'rgba(0, 250, 154, 0.2)'
  ];
  colorBM:any[]=[
    'rgb(221, 160, 221)',
    'rgb(175, 238, 238)',
    'rgb(0, 250, 154)',
    'rgb(127, 255, 212)',
    'rgb(0, 255, 127)',
  ];
  colorM:any[]=[
    'rgba(221, 160, 221, 0.2)',
    'rgba(175, 238, 238, 0.2)',
    'rgba(0, 250, 154, 0.2)',
    'rgba(127, 255, 212, 0.2)',
    'rgba(0, 255, 127, 0.2)',
  ];
  colorBY:any[]=[
    'rgb(241, 196, 15)',
    'rgb(221, 160, 221)',
    'rgb(255, 69, 0)',
    'rgb(0, 250, 154)',
    'rgb(127, 255, 212)',
    'rgb(175, 238, 238)',
    'rgb(0, 255, 127)',
  ];
  colorY:any[]=[
    'rgba(241, 196, 15, 0.2)',
    'rgba(221, 160, 221, 0.2)',
    'rgb(255, 69, 0, 0.2)',
    'rgba(0, 250, 154, 0.2)',
    'rgba(127, 255, 212, 0.2)',
    'rgba(175, 238, 238, 0.2)',
    'rgba(0, 255, 127, 0.2)',
  ];
  isLoad: Boolean=false;
  isShow: Boolean=false;
  isSearch: Boolean=false;
  busco: Boolean=false;
  fecha: String='';

  constructor(private ms:MaquinasService) { }

  regresar(){
    this.isShow=false;
    this.busco=false;
    this.isSearch=false;
  }



  async ngOnInit() {
    await this.PforWeek();
    await this.PforMonth();
    await this.delay(500);
    await this.PforYear();
  }

  async searchDate(result: { date: string; }){
    let datos=[];
    let a='';
    let m='';
    let d='';
    let path=[];
    this.isSearch=true;
    for (let i = 0; i < result.date.length; i++) {
      if(i>=0 && i<4){a+=result.date[i];}
      if(i==6){m+=result.date[i];}
      if(i>=8 && i<10){d+=result.date[i];}
    }
    if (parseInt(d)<10) {
      d=d[1];
    }
    path.push('produccion_'+d+m+a);
    console.log(path);
    datos=await this.ms.getMaquinasWeek(path);
    await this.delay(2000);
    if (datos.length==0) {
      console.log('No hay produccion');
      this.isSearch=false;
      this.busco=true;
    } else {
      this.fecha=result.date;
      let data=await this.reordenar(datos);
      let arrAux=[];
      this.dataB.labels=[];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.dataB.labels.push(element[1]);
        arrAux.push(element[2]);
      }
      this.dataB.datasets=[];
      this.dataB.datasets.push({
                                label:'Producción Total',
                                data:arrAux,borderWidth:2,
                                backgroundColor:this.colorS,
                                borderColor:this.colorBS,
                                hoverBackgroundColor:this.colorBS,
                                hoverBorderColor:this.colorBS
                              });
      this.delay(2000);
      this.isShow=true;
    }


  }

  async PforWeek(){
    let datos=[];
    const semana = DateTime.local().weekNumber;
    const hoy= new Date();
    for (let index = 5; index > -1; index--) {
      let dia=hoy.getDate()-index;
      let mes=hoy.getMonth()+1;
      let year=hoy.getFullYear();
      if(dia<=0){
        mes=hoy.getMonth();
        dia=new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
        dia+=2
        dia-=index;
      }
      let weekNum=DateTime.local(year, mes, dia).weekNumber;
      if(semana==weekNum){
        let idDoc='produccion_'+dia+mes+year;
        this.idDocsS.push(idDoc);
      }
    }
    console.log(this.idDocsS);
    datos=await this.ms.getMaquinasWeek(this.idDocsS);
    await this.delay(1000);
    console.log(datos);
    let data=(await this.reordenar(datos));

    this.dataD.datasets=[];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let arrAux=[];
      for (let j = 0; j < element.length; j++) {
        const item = element[j];
        if (item>-1) {
          arrAux.push(item);
        }
      }
      this.dataD.datasets.push({
                                label:element[1],
                                data:arrAux,borderWidth:2,
                                backgroundColor:this.colorS[i],
                                borderColor:this.colorBS[i],
                                hoverBackgroundColor:this.colorBS[i],
                                hoverBorderColor:this.colorBS[i]
                              });
    }

  }

  async PforMonth(){
    let datos=[];
    const year=new Date().getFullYear();
    const mes=new Date().getMonth()+1;
    for (let j = 1; j < 32; j++) {
      let idDoc='produccion_'+j+mes+year;
      this.idDocsM.push(idDoc)
    }
    datos=await this.ms.getMaquinasMonth(this.idDocsM);
    await this.delay(1000);
    let data=(await this.reordenar(datos));

    let arrAux=[];
    this.dataS.labels=[];
    this.dataS.datasets=[];
    for (let j = 0; j < data.length; j++) {
      const element = data[j];
      this.dataS.labels.push(element[1]);
      let suma=0;
      for (let i = 0; i < element.length; i++) {
        const item = element[i];
        if (item>-1) {
          suma+=item;
        }
      }
      arrAux.push(suma);
    }
    this.dataS.datasets.push({
                              label:'Producción',
                              data:arrAux,
                              borderWidth:2,
                              backgroundColor:this.colorM,
                              borderColor:this.colorBM,
                              hoverBackgroundColor:this.colorBM,
                              hoverBorderColor:this.colorBM
                            });

  }

  async PforYear(){
    let mesAux=[];
    let datos=[];
    this.dataA.labels=[];
    this.dataA.datasets=[];
    const year=new Date().getFullYear();
    const mesActual=new Date().getMonth()+1;
    for (let i = 1; i <= mesActual; i++) {
      mesAux=[];
      datos=[];
      for (let j = 1; j < 32; j++) {
        let idDoc='produccion_'+j+i+year;
        mesAux.push(idDoc);
      }
      datos=await this.ms.getMaquinasMonth(mesAux);
      await this.delay(800);
      let arrAux=[];
      let labelMes='';
      let finalData=[];
      if(i==1){labelMes='Enero'}
      if(i==2){labelMes='Febrero'}
      if(i==3){labelMes='Marzo'}
      if(i==4){labelMes='Abril'}
      if(i==5){labelMes='Mayo'}
      if(i==6){labelMes='Junio'}
      if(i==7){labelMes='Julio'}
      if(i==8){labelMes='Agosto'}
      if(i==9){labelMes='Septiembre'}
      if(i==10){labelMes='Octubre'}
      if(i==11){labelMes='Noviembre'}
      if(i==12){labelMes='Diciembre'}
      if(datos.length>0){
        this.dataA.labels.push(labelMes);
        console.log(datos);
        let dataOrder=(await this.reordenar(datos));

        for (let q = 0; q < dataOrder.length; q++) {
          const element = dataOrder[q];
          let suma=0;
          arrAux=[];
          for (let p = 0; p < element.length; p++) {
            if (element[p]>0) {
              suma+=element[p];
            } else {
              arrAux.push(element[p]);
            }
          }
          arrAux.push(suma);
          finalData.push(arrAux);
        }
        this.mesesDataOrder.push(finalData);

      }
    }

    let arrAux=[];
    for (let i = 0; i < this.mesesDataOrder.length; i++) {
      const element = this.mesesDataOrder[i];
      for (let j = 0; j < element.length; j++) {
        let reAux=[];
        const item = element[j];
        reAux.push(item[1]);
        reAux.push(item[0]);
        reAux.push(item[2]);
        arrAux.push(reAux);
      }
    }
    let dataOrder=(await this.reordenar(arrAux));
    console.log(dataOrder);
    for (let i = 0; i < dataOrder.length; i++) {
      const element = dataOrder[i];
      let arrAux=[];
      for (let j = 0; j < element.length; j++) {
        const item = element[j];
        if (item>-1) {
          arrAux.push(item);
        }
      }
      this.dataA.datasets.push({
                                label:element[1],
                                data:arrAux,borderWidth:2,
                                backgroundColor:this.colorY[i],
                                borderColor:this.colorBY[i],
                                hoverBackgroundColor:this.colorBY[i],
                                hoverBorderColor:this.colorBY[i]
                              });

      }

    this.isLoad=true;

  }



  labelsA = ['enero'];
  labelsS = ['Argollas'];
  labelsD = ['lunes','martes','miercoles','jueves','viernes','sabado'];
  datosA=[10];
  datosS=[10];
  datosD=[10];


  dataA = {
    labels: this.labelsA,
    datasets: [{
      label: 'Producción',
      data: this.datosA,
      borderWidth: 2,
      borderColor:this.colorBS,
      backgroundColor:this.colorS,
      hoverBackgroundColor:['rgb(153, 102, 255)'],
      hoverBorderColor:['rgb(153, 102, 255)'],
    }]
  };

  dataS={
    labels:this.labelsS,
    datasets:[{
      label:'Produccion',
      data:this.datosS,
      borderWidth:2,
      borderColor:this.colorBS,
      backgroundColor:this.colorS,
      hoverBackgroundColor:['rgb(153, 102, 255)'],
      hoverBorderColor:['rgb(153, 102, 255)'],
    }],
  };

  dataD={
    labels:this.labelsD,
    datasets:[{
      label:'troquelados',
      data:[15,10],
      borderWidth:2,
      borderColor:this.colorBS,
      backgroundColor:this.colorS,
      hoverBackgroundColor:['rgb(153, 102, 255)'],
      hoverBorderColor:['rgb(153, 102, 255)'],
    }],
  };

  dataB={
    labels:['data'],
    datasets:[{
      label:'Producción Total',
      data:[10,20],
      borderWidth: 2,
      borderColor:this.colorBS,
      backgroundColor:this.colorS,
      hoverBackgroundColor:['rgb(153, 102, 255)'],
      hoverBorderColor:['rgb(153, 102, 255)'],
    }],
  };

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }


  async reordenar(datos:any):Promise<any[]>{
    let subArr=[];
    let sumaProcess=0;
    let produccion=[];
    let data: any[]=[];
    for (let i = 0; i < datos.length; i++) {
      const element = datos[i];
      sumaProcess=0;
      subArr=[];
      for (let j = 0; j < element.length; j++) {
        if (element[j]>-1) {
          sumaProcess+=element[j];
        }else{
          subArr.push(element[j]);
        }
      }
      subArr.push(sumaProcess);
      produccion.push(subArr);
    }

    for (let i = 0; i < produccion.length; i++) {
      let arregloAux=[];
      let existe=false;
      const element = produccion[i];
      for (let j = 0; j < 5; j++) {
        if(data.length==0){
          arregloAux.push(element[1]);
          arregloAux.push(element[0]);
          arregloAux.push(element[2]);
          data.push(arregloAux);
          existe=true;
          break;
        }else if (data[j]!=null) {
          if(data[j][0]=='A'+j && element[1]==data[j][0]){
            data[j].splice(data[j].length,0,element[2]);
            existe=true;
            break;
          }
        }
      }
      if (!existe) {
        arregloAux.push(element[1]);
        arregloAux.push(element[0]);
        arregloAux.push(element[2]);
        data.push(arregloAux);
      }

    }
    return data;
  }

}
