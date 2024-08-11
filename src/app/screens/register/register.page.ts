import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email!: string;
  fullName!: string;
  password!: string;

  constructor(private userService: UserService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  create() {
    if (this.email && this.password && this.fullName) {

      this.userService.register(this.email, this.password).then(registerData => {
        this.userService.createUser(this.email, this.fullName).then(userData => {
           // Clear fields after successful registration
        this.email = '';
        this.fullName = '';
        this.password = '';

        // Navigate to dashboard
          this.router.navigateByUrl('/dashboard');
        }).catch(err => {
          this.showErrorMessage('Invalid email or password');
        })
      }).catch(err => {
        this.showErrorMessage('Invalid email or password');

      })

    } else {
      this.showErrorMessage('Please fill in both email and password');
    }
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
