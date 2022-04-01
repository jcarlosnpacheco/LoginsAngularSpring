import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogConfig } from '../../models/dialog-config.model';


@Component({
  selector: 'app-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  cancelText: string;
  confirmText: string;
  content: string;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogConfig) {
    this.cancelText = data.cancelText ? data.cancelText : 'Cancel';
    this.confirmText = data.confirmText ? data.confirmText : 'Confirm';
    this.content = data.content;
    this.title = data.title;
  }
}
