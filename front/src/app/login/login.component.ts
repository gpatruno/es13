import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../API & Auth/api.service';
import IMessage from '../models/IMessage';

export interface Message {
  message: string;
  success: boolean;
  admin: {
    _id: string,
    username: string,
    mail: string,
    password: string
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password: string;
  public username: string;
  public hide = true;
  public isConnected = false;
  private res: IMessage; // Réponse de l'API
  private adminData: {
    _id: string,
    username: string,
    mail: string,
    password: string
  };

  constructor(private snackBar: MatSnackBar, private router: Router, private apiService: APIService) { }

  ngOnInit(): void {
  }

  isValid() {
    if (this.username !== undefined && this.password !== undefined) {
      return true;
    } else {
      this.snackBar.open('Veuillez remplir les champs !', null, {
        duration: 2000,
      });
      return false;
    }
  }

  login() {
    this.apiService.loginAdmin(this.username, this.password).subscribe((response: IMessage) => {
      // Si la requête a été réussi
      this.res = response;
      if (this.res.success === true) {
        // Authentification réussi
        // Ici je redirige la page sur le component Interface
        this.router.navigate(['/administration']);
        this.snackBar.open('Bonjour, ' + this.username + ' !', null, {
          duration: 3000,
        });
      } else {
        // Authentification fail
        this.snackBar.open(this.res.message, null, {
          duration: 3000,
        });
      }
    });
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
