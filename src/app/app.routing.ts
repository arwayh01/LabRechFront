import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }, {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'createMember',
    pathMatch: 'full',
    component: MemberFormComponent,
  },
  {
    path: 'createEtudiant',
    pathMatch: 'full',
    component: EtudiantFormComponent,
  },
  {
    path: 'etudiants/:id/edit',
    pathMatch: 'full',
    component: EtudiantFormComponent,
  },
  
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
