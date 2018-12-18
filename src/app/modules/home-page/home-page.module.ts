
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './container/home-page/home-page.component';
import { OwlModule } from 'ngx-owl-carousel';
@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    OwlModule
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule { }
