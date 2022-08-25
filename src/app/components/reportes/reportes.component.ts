import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as printJS from 'print-js';
import { MaquinasService } from 'src/app/services/maquinas.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  //---- colors ----
  /*'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'*/

  //---- borders ----
  /*'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'*/

  isloadT=true;
  isloadP=false;

  //--- configuracion de graficos --
  data:any[]=[];
  chartLabelsT:any[]=[];
  chartLabelsP:any[]=[];



  chartDataP=[{
    data:this.data,
    label:'Producción por maquina',
    backgroundColor:[
      'rgba(75, 192, 192, 0.2)',
    ],
    borderColor:[
      'rgb(75, 192, 192)'
    ],
    borderWidth:2
  }];


  chartDataT = [
    {
      data: this.data,
      label: 'Producción por maquina',
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 2,
    }
  ];

  //--- Configuracion de graficos




  constructor(private ms:MaquinasService) { }

  async ngOnInit() {
    this.getDataT('0');
    this.getLabelsT('0');
    await this.delay(1000);
    this.getDataP('1');
    this.getLabelsP('1');

  }


 async refreshData(){
    this.isloadT=true;
    this.getDataT('0');
    this.getLabelsT('0');
    await this.delay(1000);
    this.getDataP('1');
    this.getLabelsP('1');
  }



  async getDataP(id:string){
    this.chartDataP[0].data=[];
    this.chartDataP[0].data=(await this.ms.getData(id));
  }

  async getLabelsP(id:string){
    this.chartLabelsP=[];
    await this.delay(2000);
    this.chartLabelsP=(await this.ms.getLabels(id));
    this.isloadT=false;
  }

  async getDataT(id:string){
    this.chartDataT[0].data=[];
    this.chartDataT[0].data=(await this.ms.getData(id));
  }

  async getLabelsT(id:string){
    this.chartLabelsT=[];
    this.chartLabelsT=(await this.ms.getLabels(id));
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
