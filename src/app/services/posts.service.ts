import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private apiService: ApiService) {}

  getPosts() {
    return this.apiService.getAll('/posts');
  }

  getPostById(id: number) {
    return this.apiService.getById('/posts', id);
  }

  createPost(post: any) {
    return this.apiService.create('/posts', post);
  }

  updatePost(id: number, post: any) {
    return this.apiService.update('/posts', id, post);
  }

  deletePost(id: number) {
    return this.apiService.delete('/posts', id);
  }

  searchPosts(params: any) {
    return this.apiService.search('/posts', params);
  }

  getComments(postId: number) {
    return this.apiService.getAll(`/posts/${postId}/comments`);
  }
}
