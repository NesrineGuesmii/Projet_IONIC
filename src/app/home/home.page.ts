import { Component } from '@angular/core';
import { categories } from '../data/Category';
import { AdsService } from '../services/ads.service';
import { Ads } from '../models/Ads';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
catgs = categories;
ads!: Array<Ads>;

  constructor(private adsService: AdsService) {}

  ngOnInit() {
    this.getAds();
  }

  // deleted that
  AnimationSwitch(mycatg: any) {
    const allElement = document.querySelectorAll('.category');

    allElement.forEach(element => {
      element.classList.remove('selected');
    });
    
    const button = document.getElementById(mycatg);

    button?.classList.add('selected');    
    
  }

  getAds() {
    this.adsService.getAds().valueChanges().subscribe(
      (s) => {
        console.log(s);
        this.ads = s;

      }, (e) => {
        console.log(e);
        
      }
    );
    
  }

}
