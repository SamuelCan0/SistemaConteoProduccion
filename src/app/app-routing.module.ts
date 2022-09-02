import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HelpComponent } from './components/help/help.component';
import { HistorialComponent } from './components/historial/historial.component';
import { LoginComponent } from './components/login/login.component';
import { MaquinasComponent } from './components/maquinas/maquinas.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'reports',component:ReportesComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'help',component:HelpComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'process',component:ProcesosComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'history',component:HistorialComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'maquinas/:id/:nombre',component:MaquinasComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))},
  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
