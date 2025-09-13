import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUsers() {
    return this.apiService.getAll('/users');
  }

  getUserById(id: number) {
    return this.apiService.getById('/users', id);
  }

  createUser(user: any) {
    return this.apiService.create('/users', user);
  }

  updateUser(id: number, user: any) {
    console.log(user);
    return this.apiService.update(`/users`, id, user);
  }

  deleteUser(id: number) {
    return this.apiService.delete(`/users`, id);
  }
  searchUsers(params: any) {
    return this.apiService.search('/users', params);
  }
}
