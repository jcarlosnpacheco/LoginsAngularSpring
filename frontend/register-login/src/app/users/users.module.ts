import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GenericModule } from '../generic/generic.module';
import { UsersGridComponent } from './components/users-grid/users-grid.component';

@NgModule({
  imports: [CommonModule, GenericModule],
  declarations: [UsersGridComponent],
})
export class UsersModule {}
