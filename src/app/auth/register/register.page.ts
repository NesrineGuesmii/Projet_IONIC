import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/services/animation.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
status = {
  loading: false
};
  constructor(private authService: AuthService, private router: Router, private animationService:AnimationService) { }

  ngOnInit() {
  }


  onsubmit(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
  
    if (f.valid) {
      this.status.loading = true;
      this.authService.RegisterUser(f.value.email, f.value.password).then (
        (s: any) => {
          console.log(s); 

          this.router.navigateByUrl("/login");

        },(e: any) => {
          console.log(e);
          this.animationService.showAlert("Error", "Email or password incorrect ! The password must be in 6 caracters.");
          this.status.loading = false;
        }          
      );
    } else {
      this.animationService.showAlert("Empty !", "Please fill well the form !");
      this.status.loading = false;

    }
    
    
  }

}
