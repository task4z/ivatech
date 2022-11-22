import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule { }
