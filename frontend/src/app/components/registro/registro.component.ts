import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  username: string = '';
  password: string = '';
  confirmarPassword: string = '';
  error: string = '';
  exito: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar(): void {
    this.error = '';
    this.exito = '';

    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.username.trim() === '' || this.password.trim() === '') {
      this.error = 'Usuario y contraseña son requeridos';
      return;
    }

    this.authService.registro(this.username, this.password).subscribe({
      next: () => {
        this.exito = 'Usuario registrado exitosamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = 'El usuario ya existe o hubo un error';
      }
    });
  }
}
