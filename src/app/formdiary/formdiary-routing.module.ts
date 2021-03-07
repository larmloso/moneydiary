import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormdiaryPage } from './formdiary.page';

const routes: Routes = [
  {
    path: '',
    component: FormdiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormdiaryPageRoutingModule {}
