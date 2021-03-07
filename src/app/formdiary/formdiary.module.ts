import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormdiaryPageRoutingModule } from './formdiary-routing.module';

import { FormdiaryPage } from './formdiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormdiaryPageRoutingModule
  ],
  declarations: [FormdiaryPage]
})
export class FormdiaryPageModule {}
