import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { HistorialComponent } from './components/historial/historial.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'reports',component:ReportesComponent},
  {path:'help',component:HelpComponent},
  {path:'process',component:ProcesosComponent},
  {path:'history',component:HistorialComponent},
  {path:'maquinas/:id/:nombre',component:MaquinasComponent},
  {path:'**',redirectTo:'dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
