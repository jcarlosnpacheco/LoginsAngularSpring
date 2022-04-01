import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

interface Data {
  message: string;
  type: 'success' | 'error' | 'warning' | 'information';
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Data,
    public snackBarRef: MatSnackBarRef<MessageComponent>
  ) {}

  ok(): void {
    this.snackBarRef.dismiss();
  }

  get getIcon() {
    switch (this.data.type) {
      case 'success':
        return 'check_circle_outline';
      case 'error':
        return 'highlight_off';
      case 'warning':
        return 'warning';
      case 'information':
        return 'info';
    }
  }
}
