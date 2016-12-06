import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LayoutComponent, DrawerComponent, FooterComponent, HeaderComponent]
})
export class LayoutModule { }
