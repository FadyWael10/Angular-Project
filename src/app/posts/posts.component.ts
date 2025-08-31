import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';
import { PostService } from '../services/posts.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RoleOnlyDirective } from "../directives/role-only.directive";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, RoleOnlyDirective],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'published', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  resultsLength = 0;
  pageSize = 5;
  searchForm: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postService: PostService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      userId: [''],
      title: [''],
      published: ['']
    });
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts: any[]) => {
      this.dataSource.data = posts;
      this.resultsLength = posts.length;
    });
  }

  addPost() {
    this.router.navigate(['add-posts']);
  }

  editPost(id: number) {
    this.router.navigate([`add-posts/${id}`]);
  }

  viewPost(id: number) {
    this.router.navigate([`post/${id}`]);
  }

  deletePost(id: number) {
      this.postService.deletePost(id).subscribe(() => {
        this.getPosts();
      });

  }

  onSearch() {
    const params = Object.fromEntries(
      Object.entries(this.searchForm.value).filter(([_, v]) => v !== null && v !== '')
    );
    this.postService.searchPosts(params).subscribe((posts: any[]) => {
      this.dataSource.data = posts;
      this.resultsLength = posts.length;
    });
  }
}
