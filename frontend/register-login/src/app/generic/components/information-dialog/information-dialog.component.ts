import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogConfig } from '../../models/dialog-config.model';
import { ValidationMessage } from '../../models/validation-message';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
})
export class InformationDialogComponent {
  confirmText: string;
  content: string;
  title: string;
  validationsMessage: ValidationMessage[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogConfig) {
    this.confirmText = data.confirmText ? data.confirmText : 'OK';

    for (const dataContent of data.content) {
      const contentStringified = JSON.stringify(dataContent);
      const contentParsed: ValidationMessage = JSON.parse(contentStringified);
      this.validationsMessage?.push(contentParsed);
    }

    this.content = data.content;
    this.title = data.title;
  }
}
