import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './components/information-dialog/information-dialog.component';
import { MessageComponent } from './components/message/message.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { ValidateFormFieldsService } from './services/validate-form-fields.service';
import { FormatTimePipe } from './shared/pipes/format-time.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [ToolbarComponent, MaterialModule],
  declarations: [
    PageNotFoundComponent,
    ToolbarComponent,
    MessageComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent,
    FormatTimePipe,
  ],
  providers: [ValidateFormFieldsService],
})
export class GenericModule {}
