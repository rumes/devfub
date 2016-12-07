import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import {ToolbarModule, MenuModule} from 'primeng/primeng';
import {LayoutRoutingModule} from './layout-routing.module'




@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    MenuModule
  ],
  exports :[LayoutComponent],
  declarations: [LayoutComponent, DrawerComponent, FooterComponent, HeaderComponent],
  providers: []
})
export class LayoutModule { }
