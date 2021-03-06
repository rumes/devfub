import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {FireAuthService} from '../services';


import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    
  ],
  declarations: [AuthComponent, LoginComponent],
  providers:[FireAuthService]
})
export class AuthModule { }
