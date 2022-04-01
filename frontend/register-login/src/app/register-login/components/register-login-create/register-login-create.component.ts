import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InformationDialogComponent } from 'src/app/generic/components/information-dialog/information-dialog.component';
import { MessageService } from 'src/app/generic/services/message.service';

import { RegisterLoginService } from './../../services/register-login.service';

@Component({
  selector: 'app-register-login-create',
  templateUrl: './register-login-create.component.html',
  styleUrls: ['./register-login-create.component.css'],
})
export class RegisterLoginCreateComponent {
  constructor(
    private register: RegisterLoginService,
    private router: Router,
    private message: MessageService,
    private dialog: MatDialog
  ) {}

  create(registerForm: any): void {
    this.register.create(registerForm.value).subscribe((sucess) => {
      if (sucess.success) {
        this.message.showSuccessMessage(sucess.message);
        this.router.navigate(['/registerLogin']);
      } else {
        const data = {
          content: sucess.data,
          title: 'Fail on create',
        };

        this.dialog.open(InformationDialogComponent, { data });
      }
    });
  }
}
