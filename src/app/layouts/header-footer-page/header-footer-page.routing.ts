import { Routes } from '@angular/router';

export const HeaderFooterPageRoutes: Routes = [
  {
    path: '',
    loadChildren: './modules/home-page/home-page.module#HomePageModule'
  }
];
