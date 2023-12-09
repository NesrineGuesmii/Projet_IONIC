import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AnimationService } from 'src/app/services/animation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  status = {
    loading: false
  };
  auth: any;
  constructor(private authService: AuthService, private animationService: AnimationService, private router: Router) { }

  ngOnInit() {
  }

  onsubmit(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    
    if (f.valid) {
      this.status.loading = true;
      this.auth = this.authService.SignIn(f.value.email, f.value.password).then (
        (s: any) => {
          // console.log(s.user._delegate.accessToken); 
          localStorage.setItem('ionicannonce--http--params', JSON.stringify({
            token: s.user._delegate.accessToken,
            email: f.value.email
          })); // crypt that !!! after hhh
          this.router.navigateByUrl("/home");
          
        },(e: any) => {
          console.log(e);
          this.animationService.showAlert("Error", "Email or password incorrect !");
          this.status.loading = false;
        }          
      );      
      
    } else {
      this.animationService.showAlert("Empty !", "Please fill well the form !");
      this.status.loading = false;
    }
    
  }

}
