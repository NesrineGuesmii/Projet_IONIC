import { Component } from '@angular/core';
import { categories } from '../data/Category';
import { AdsService } from '../services/ads.service';
import { Ads } from '../models/Ads';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
catgs = categories;
ads!: Array<Ads>;
sales: any;
rent: any;
currentAds!: Array<Ads>;
  constructor(private adsService: AdsService, private router: Router) {}

  ngOnInit() {
    this.getAds(); // get all ads
  }



  getAds() { // req firestore to get ads
    this.adsService.getAds().valueChanges().subscribe(
      (s) => {
        console.log(s);
        this.ads = s; 
        this.currentAds = this.ads; // store in current variable (to change with categories)
      }, (e) => {
        console.log(e);
        
      }
    );
    
  }


  // function to select ad by category 
  selectTabsCategory(catg: string) {
    console.log(catg);
    
    if (catg === "Rent") {
      this.getRent();
    } else if (catg === "Sales") {
      this.getSales();
    } else {
      this.getAll();
    }
  } 


  // search ad by category
  search(type: any) {
    let tab = [];
    for (let i = 0; i < this.ads.length; i++) {
      if (this.ads[i].category === type) {
        tab.push(this.ads[i]);
      }      
    }

    return tab;
  }

  
  getSales() {
    this.currentAds = this.search("Sales");
    console.log(this.currentAds);
  }

  getRent() {
    this.currentAds = this.search("Rent");
    console.log(this.currentAds);
  }

  getAll() {    
    this.currentAds = this.ads;
  }

  goToDetail(title: any) {    
    this.router.navigateByUrl("/ad-details/" + title);
  }
}
