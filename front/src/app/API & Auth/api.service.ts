import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model des données reçu par l'API pour l'authentification
export interface Message {
  message: string;
  success: boolean;
  result: [];
}

/** * En Déploiement */
//const endpoint = 'http://51.210.46.76:3000/';
/** * En Développement */
const endpoint = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient) { }

  
  // ---------- Admin ----------- //
  loginAdmin(usernameAdmin, passwordAdmin): Observable<any> {
    return this.http.post(endpoint + 'login', { a: usernameAdmin, b: passwordAdmin});
  }

  getAdmin(): Observable<any> {
    return this.http.get(endpoint + 'login');
  }

  logoutAdmin(): Observable<any> {
    return this.http.get(endpoint + 'admin/logout');
  }

  uploadImg(image): Observable<any> {
    return this.http.post(endpoint + 'upload', image);
  }
}
