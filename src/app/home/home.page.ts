import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}



  // deleted that

  AnimationSwitch(mycatg: any) {
    const allElement = document.querySelectorAll('.category');

    allElement.forEach(element => {
      element.classList.remove('selected');
    });
    
    const button = document.getElementById(mycatg);

    button?.classList.add('selected');    
    
  }

}
