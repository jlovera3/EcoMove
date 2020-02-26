import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthGuardService } from './services/auth-guard.service';
//import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    //canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    //canActivate: [AuthGuardService]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesPageModule),
    //canActivate: [AuthGuardService]
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then(m => m.MapPageModule),
    //canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() { }

  ngOnInit() { }

  /*check(): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }*/
}
