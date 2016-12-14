import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// routing in Lay out module
const layoutRoutes: Routes = [
];
@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
