import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  successMessage: string = '';
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit() { }
  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          this.successMessage = 'Registrazione avvenuta con successo, ti mando al login...';
          // reindirizza l'utente alla pagina di login dopo un certo periodo di tempo
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          // gestisci gli errori qui
        }
      );
    }
  }
}
