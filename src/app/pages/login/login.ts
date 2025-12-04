import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule , FormGroup, FormControl } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  disabled = false;
  isFormValid = signal(true);
  isLoading = signal(false);

  loginForm : FormGroup = new FormGroup({
    Email: new FormControl(""),
    Password: new FormControl("")
  });

  http = inject(HttpClient);
  router = inject(Router);

  onSubmit() {
    const { Email, Password } = this.loginForm.value;

    const relativeUrl = '/api/account/login';
    const fullUrl = new URL(relativeUrl, window.location.origin).href;
    //console.log('POST URL login:', fullUrl);

    this.http.post(fullUrl, { Email, Password }).subscribe({
      next: (response : any) => {
        if(response.isSuccess){
          localStorage.setItem('tokenJWT', response.value.token);
          localStorage.setItem('routes', JSON.stringify(response.value.rutas));
          localStorage.setItem('sections', response.value.secciones);
          localStorage.setItem('user', response.value.username);
          localStorage.setItem('email', response.value.email);

          // Forzar actualización del estado 
          window.dispatchEvent(new Event('storage'));
        }else{
          alert('Login failed');
        }
        this.router.navigate(['/home']);

      },
      error: (error) => {
        alert('Login failed');
        console.error('Login failed', error);
      }
    });



  }

}
