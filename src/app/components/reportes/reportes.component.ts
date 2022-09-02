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


  isload=true;

  //--- configuracion de graficos --
  data:any[]=[];
  chartLabelsA:any[]=[];


  chartDataA = [
    {
      data: this.data,
      label: 'Producción por maquina',
      hoverBackgroundColor:['rgb(153, 102, 255)'],
      hoverBorderColor:['rgb(153, 102, 255)'],
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
    await this.getDataA('0');
    await this.delay(500);
    await this.getLabelsA('0');
    await this.delay(3000);
    this.isload=false;
  }


 async refreshData(){
    this.isload=true;
    this.getDataA('0');
    this.getLabelsA('0');
    await this.delay(2000);
    this.isload=false;
  }






  async getDataA(id:string){
    this.chartDataA[0].data=[];
    this.chartDataA[0].data=(await this.ms.getData(id));
  }

  async getLabelsA(id:string){
    this.chartLabelsA=[];
    this.chartLabelsA=(await this.ms.getLabels(id));
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
