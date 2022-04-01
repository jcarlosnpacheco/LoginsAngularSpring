import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.css'],
})
export class UsersGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'username', 'roles'];

  dataSource: any;

  constructor(private userService: UserService) {
    this.initiateGrid();
  }

  ngOnInit() {}

  initiateGrid(): void {
    this.userService.getAll().subscribe((users) => {
      this.configDataSource(users);
    });
  }

  private configDataSource(user: User[]): void {
    this.dataSource = new MatTableDataSource(user);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
