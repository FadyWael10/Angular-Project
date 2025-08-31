import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm: FormGroup;
  userId:any;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      avatar: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ avatar: file });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId) {
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(res => {
          console.log('updated');
          this.userForm.reset();
          this.router.navigate(['users']);
        });
      } else {
        this.userService.createUser(this.userForm.value).subscribe(res => {
          console.log('created');
          this.userForm.reset();
          this.router.navigate(['users']);
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user: any) => {
        this.userForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          avatar: null
        });
      });
    }
  }

}
