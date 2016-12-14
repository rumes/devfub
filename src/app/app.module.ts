// import dependencies for app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LayoutModule } from './layout/layout.module'
import { AppRoutingModule }  from './app-routing.module';
import {InputTextModule,
  ButtonModule,
  DataTableModule,
  SharedModule,
  DialogModule,
  ConfirmDialogModule,
  ConfirmationService,
  PanelModule,
  FieldsetModule,
  MessagesModule,
  DropdownModule} from 'primeng/primeng';

import {AuthGuard} from './_gurd/auth.gurd';
import {BackendService,AuthenticationService} from './services';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GradsComponent } from './grads/grads.component';
import { ClassesComponent } from './classes/classes.component';
import { AddGradComponent } from './add-grad/add-grad.component';
import { AddClassesComponent } from './add-classes/add-classes.component';
import { ClassComponent } from './class/class.component';
import { GradComponent } from './grad/grad.component';
import { StudentsComponent } from './students/students.component';
import { AllStudentsComponent } from './all-students/all-students.component';

// injecting required dependencies to the application
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GradsComponent,
    ClassesComponent,
    AddGradComponent,
    AddClassesComponent,
    ClassComponent,
    GradComponent,
    StudentsComponent,
    AllStudentsComponent
  ],
  // inject imports to the app
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LayoutModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule, 
    DataTableModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    PanelModule,
    FieldsetModule,
    MessagesModule,
    DropdownModule
  ],
  // inject providers to the app
  providers: [BackendService,
              AuthenticationService,
              AuthGuard,
              ConfirmationService
              ],
  bootstrap: [AppComponent],
  // because we use cutem template in our app we need to schema as below
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
