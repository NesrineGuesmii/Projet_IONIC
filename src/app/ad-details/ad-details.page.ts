import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.page.html',
  styleUrls: ['./ad-details.page.scss'],
})
export class AdDetailsPage implements OnInit {

  titleAds: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
