// src/app/sidebar/sidebar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<boolean>(); // <-- emits collapse state
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed); // emit to parent
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
