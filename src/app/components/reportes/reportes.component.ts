import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { MaquinasService } from 'src/app/services/maquinas.service';
import autoTable from 'jspdf-autotable';

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

  async downloadPDF(){
    const hoy=new Date();
    const dia=hoy.getDate();
    const mes=hoy.getMonth()+1;
    const year=hoy.getFullYear();
    //const fullPath=this.dbPath;
    const fullPath='Producción de '+dia+'/'+mes+'/'+year;
    var img:any;
    var graficas = document.getElementById('grafica-argollas');
    htmlToImage.toPng(graficas!)
      .then(function(dataUrl){
        img=new Image();
        img.src=dataUrl;
      })
      .catch(function(error){
        console.error('algo salio mal\nERROR: ', error);
      });
      await this.delay(2000);
      let pdf=new jsPDF('p', 'px', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const widthRatio = pageWidth / img.width;
      const heightRatio = pageHeight / img.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = img.width * ratio;
      const canvasHeight = img.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      let xOffset = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(fullPath)/2 );
      var columns = ["Maquina","Producción"];
      var data:any[]=[];
      let arrAux=[];
      for (let index = 0; index < this.chartDataA[0]['data'].length; index++) {
        arrAux=[];
        const element1 = this.chartLabelsA[index];
        const element2 = this.chartDataA[0]['data'][index];
        arrAux.push(element1);
        arrAux.push(element2);
        data.push(arrAux);
      }
      console.log(data);
      pdf.setFontSize(20);
      pdf.text(fullPath,xOffset,85,{'align':'center'});
      pdf.setFontSize(16);
      pdf.text('Producción de Argollas',marginX+canvasWidth*.12,125);
      pdf.setFontSize(20);
      pdf.addImage(img,'PNG', marginX+canvasWidth*.12, 140, canvasWidth*.75, canvasHeight*.75);
      autoTable(pdf,{head:[columns],body:data, startY:350,});
      var logo=new Image();
      logo.src='assets/img/log.jpg';
      pdf.addImage(logo,'jpg',15,15,50,25);
      var logoAlsan=new Image();
      logoAlsan.src='assets/img/logo-alsan.jpg';
      pdf.addImage(logoAlsan,'jpg',canvasWidth*.80,15,80,25);

      pdf.save(fullPath);
  }





  async getDataA(id:string){
    this.chartDataA[0].data=[];
    this.chartDataA[0].data=(await this.ms.getData(id));
  }

  async getLabelsA(id:string){
    this.chartLabelsA=[];
    this.chartLabelsA=(await this.ms.getLabels(id));
    console.log(this.chartLabelsA);

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
