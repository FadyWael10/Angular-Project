import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-detail.component.html',
  styleUrl: './posts-detail.component.css'
})
export class PostDetailComponent {
  post: any;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(postId).subscribe(post => this.post = post);
  }
}
