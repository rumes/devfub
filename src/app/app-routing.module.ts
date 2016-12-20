// get all the component and other libries that need to set app routs
import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {GradsComponent} from './grads/grads.component';
import {GradComponent} from './grad/grad.component';
import {ClassesComponent} from './classes/classes.component';
import {AddGradComponent} from './add-grad/add-grad.component';
import {AddClassesComponent} from './add-classes/add-classes.component';
import {ClassComponent} from './class/class.component';
import {StudentsComponent} from './students/students.component';
import {AllStudentsComponent} from './all-students/all-students.component';
// import authguard that define what url can access without permission
import {AuthGuard} from './_gurd/auth.gurd';

// set Routs and paths Using canActivate:[AuthGuard] define this link is can't be access without permission
const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'grads',
    component: GradsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'grads/:id',
    component: GradComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes/:id',
    component: ClassComponent,
   canActivate: [AuthGuard],
  },
  {
    path: 'all-classes',
    component: ClassesComponent,
   canActivate: [AuthGuard],
  },
  {
    path : 'add-class',
    component: AddClassesComponent,
    canActivate: [AuthGuard]
   },
  {
    path: 'add-grad',
    component: AddGradComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-student',
    component: StudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'all-student',
    component: AllStudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: 'app/chat/chat.module#ChatModule',
    data: {
      preload: true
    }
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
  },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  // import Roter Module and set this Router module as root router module in the app
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  // export Router Module that can Inject in app.module and can use system wide
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}