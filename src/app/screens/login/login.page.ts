import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email!: string;
  password!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  login() {
    if (this.email && this.password) {
      this.userService.login(this.email, this.password)
        .then(loginData => {
           // Clear fields after successful registration
        this.email = '';
        this.password = '';

        // Navigate to dashboard
          this.router.navigateByUrl('/dashboard');
        })
        .catch(err => {
          this.showErrorMessage('Invalid email or password');
        });
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
