import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    this.auth.register(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert('Registration failed')
    });
  }
}
