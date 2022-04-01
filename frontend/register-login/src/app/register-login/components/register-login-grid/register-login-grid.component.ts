import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmationDialogComponent } from 'src/app/generic/components/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from 'src/app/generic/services/message.service';
import { RegisterLogin } from 'src/app/register-login/models/register-login';

import { RegisterLoginService } from '../../services/register-login.service';

@Component({
  selector: 'app-register-login-grid',
  templateUrl: './register-login-grid.component.html',
  styleUrls: ['./register-login-grid.component.css'],
})
export class RegisterLoginGridComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'LoginName',
    'Password',
    'Observation',
    'Action',
  ];

  dataSource: any;

  searchRegisterForm = this.fb.group({
    registerLoginName: [null, [Validators.required]],
  });

  hide = true;
  classPassword = 'hidetext';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: MessageService,
    private dialog: MatDialog,
    private registerLoginService: RegisterLoginService,
    private authService: AuthService
  ) {
    this.initiateGrid();
  }

  initiateGrid(): void {
    this.registerLoginService
      .getAll(Number(this.authService.getIdFromToken()))
      .subscribe((register) => {
        this.configDataSource(register);
      });
  }

  createRegister(): void {
    this.router.navigate(['registerLogin/create']);
  }

  searchRegisterLogin(registerLoginName: string): void {
    if (this.searchRegisterForm.valid) {
      this.registerLoginService
        .getAllByRegisterName(
          Number(this.authService.getIdFromToken()),
          registerLoginName,
          registerLoginName
        )
        .subscribe((registers) => {
          this.configDataSource(registers);
        });
    }
  }

  deleteRecord(register: RegisterLogin) {
    const data = {
      cancelText: 'No',
      confirmText: 'Yes',
      content: `Delete this record: ${register.id}?`,
      title: 'Confirmation',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.registerLoginService
          .delete(Number(this.authService.getIdFromToken()), register.id)
          .subscribe((sucess) => {
            this.initiateGrid();
            this.message.showSuccessMessage(sucess.message);
          });
      }
    });
  }

  clear(formPesquisa: FormGroupDirective): void {
    formPesquisa.resetForm();
    this.initiateGrid();
  }

  hidePass(): void {
    this.hide = !this.hide;
  }

  getPassCopied(register: RegisterLogin): string {
    return register.password;
  }

  private configDataSource(register: RegisterLogin[]): void {
    this.dataSource = new MatTableDataSource(register);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
