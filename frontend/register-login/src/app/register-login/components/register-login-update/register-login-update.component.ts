import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationDialogComponent } from 'src/app/generic/components/information-dialog/information-dialog.component';
import { MessageService } from 'src/app/generic/services/message.service';

import { RegisterLoginService } from './../../services/register-login.service';

@Component({
  selector: 'app-register-login-update',
  templateUrl: './register-login-update.component.html',
  styleUrls: ['./register-login-update.component.css'],
})
export class RegisterLoginUpdateComponent implements OnInit {
  registerLoginId: number;

  constructor(
    private register: RegisterLoginService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageService,
    private dialog: MatDialog
  ) {
    this.registerLoginId = 0;
  }

  ngOnInit(): void {
    this.registerLoginId = Number(this.route.snapshot.paramMap.get('id'));
  }

  update(registerForm: any): void {
    this.register.update(registerForm.value).subscribe((sucess) => {
      if (sucess.success) {
        this.message.showSuccessMessage(sucess.message);
        this.router.navigate(['/registerLogin']);
      } else {
        const data = {
          content: sucess.data,
          title: 'Fail on Update',
        };

        this.dialog.open(InformationDialogComponent, { data });
      }
    });
  }
}
