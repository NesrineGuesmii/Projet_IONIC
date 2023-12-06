import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth: AngularFireAuth, private router: Router) { }

  // Login in with email/password
  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email: any, password: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  IsAuth() {
    const token = localStorage.getItem("ionicannonce--http--params");
    if (token) {
      return true;
    }
    return false;
  }

  Owner() {
    return this.ngFireAuth.currentUser;
  }

  Logout() {
    localStorage.removeItem("ionicannonce--http--params");
    this.ngFireAuth.signOut();
    this.router.navigateByUrl("/login"); 
  }
}
