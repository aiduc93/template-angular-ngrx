import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderFooterPageRoutes } from './layouts/header-footer-page/header-footer-page.routing';
import { HeaderFooterPageComponent } from './layouts/header-footer-page/header-footer-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderFooterPageComponent,
    children: HeaderFooterPageRoutes
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [

  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
