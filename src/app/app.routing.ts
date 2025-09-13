import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-posts/add-posts.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/posts-details/posts-detail.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'add-user/:id', component: AddUserComponent, canActivate: [AuthGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
  { path: 'add-posts', component: AddPostComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'add-posts/:id', component: AddPostComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: PostDetailComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },


  { path: '**', redirectTo: 'home' }
];

export const appRouter = provideRouter(routes);
