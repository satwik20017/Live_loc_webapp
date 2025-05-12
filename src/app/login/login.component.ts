import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/location']),
      error: err => alert('Login failed')
    });
  }
}
