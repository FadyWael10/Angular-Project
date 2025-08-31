import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-posts.component.html',
  styleUrl: './add-posts.component.css'
})
export class AddPostComponent {
  postForm: FormGroup;
  postId: any;
  users: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [''],
      published: [false],
      userId: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.userService.getUsers().subscribe((data: any) => {
      this.users = data; 
    });

 
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe((post: any) => {
        this.postForm.patchValue({
          title: post.title,
          body: post.body,
          tags: post.tags ? post.tags.join(',') : '',
          published: post.published,
          userId: post.userId
        });
      });
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formValue = { 
        ...this.postForm.value, 
        tags: this.postForm.value.tags.split(',').map((t: string) => t.trim()) 
      };

      if (this.postId) {
        this.postService.updatePost(this.postId, formValue).subscribe(() => {
          this.router.navigate(['posts']);
        });
      } else {
        this.postService.createPost(formValue).subscribe(() => {
          this.router.navigate(['posts']);
        });
      }
    } else {
      this.postForm.markAllAsTouched();
    }
  }
}
