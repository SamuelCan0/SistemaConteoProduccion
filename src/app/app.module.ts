import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { HelpComponent } from './components/help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { NgChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    ReportesComponent,
    HelpComponent,
    MaquinasComponent,
    HistorialComponent,
    ProcesosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatDatepickerModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
