import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RoleOnlyDirective } from "../directives/role-only.directive";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatInputModule, CommonModule, ReactiveFormsModule, MatIconModule, RoleOnlyDirective],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'role', 'avatar', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  resultsLength = 0;
  pageSize = 5;
  searchForm:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: ['']
    });
    this.getUsers();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.dataSource.data = users;
      this.resultsLength = users.length;
    }); 
  }
  addUser() {
    this.router.navigate(['add-user']);
  }
  editUser(id: number) {
    this.router.navigate([`add-user/${id}`]);
  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe( res =>{
      this.getUsers();
    })
  }
  onSearch() {
    const params = Object.fromEntries(
      Object.entries(this.searchForm.value).filter(([_, v]) => v != null && v !== '')
    );
    this.userService.searchUsers(params).subscribe((users: any[]) => {
      this.dataSource.data = users;
      this.resultsLength = users.length;
    });
  }

}
