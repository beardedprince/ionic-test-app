import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginCredentials } from './utils/activity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }


  authenticateusers(payload: LoginCredentials): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(payload.email, payload.password);
  }
}
