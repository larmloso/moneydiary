import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'formdiary',
    loadChildren: () => import('./formdiary/formdiary.module').then( m => m.FormdiaryPageModule)
  },
  {
    path: 'editpage/:dataObj',
    loadChildren: () => import('./editpage/editpage.module').then( m => m.EditpagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
