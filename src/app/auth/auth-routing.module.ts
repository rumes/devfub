import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

const chatRoot:Routes = [

  {
    path : '',
    component : LoginComponent
  }
];

@NgModule({
  // import Roter Module and set this Router module as root router module in the app
  imports: [
    RouterModule.forChild(chatRoot)
  ],
  // export Router Module that can Inject in app.module and can use system wide
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {} 