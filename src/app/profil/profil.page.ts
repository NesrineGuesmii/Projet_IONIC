import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { categories } from '../data/Category';
import { Ads } from '../models/Ads';
import { AdsService } from '../services/ads.service';
import { AnimationService } from '../services/animation.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
title: string = ""; // its the name of user
@ViewChild(IonModal) modal!: IonModal;
data = {
  title: "",
  img: "",
  description: "",
  category: "",
  owner: "",
  created_at: new Date().toLocaleDateString()
};
catgs = categories;
ownAds!: Array<Ads>;
owner: any;
  constructor(private adService: AdsService, private animationService: AnimationService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log(this.catgs);
    this.getOwnAds(); // get ads of current user
    this.owner = this.authService.Owner(); // get email of current user
  }


  logout() {
    this.authService.Logout();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    
    this.onsubmit(this.data)
    // this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  onsubmit(data: Ads) { // create an ad - req firestore
    data.owner = this.authService.Owner();
    console.log(data);

    this.adService.setAds(data).then(
      (s) => {
        console.log(s);
        this.cancel();
      }, (e) => {
        this.animationService.showAlert("Error in saving !", "Please verify your ad !");
      }
    )
  }


  getOwnAds() {
    const email = this.authService.Owner();
    console.log(email);
    
    this.adService.getAdsByEmail(email).valueChanges().subscribe(
      (s) => {
        this.ownAds = s;
        console.log(this.ownAds);
        
      }, (e) => {

      }
    );
  }


  goToDetail(title: any) {    
    this.router.navigateByUrl("/ad-details/" + title);
  }

}
