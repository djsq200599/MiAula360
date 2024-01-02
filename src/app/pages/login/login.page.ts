import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Intentando iniciar sesión', this.loginForm.value);
      this.apiService.iniciarSesion(this.loginForm.value.usuario, this.loginForm.value.contraseña)
        .subscribe(profesores => {
          if (profesores.length > 0) {
            localStorage.setItem('idProfesor', profesores[0].id.toString());
            this.router.navigate(['/cursos']);
            console.log('Inicio de sesión exitoso', profesores[0]);
          } else {
            console.error('Credenciales incorrectas');
          }
        }, error => {
          console.error('Error en la solicitud de inicio de sesión', error);
        });
    } else {
      console.error('Formulario de inicio de sesión no válido');
    }
  }
}