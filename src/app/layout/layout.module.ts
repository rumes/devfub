import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import {ToolbarModule, ButtonModule, SplitButtonModule} from 'primeng/primeng';




@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule
  ],
  exports :[LayoutComponent],
  declarations: [LayoutComponent, DrawerComponent, FooterComponent, HeaderComponent],
  providers: []
})
export class LayoutModule { }
